module.exports = (request, response) => {
    // Obtener todo por ID
    const todo = todos.find(todo => todo.id === Number(request.params.id)) // Como el id viene en formato string, debemos pasarlo a numero con Number()
    // Equivalente en SQL:
    // SELECT * FROM todos WHERE id=2

    // Si encuentra la tarea, la muestra y si no, arroja un 404
    if (todo) {
        response.status(200).json({
            todo
        })
    } else {
        response.status(404).json({})
    }
}