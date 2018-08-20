let gl; // Una variable global para el contexto WebGL
let deltaTime; // Tiempo

function main() {
    const canvas = document.getElementById("glcanvas");

    gl = initWebGL(canvas);      // Inicializar el contexto GL

    // Solo continuar si WebGL esta disponible y trabajando

    if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // Establecer el color base en negro, totalmente opaco
        gl.enable(gl.DEPTH_TEST);                               // Habilitar prueba de profundidad
        gl.depthFunc(gl.LEQUAL);                                // Objetos cercanos opacan objetos lejanos
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Limpiar el buffer de color asi como el de profundidad
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };
    const buf = initBuffers(gl);

    let then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        deltaTime = now - then;
        then = now;

        drawScene(gl, programInfo, buf, deltaTime);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}