function initWebGL(canvas) {
    gl = null;

    try {
        // Tratar de tomar el contexto estandar. Si falla, retornar al experimental.
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}

    // Si no tenemos ningun contexto GL, date por vencido ahora
    if (!gl) {
        alert("Imposible inicializar WebGL. Tu navegador puede no soportarlo.");
        gl = null;
    }

    return gl;
}