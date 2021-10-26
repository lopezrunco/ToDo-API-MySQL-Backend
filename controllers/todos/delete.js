const todoModel = require('../../models/todo')

module.exports = (Sequelize) => {
    return (request, response) => {
        todoModel(Sequelize).destroy({
            where: {
                id: request.body.id
            }
        }).then(todo => {
            response.status(200).json({
                message: 'Tarea borrada con exito'
            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al borrar la tarea'
            })
        })
    }
}
