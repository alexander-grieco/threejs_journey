// These matrices are automatically provided via Three.js
// To learn more: https://learnopengl.com/Getting-started/Coordinate-Systems
uniform mat4 projectionMatrix;  // transforms into final space (accounting for transformations of camera and mesh)
uniform mat4 viewMatrix;        // this is controlled via the camera
uniform mat4 modelMatrix;       // this is controlled via the mesh

uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute vec2 uv;
// attribute float aRandom; // needs to match name given in script.js - is the attribute set on the geometry

// // Varyings are variables passed from the vertex to the fragment
// varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main(){
    // // Standard way of doing things
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // Showing attribute and varying variable passing
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z = elevation;
    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
}
