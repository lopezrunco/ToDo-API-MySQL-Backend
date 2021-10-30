const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {
        todoModel(sequelize)
            .findByPk(request.params.id)    // En los parametros de la request viene el id
            .then(todo => {
                if (todo) {
                    response.json({
                        todo
                    })
                } else {
                    response.status(404).json({
                        message: 'Tarea no encontrada'
                    })
                }
            }).catch(error => {
                console.error(error)
    
                response.status(500).json({
                    message: 'Error al intentar obtener la tarea'
                })
            })
    }
}