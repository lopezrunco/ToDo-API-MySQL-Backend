module.exports = (request, response) => {
    // Obtiene un filtro de paginas desde el request
    const page = request.query.page
    // Si viene definido un numero de items por pagina se lo asigna, si no, por defecto asigna 10
    const itemsPerPage = request.query.items || 10

    if (page) {
        // TODO: aplicar paginado
    }

    response.status(200).json({
        todos
    })
}