// // This is passed from the vertex
varying vec2 vUv;
varying float vElevation;

uniform vec3 uColor;
uniform sampler2D uTexture;


void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb *= vElevation * 2.0 + 0.8;
  gl_FragColor = textureColor;

  // Debug => reset gl_FragColor to show the variable you want to inspect
  // gl_FragColor = vec4(vUv, 1.0, 1.0);
}
