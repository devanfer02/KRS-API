const {
    addStudentHandler,
    getAllStudentHandler 
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
        handler: () => {}
    },
    {
        method: 'PUT',
        path: '/student/{studentId}',
        handler: () => {}
    },
    {
        method: 'DELETE',
        path: '/student/{id}',
        handler: () => {}
    }
]

module.exports = routes
