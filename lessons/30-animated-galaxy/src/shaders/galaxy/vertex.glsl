uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    //scale
    gl_PointSize = uSize * aScale;

    // copied from Three.js shaders (`node_modules/three/src/renderers/Shaders/`)
    //
    // #ifdef USE_SIZEATTENUATION
    // bool isPerspective = isPerspectiveMatrix(projectionMatrix);
    // if (isPerspective) gl_PointSize *= (scale / -mvPosition.z);
    // #endif
    gl_PointSize *= (1.0 / -viewPosition.z);

    // color
    vColor = color; // color is built in attribute - enabled by `vertexColors: true` in material
}
