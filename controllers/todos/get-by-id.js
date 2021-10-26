const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {
        todoModel(sequelize).findByPk(9).then(todo => {
            response.status(200).json({
                todo
            })

        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al intentar obtener la tarea'
            })
        })
    }
}
