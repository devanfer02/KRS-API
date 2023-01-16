const {
    addStudentHandler,
    getAllStudentHandler,
    getStudentByNimHandler,
    editStudentDetailHandler,
    deleteStudentHandler
} = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/student',
        handler: addStudentHandler
    },
    {
        method: 'GET',
        path: '/student',
        handler: getAllStudentHandler
    },
    {
        method: 'GET',
        path: '/student/{nim}',
        handler: getStudentByNimHandler
    },
    {
        method: 'PUT',
        path: '/student/{studentId}',
        handler: editStudentDetailHandler
    },
    {
        method: 'DELETE',
        path: '/student/{id}',
        handler: deleteStudentHandler
    }
]

module.exports = routes
