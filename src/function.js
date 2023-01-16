const sumValues = krs => Object.values(krs).reduce((matkulI, matkulJ) => matkulI + matkulJ, 0)

const indexCourse = (nim) => {
    const currentTime = new Date()
    const currentYear = currentTime.getFullYear() % 2000
    const currentMonth = currentTime.getMonth() + 1
    const nimYear = nim.substring(0, 2)
    const prodiNumber = nim.substring(6, 7)
    const indexSpace = (prodiNumber < 5 ? (prodiNumber - 2) * 8 : (prodiNumber - 3) * 8)
    if (currentMonth < 6) {
        return (2 * (currentYear - nimYear) - 1) + indexSpace
    } else {
        if (currentYear - nimYear == 0) return 0
        return (2 * (currentYear - nimYear)) + indexSpace
    }
}

const detectStudentYear = (nim) => {
    const currentTime = new Date()
    const currentYear = currentTime.getFullYear() % 2000
    const nimYear = nim.substring(0, 2)
    return currentYear - nimYear
}

const findMaxSks = (ip) => {
    if (ip < 1.5) return 11
    if (ip < 2) return 15
    if (ip < 2.5) return 18
    if (ip < 3) return 21
    return 24
}

module.exports = {
    sumValues,
    indexCourse,
    detectStudentYear,
    findMaxSks
}
