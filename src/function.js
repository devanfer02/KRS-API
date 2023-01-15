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

module.exports = {
    sumValues,
    indexCourse
}
