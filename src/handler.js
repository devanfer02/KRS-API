const { nanoid } = require('nanoid')
const { sumValues, indexCourse } = require('./function')
const studentFilkom = require('./student')
const Course = require('./course/Course')
const Class = require('./major/Majors')

const addStudentHandler = (request, h) => {
    const {
        name,
        nim,
        prodi,
        uktLunas,
        krs
    } = request.payload

    const hasNoName = name === undefined
    const hasNoNim = nim === undefined
    const hasNoProdi = prodi === undefined
    const invalidNIM = nim.length !== 15
    const hasKrs = krs !== undefined
    const invalidKrs = typeof (krs) !== 'object'

    if (!uktLunas) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mahasiswa belum membayar ukt'
        })
        response.code(400)
        return response
    }

    if (hasNoName) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mohon masukkan nama'
        })
        response.code(400)
        return response
    }

    if (hasNoNim) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mohon masukkan NIM'
        })
        response.code(400)
        return response
    }

    if (hasNoProdi) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mohon masukkan Prodi'
        })
        response.code(400)
        return response
    }

    if (invalidNIM) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mohon masukkan NIM yang benar.\nPanjang NIM harus 15 character'
        })
        response.code(400)
        return response
    }

    if (hasKrs && invalidKrs) {
        const response = h.response({
            status: 'fail',
            message: 'Tidak bisa menambahkan krs. Mohon masukkan Krs yang benar'
        })
        response.code(400)
        return response
    }

    const id = nanoid(16)
    if (hasKrs) {
        const sksTotal = sumValues(krs)
        if (sksTotal < 1 || sksTotal > 24) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal melakukan validasi Krs. Tidak boleh kosong atau lebih dari 24'
            })
            response.code(400)
            return response
        }
        const mahasiswa = {
            id,
            name,
            nim,
            prodi,
            totalSks: sksTotal,
            krs
        }
        studentFilkom.push(mahasiswa)
        const response = h.response({
            status: 'success',
            message: 'Krs berhasil divalidasi. Semangat!!!',
            data: {
                mahasiswa
            }
        })
        response.code(201)
        return response
    }

    const mahasiswa = {
        id,
        name,
        nim,
        prodi,
        totalSks: sumValues(Course[indexCourse(nim)]),
        krs: Course[indexCourse(nim)]
    }
    if (uktLunas && !hasKrs) {
        const response = h.response({
            status: 'success',
            message: 'Krs telah divalidasi.',
            data: {
                mahasiswa
            }
        })
        const prodi = parseInt(nim.substring(6, 7)) 
        const indexProdi = prodi < 5 ? prodi - 2 : prodi - 3
        Class[indexProdi].push(mahasiswa)
        studentFilkom.push(mahasiswa)
        
        response.code(201)
        return response
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Krs gagal divalidasikan'
    })
    response.code(500)
    return response
}

module.exports = {
    addStudentHandler
}