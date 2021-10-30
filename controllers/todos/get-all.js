const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {
        todoModel(sequelize).findAll().then(todos => {
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