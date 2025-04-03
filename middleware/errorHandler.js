export const errorHandler = (error, req, res, next) => {
    if(error.name == "Error"){
        return res.status(500).json({
            error : "Error en el servidor"
        });
    }
    return res.status(401).json({
        error : error.message || "Error iniciando sesión"
    });
}