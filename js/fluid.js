/**
 * GPU Fluid Simulation
 * Based on classic Navier-Stokes solver on half-float/float ping-pong textures.
 * Inputs cursor movement splats to drive fluid velocity and dye density.
 */

export class GPUFluid {
  constructor(renderer) {
    this.renderer = renderer;
    this.gl = renderer.getContext();

    // Check float / half-float capability
    const isWebGL2 = this.renderer.capabilities.isWebGL2;
    this.textureType = THREE.HalfFloatType;

    // Resolutions from brief
    this.simRes = 256;
    this.dyeRes = 512;

    // Config settings from brief
    this.velDissipation = 0.98;
    this.densityDissipation = 0.97;
    this.pressureDissipation = 0.95;
    this.pressureIterations = 5;
    this.curlStrength = 30.0;
    this.dt = 1.0 / 60.0;

    // Render Targets
    this.velocity = this.createDoubleFBO(this.simRes, this.simRes, this.textureType, THREE.LinearFilter);
    this.density = this.createDoubleFBO(this.dyeRes, this.dyeRes, this.textureType, THREE.LinearFilter);
    this.divergence = this.createFBO(this.simRes, this.simRes, this.textureType, THREE.NearestFilter);
    this.curl = this.createFBO(this.simRes, this.simRes, this.textureType, THREE.NearestFilter);
    this.pressure = this.createDoubleFBO(this.simRes, this.simRes, this.textureType, THREE.NearestFilter);

    // Quad scene
    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.scene.add(this.quad);

    // Mouse tracking
    this.mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      dx: 0,
      dy: 0,
      moved: false,
      lastSplatTime: 0
    };

    this.initShaders();
  }

  createFBO(w, h, type, filter) {
    return new THREE.WebGLRenderTarget(w, h, {
      type: type,
      format: THREE.RGBAFormat,
      minFilter: filter,
      magFilter: filter,
      depthBuffer: false,
      stencilBuffer: false
    });
  }

  createDoubleFBO(w, h, type, filter) {
    let fbo1 = this.createFBO(w, h, type, filter);
    let fbo2 = this.createFBO(w, h, type, filter);
    return {
      read: fbo1,
      write: fbo2,
      swap: function() {
        let temp = this.read;
        this.read = this.write;
        this.write = temp;
      }
    };
  }

  initShaders() {
    const baseVertex = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // 1. Splat Shader
    this.splatMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uTarget;
        uniform float uAspect;
        uniform vec2 uPoint;
        uniform vec2 uPointPrev;
        uniform vec3 uColor;
        uniform float uRadius;
        varying vec2 vUv;

        float distToSegment(vec2 p, vec2 a, vec2 b) {
          vec2 pa = p - a;
          vec2 ba = b - a;
          float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
          return length(pa - ba * h);
        }

        void main() {
          vec2 p = vUv;
          vec2 a = uPointPrev;
          vec2 b = uPoint;
          p.x *= uAspect;
          a.x *= uAspect;
          b.x *= uAspect;

          float d = distToSegment(p, a, b);
          vec3 splat = exp(-d * d / max(uRadius * uRadius, 1e-5)) * uColor;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
        }
      `,
      uniforms: {
        uTarget: { value: null },
        uAspect: { value: 1.0 },
        uPoint: { value: new THREE.Vector2() },
        uPointPrev: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Vector3() },
        uRadius: { value: 0.005 }
      },
      depthWrite: false,
      depthTest: false
    });

    // 2. Advection Shader
    this.advectMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 uTexelSize;
        uniform float uDt;
        uniform float uDissipation;
        varying vec2 vUv;

        void main() {
          vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
          gl_FragColor = uDissipation * texture2D(uSource, coord);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uSource: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) },
        uDt: { value: this.dt },
        uDissipation: { value: 0.98 }
      },
      depthWrite: false,
      depthTest: false
    });

    // 3. Curl Shader
    this.curlMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;

        void main() {
          float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
          float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
          float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) }
      },
      depthWrite: false,
      depthTest: false
    });

    // 4. Vorticity Confinement Shader
    this.vorticityMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float uCurlScale;
        uniform float uDt;
        uniform vec2 uTexelSize;
        varying vec2 vUv;

        void main() {
          float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
          float C = texture2D(uCurl, vUv).x;

          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 1e-5;
          force *= uCurlScale * C;
          force.y *= -1.0;

          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel + force * uDt, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uCurl: { value: null },
        uCurlScale: { value: this.curlStrength },
        uDt: { value: this.dt },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) }
      },
      depthWrite: false,
      depthTest: false
    });

    // 5. Divergence Shader
    this.divergenceMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;

        void main() {
          float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
          float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;

          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vUv.x < uTexelSize.x) L = -C.x;
          if (vUv.x > 1.0 - uTexelSize.x) R = -C.x;
          if (vUv.y < uTexelSize.y) B = -C.y;
          if (vUv.y > 1.0 - uTexelSize.y) T = -C.y;

          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) }
      },
      depthWrite: false,
      depthTest: false
    });

    // 6. Pressure Solve (Jacobi) Shader
    this.pressureMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        uniform vec2 uTexelSize;
        uniform float uDissipation;
        varying vec2 vUv;

        void main() {
          float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
          float div = texture2D(uDivergence, vUv).x;

          float p = (L + R + B + T - div) * 0.25;
          gl_FragColor = vec4(p * uDissipation, 0.0, 0.0, 1.0);
        }
      `,
      uniforms: {
        uPressure: { value: null },
        uDivergence: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) },
        uDissipation: { value: this.pressureDissipation }
      },
      depthWrite: false,
      depthTest: false
    });

    // 7. Gradient Subtract Shader
    this.gradientSubtractMaterial = new THREE.ShaderMaterial({
      vertexShader: baseVertex,
      fragmentShader: `
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        uniform vec2 uTexelSize;
        varying vec2 vUv;

        void main() {
          float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
          float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
          float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
          float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;

          vec2 grad = vec2(R - L, T - B) * 0.5;
          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel - grad, 0.0, 1.0);
        }
      `,
      uniforms: {
        uPressure: { value: null },
        uVelocity: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / this.simRes, 1 / this.simRes) }
      },
      depthWrite: false,
      depthTest: false
    });
  }

  updateMouse(screenX, screenY, width, height, isMobile) {
    const now = performance.now();
    const x = screenX / width;
    const y = 1.0 - screenY / height; // invert Y for WebGL texture coordinates

    const dxPx = screenX - this.mouse.prevX;
    const dyPx = screenY - this.mouse.prevY;
    const lenPx = Math.hypot(dxPx, dyPx);

    // If more than 50ms passed, start line at current point
    if (now - this.mouse.lastSplatTime > 50) {
      this.mouse.prevX = screenX;
      this.mouse.prevY = screenY;
    }

    if (lenPx > 0.01) {
      // Clamped mappings from brief:
      // Splat radius = clamp-map(len, 0..5 -> 0..60) * 0.6 (* 0.8 on mobile)
      const tLen5 = Math.min(Math.max(lenPx / 5.0, 0.0), 1.0);
      let splatRadius = (tLen5 * 60.0) * 0.6 * (isMobile ? 0.8 : 1.0);
      splatRadius = Math.max(splatRadius, 2.5);

      // Force multiplier = clamp-map(len, 0..15 -> 0..10)
      const tLen15 = Math.min(Math.max(lenPx / 15.0, 0.0), 1.0);
      const forceMult = tLen15 * 10.0;

      const normDx = (dxPx / width) * forceMult * 12.0;
      const normDy = (-dyPx / height) * forceMult * 12.0;

      const pCurrent = new THREE.Vector2(x, y);
      const pPrev = new THREE.Vector2(this.mouse.prevX / width, 1.0 - this.mouse.prevY / height);

      // Splat Velocity
      this.splat(
        this.velocity,
        pCurrent,
        pPrev,
        new THREE.Vector3(normDx, normDy, 1.0),
        splatRadius / 200.0,
        width / height
      );

      // Splat Density (white dye)
      this.splat(
        this.density,
        pCurrent,
        pPrev,
        new THREE.Vector3(1.0, 1.0, 1.0),
        splatRadius / 200.0,
        width / height
      );

      this.mouse.lastSplatTime = now;
      this.mouse.prevX = screenX;
      this.mouse.prevY = screenY;
    }
  }

  splat(target, pCurrent, pPrev, color, radius, aspect) {
    this.splatMaterial.uniforms.uTarget.value = target.read.texture;
    this.splatMaterial.uniforms.uPoint.value.copy(pCurrent);
    this.splatMaterial.uniforms.uPointPrev.value.copy(pPrev);
    this.splatMaterial.uniforms.uColor.value.copy(color);
    this.splatMaterial.uniforms.uRadius.value = radius;
    this.splatMaterial.uniforms.uAspect.value = aspect;

    this.quad.material = this.splatMaterial;
    this.renderer.setRenderTarget(target.write);
    this.renderer.render(this.scene, this.camera);
    target.swap();
  }

  step() {
    // 1. Curl
    this.curlMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.quad.material = this.curlMaterial;
    this.renderer.setRenderTarget(this.curl);
    this.renderer.render(this.scene, this.camera);

    // 2. Vorticity Confinement
    this.vorticityMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.vorticityMaterial.uniforms.uCurl.value = this.curl.texture;
    this.quad.material = this.vorticityMaterial;
    this.renderer.setRenderTarget(this.velocity.write);
    this.renderer.render(this.scene, this.camera);
    this.velocity.swap();

    // 3. Divergence
    this.divergenceMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.quad.material = this.divergenceMaterial;
    this.renderer.setRenderTarget(this.divergence);
    this.renderer.render(this.scene, this.camera);

    // 4. Pressure Jacobi Iterations (5 iterations as in brief)
    this.pressureMaterial.uniforms.uDivergence.value = this.divergence.texture;
    for (let i = 0; i < this.pressureIterations; i++) {
      this.pressureMaterial.uniforms.uPressure.value = this.pressure.read.texture;
      this.quad.material = this.pressureMaterial;
      this.renderer.setRenderTarget(this.pressure.write);
      this.renderer.render(this.scene, this.camera);
      this.pressure.swap();
    }

    // 5. Gradient Subtract
    this.gradientSubtractMaterial.uniforms.uPressure.value = this.pressure.read.texture;
    this.gradientSubtractMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.quad.material = this.gradientSubtractMaterial;
    this.renderer.setRenderTarget(this.velocity.write);
    this.renderer.render(this.scene, this.camera);
    this.velocity.swap();

    // 6. Advect Velocity
    this.advectMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectMaterial.uniforms.uSource.value = this.velocity.read.texture;
    this.advectMaterial.uniforms.uDissipation.value = this.velDissipation;
    this.quad.material = this.advectMaterial;
    this.renderer.setRenderTarget(this.velocity.write);
    this.renderer.render(this.scene, this.camera);
    this.velocity.swap();

    // 7. Advect Density
    this.advectMaterial.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectMaterial.uniforms.uSource.value = this.density.read.texture;
    this.advectMaterial.uniforms.uDissipation.value = this.densityDissipation;
    this.quad.material = this.advectMaterial;
    this.renderer.setRenderTarget(this.density.write);
    this.renderer.render(this.scene, this.camera);
    this.density.swap();

    this.renderer.setRenderTarget(null);
  }

  getVelocityTexture() {
    return this.velocity.read.texture;
  }

  getDensityTexture() {
    return this.density.read.texture;
  }
}
