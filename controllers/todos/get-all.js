const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {

        // Definicion de un objeto vacio para la paginacion
        const pagination = {}

        // Este codigo correra solo si se estan mandando los parametros page & itemsPerPage
        if (request.query.page && request.query.itemsPerPage) {

            // Definicion de offset (items que se saltaran al mostrar) 
            pagination.offset = (request.query.page - 1) * request.query.itemsPerPage
            // Definicion de items a mostrar por pagina
            pagination.limit = parseInt(request.query.itemsPerPage)
        }

        // Lista todos las tareas y responde mostrandolas en la UI
        todoModel(sequelize).findAll(pagination).then(todos => {
            response.status(200).json({
                todos
            })

        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar listar las tareas'
            })
        })
    }
}