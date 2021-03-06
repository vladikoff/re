(function(global) {
  class greets extends NIN.THREENode {
    constructor(id, options) {
      super(id, options);

      /* overwrite to get transparency */
      this.renderTarget = new THREE.WebGLRenderTarget(640, 360, {format: THREE.RGBAFormat});

      this.screenMaterial = new THREE.ShaderMaterial(SHADERS.greets);
      this.screenMaterial.transparent = true;
      this.screen = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), this.screenMaterial);
      this.scene.add(this.screen);

      this.camera.position.y = 10;

      function leftPad(input, length, str) {
        if (input.length >= length) {
          return input;
        }
        str = str || ' ';
        return (new Array(Math.ceil((length - input.length) / str.length) + 1).join(str)).substr(0, (length - input.length)) + input;
      }

      this.frames = [];
      for (let i=0; i <= 480; i++) {
        this.frames[i] = Loader.loadTexture(`res/morphed/${leftPad(i.toString(), 3, '0')}_interpolated.jpg`);
      }

      this.crews = [
        'mercury',
        'revision',
        'pandacube',
        'logicoma',
        'gargaj',
        'idle',
        'rohtie',
        'farbrausch',
        'kvasigen',
        'sandsmark',
        'darklite',
        'desire',
        't-101',
        'lft',
        'mrdoob',
        'outracks'
      ];

      const material = new THREE.MeshStandardMaterial({color: 0x00a2ff});
      this.platformPositions = [-7, -7, -21, -7, 7, -7, 7, 21, 7, 21, 7, -7, 7, -7, -21, -7, -7];
      this.platforms = [];
      for (let i=0; i < 16; i++) {
        const platform = new THREE.Mesh(
          new THREE.BoxGeometry(10, 4, 160),
          material);
        platform.position.set(this.platformPositions[i + 1], -1000, 3235 - i * 200);
        this.scene.add(platform);
        this.platforms.push(platform);
      }

      this.light = new THREE.DirectionalLight(0xffffff, 0.8);
      this.light.position.y = 10;
      this.scene.add(this.light);
      this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    }

    update(frame) {
      super.update(frame);

      const startBEAN = 228 * 12;

      const baseIndex = clamp(0, (BEAN - startBEAN) / (2 * 12) | 0, 15);

      const slideIndex = clamp(0, frame - FRAME_FOR_BEAN(startBEAN + 2 * 12 * baseIndex), 27);
      const animationIndex = clamp(0, frame - FRAME_FOR_BEAN(startBEAN + 12 + 2 * 12 * baseIndex), 27);

      this.screenMaterial.uniforms.tDiffuse.value = this.frames[clamp(0, baseIndex * 30 + animationIndex, 480) | 0];

      this.screen.position.z = lerp(3390, 190, (frame - FRAME_FOR_BEAN(startBEAN)) / 885);
      this.screen.position.x = this.platformPositions[baseIndex];
      this.screen.scale.y = 1.1 + 0.2 * Math.sin(frame * Math.PI * 2 / 60 / 60 * 130 / 2);
      if (this.platformPositions[baseIndex + 1] > this.platformPositions[baseIndex]) {
        this.screen.position.x += slideIndex * 14 / 27;
      } else if (this.platformPositions[baseIndex + 1] < this.platformPositions[baseIndex]) {
        this.screen.position.x -= slideIndex * 14 / 27;
      }
      this.screen.position.y = easeIn(easeOut(10, 15, slideIndex / 14), 10, (slideIndex - 14) / 13);
      this.screen.position.y -= 5 - 10 * this.screen.scale.y / 2;
      this.screen.rotation.y = Math.PI / 2 * easeIn(easeOut(0, 0.5, slideIndex / 14), 1, (slideIndex - 14) / 13);

      for (const [i, platform] of this.platforms.entries()) {
        if (frame < FRAME_FOR_BEAN(startBEAN - 18 + 2 * 12 * i)) {
          platform.position.y = -10000;
        } else {
          platform.position.y = easeOut(-40, 3, (frame - FRAME_FOR_BEAN(startBEAN - 18 + 2 * 12 * i)) / 20);
        }
      }

      this.camera.position.x = this.screen.position.x / 2;
      this.camera.position.z = this.screen.position.z + easeIn(lerp(50, 25, (frame - FRAME_FOR_BEAN(startBEAN)) / 885), 65, (frame - 7150) / 50);
      this.camera.position.y = lerp(25, 12, (frame - FRAME_FOR_BEAN(startBEAN)) / 885);

      this.camera.rotation.x = -0.2;

      this.light.position.x = this.camera.position.x;
      this.light.position.y = this.camera.position.y + 10;
      this.light.position.z = this.camera.position.z;
    }

    render(renderer) {
      renderer.clearTarget(this.renderTarget, true, true, true);
      super.render(renderer);
    }
  }

  global.greets = greets;
})(this);
