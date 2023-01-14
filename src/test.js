const Course = require('./course/Course')

const { sumValues, indexCourse } = require('./function')
const { ptiSem2 } = require('./course/PendidikanTeknologInformasi')

// const student = {
//     name: 'Devan Ferrel',
//     nim: '22',
//     ipk: 3.79,
//     totalSks: sumValues(Course[1]),
//     krs: Course[1]
// }

// console.log(student)

// const currentTime = new Date()
// const currentYear = currentTime.getFullYear() % 2000

// console.log(currentYear)
// console.log(typeof (currentYear))

const nim = '225150600111031'
console.log(Course[16])
console.log(ptiSem2)
console.log(sumValues(Course[indexCourse(nim)]))

/*
TODO : buat get dengan query berdasarkan matkul (mengambil mahasiswa siapa aja yang memiliki matkul pada krs tersebut)
/student/PemrogramanDasar
*/