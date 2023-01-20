const { nanoid } = require('nanoid')
const { sumValues, indexCourse, detectStudentYear, findMaxSks } = require('./function')
const studentFilkom = require('./student')
const Course = require('./course/Course')
const majors = require('./majors')

const addStudentHandler = (request, h) => {
    const {
        name,
        nim,
        prodi,
        uktLunas,
        ip,
        krs
    } = request.payload

    const hasNoName = name === undefined
    const hasNoNim = nim === undefined  
    const hasNoProdi = prodi === undefined
    const invalidNIM = nim.length !== 15
    const hasKrs = krs !== undefined
    const invalidKrs = typeof (krs) !== 'object'
    const nimExist = studentFilkom.find((student) => student.nim === nim)
    const hasIp = ip !== undefined
    const ipIsNumber = typeof (ip) === 'number'

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

    if (nimExist) {
        const response = h.response({
            status: 'fail',
            message: 'Krs tidak bisa divalidasi. NIM yang dimasukkan sudah ada di database'
        })
        response.code(409)
        return response
    }

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const isMahasiswaLama = detectStudentYear(nim) != 1
    const maxSks = findMaxSks(ip) 
    const totalSksKrs = sumValues(Course[indexCourse(nim)])

    if (isMahasiswaLama && !hasIp) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal melakukan validasi krs. Mahasiswa lama wajib melampirkan ip'
        })
        response.code(404)
        return response
    }

    if (isMahasiswaLama && !ipIsNumber) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal melakukan validasi krs. IP yang dilampirkan harus angka'
        })
        response.code(404)
        return response
    }
    
    if (hasKrs) {
        const sksTotal = sumValues(krs)
        if (sksTotal > maxSks) {
            const response = h.response({
                status: 'fail',
                message: `Gagal melakukan validasi Krs. Ip total melebihi max sks :${maxSks}`
            })
            response.code(400)
            return response
        }
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
            krs,
            createdAt
        }
        
        const response = h.response({
            status: 'success',
            message: 'Krs berhasil divalidasi. Semangat!!!',
            data: {
                mahasiswa
            }
        })

        studentFilkom.push(mahasiswa)

        response.code(201)
        return response
    }

    if (totalSksKrs > maxSks && (hasIp && isMahasiswaLama)) {
        const response = h.response({
            status: 'fail',
            message: `Gagal melakukan validasi krs. Jumlah Sks dari Paket Krs yang diambil melebihi max sks: ${maxSks}.`,
            notes: 'Lapor ke akademik terkait krs dan segera membuat krs yang baru'
        })

        response.code(404)
        return response
    }

    if (totalSksKrs < 1 || totalSksKrs > 24) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal melakukan validasi krs. Jumlah Sks dari Krs tidak boleh kurang dari 1 atau lebih dari 24',
            notes: 'Untuk mahasiswa semester 6 dan keatas, disarankan untuk membuat krs terlebih dahulu. '
        })

        response.code(400)
        return response
    }

    const mahasiswa = {
        id,
        name,
        nim,
        prodi,
        totalSks: totalSksKrs,
        krs: Course[indexCourse(nim)],
        createdAt
    }
    if (uktLunas && !hasKrs) {
        const response = h.response({
            status: 'success',
            message: 'Krs telah divalidasi.',
            data: {
                mahasiswa
            }
        })
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

const getAllStudentHandler = (request, h) => {
    const { krs, prodi } = request.query

    if (krs && prodi) {
        const indexProdi = majors.indexOf(prodi)
        if (indexProdi == -1) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal melakukan search. Prodi tidak dapat ditemukan'
            })
            response.code(404)
            return response
        }
        const codeProdi = indexProdi < 3 ? indexProdi + 2 : indexProdi + 3
        const response = h.response({
            status: 'success',
            message: `List Mahasiswa FILKOM prodi ${prodi} yang mengambil matkul ${krs}`,
            data: {
                students: studentFilkom.filter((student) => student.nim.charAt(6) == codeProdi && student.krs[krs])
                .map((student) => ({
                    name: student.name,
                    nim: student.nim,
                    prodi: student.prodi
                }))
            }
        })
        response.code(200)
        return response
    }
    if (krs) {
        const response = h.response({
            status: 'success',
            message: `List Mahasiswa FILKOM yang mengambil matkul ${krs}`,
            data: {
                students: studentFilkom.filter((student) => student.krs[krs]).map((student) => ({
                    name: student.name,
                    nim: student.nim,
                    prodi: student.nim
                }))
            }
        })
        response.code(200)
        return response
    }
    if (prodi) {
        const indexProdi = majors.indexOf(prodi)
        if (indexProdi == -1) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal melakukan search. Prodi tidak dapat ditemukan'
            })
            response.code(404)
            return response
        }
        const codeProdi = indexProdi < 3 ? indexProdi + 2 : indexProdi + 3
        const response = h.response({
            status: 'success',
            message: `List Mahasiswa FILKOM prodi ${prodi}`,
            data: {
                students: studentFilkom.filter((student) => student.nim.charAt(6) == codeProdi).map((student) => ({
                    name: student.name,
                    nim: student.nim,
                    prodi: student.prodi
                }))
            }
        })
        response.code(200)
        return response
    }
    const response = h.response({
        status: 'success',
        message: 'List Mahasiswa FILKOM ',
        data: {
            students: studentFilkom.map((student) => ({
                name: student.name,
                nim: student.nim,
                prodi: student.prodi
            }))
        }
    })

    response.code(200)
    return response
}

const getStudentByNimHandler = (request, h) => {
    const { nim } = request.params
    const student = studentFilkom.filter((student) => student.nim === nim)[0]
    if (student !== undefined) {
        return {
            status: 'success',
            data: {
                student
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Mahasiswa tidak ditemukan'
    })
    response.code(404)
    return response
}

const editStudentDetailHandler = (request, h) => {
    const { studentId } = request.params

    const indexStudent = studentFilkom.findIndex((student) => student.id === studentId)
    const {
        name,
        nim,
        prodi,
        krs
    } = request.payload

    const idExist = studentFilkom.find((student) => student.id === studentId)
    const hasNoName = name === undefined
    const hasNoNim = nim === undefined  
    const hasNoProdi = prodi === undefined
    const invalidNIM = nim.length !== 15
    const hasKrs = krs !== undefined
    const invalidKrs = typeof (krs) !== 'object'

    if (!idExist) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui detail mahasiswa. ID tidak ditemukan'
        })
        response.code(404)
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

    studentFilkom[indexStudent] = {
        ...studentFilkom[indexStudent],
        name,
        nim, 
        prodi,
        krs
    }

    const response = h.response({
        status: 'success',
        message: 'Detail mahasiswa berhasil diperbarui'
    })

    response.code(200)
    return response
}

const deleteStudentHandler = (request, h) => {
    const { studentId } = request.params

    const indexStudent = studentFilkom.findIndex((student) => student.id === studentId)
    if (indexStudent != -1) {
        studentFilkom.splice(indexStudent, 1)
        const response = h.response({
            status: 'success',
            message: 'Mahasiswa berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Mahasiswa gagal dihapus. ID tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {
    addStudentHandler,
    getAllStudentHandler,
    getStudentByNimHandler,
    editStudentDetailHandler,
    deleteStudentHandler
}
