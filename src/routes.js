const { addStudentHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/student',
        handler: addStudentHandler
    },
    {
        method: 'GET',
        path: '/student/',
        handler: () => {}
    },
    {
        method: 'GET',
        path: '/student/{nim}',
        handler: () => {}
    },
    {
        method: 'GET',
        path: '/prodi/{prodiId}',
        handler: () => {}
    },
    {
        method: 'GET',
        path: '/prodi',
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