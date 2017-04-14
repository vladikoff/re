(function(global) {
  class triangleNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
        A: new NIN.TextureInput(),
        B: new NIN.TextureInput(),
      };
      super(id, options);

      this.analysis = new audioAnalysisSanitizer('stem_snare.wav', 'spectral_energy', 0.16);
    }
    update(frame) {
      if(BEAN < 12 * 4 * 49) {
        this.uniforms.A.value = this.inputs.A.getValue();
      } else {
        this.uniforms.A.value = this.inputs.B.getValue();
      }
      this.uniforms.big.value = lerp(0, Math.max(Math.sin(frame/100), 0.4), (frame - FRAME_FOR_BEAN(12 * 4 * 49)) / 100);
      this.uniforms.amount.value = lerp(0, 1.0, (frame - FRAME_FOR_BEAN(12 * 4 * 48.5)) / 50);

      this.uniforms.frame.value = frame * 2 - this.analysis.getValue(frame) * 100 * (BEAN >= 12 * 4 * 49);
      if(BEAN >= 12 * 4 * 53 - 12) {
        if(BEAN < 12 * 4 * 53 - 8) {
          this.uniforms.frame.value = 0;
          this.uniforms.amount.value = 0;
        } else if(BEAN < 12 * 4 * 53 - 6) {
          this.uniforms.big.value = 0.3;
          this.uniforms.amount.value = 0;
        } else if(BEAN < 12 * 4 * 53 - 3) {
          this.uniforms.frame.value = 600;
          this.uniforms.amount.value = 0;
        } else if(BEAN < 12 * 4 * 53) {
          this.uniforms.frame.value = 300;
          this.uniforms.amount.value = 0;
        }
      }
    }
  }

  global.triangleNode = triangleNode;
})(this);
