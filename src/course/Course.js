const {
    ptiSem1,
    ptiSem2,
    ptiSem3,
    ptiSem4,
    ptiSem5,
    ptiSem6,
    ptiSem7,
    ptiSem8
} = require('./PendidikanTeknologInformasi')

const {
    tiSem1,
    tiSem2,
    tiSem3,
    tiSem4,
    tiSem5,
    tiSem6,
    tiSem7,
    tiSem8
} = require('./TeknologiInformasi')

const {
    tifSem1,
    tifSem2,
    tifSem3,
    tifSem4,
    tifSem5,
    tifSem6,
    tifSem7,
    tifSem8
} = require('./TeknikInformatika')

const {
    siSem1,
    siSem2,
    siSem3,
    siSem4,
    siSem5,
    siSem6,
    siSem7,
    siSem8
} = require('./SistemInformasi')

const {
    tkomSem1,
    tkomSem2,
    tkomSem3,
    tkomSem4,
    tkomSem5,
    tkomSem6,
    tkomSem7,
    tkomSem8
} = require('./TeknikKomputer')

const Course = [
    //TIF : 0 - 7
    tifSem1, 
    tifSem2,
    tifSem3,
    tifSem4,
    tifSem5, 
    tifSem6,
    tifSem7,
    tifSem8,
    //TEKKOM : 8 - 15
    tkomSem1, 
    tkomSem2,
    tkomSem3,
    tkomSem4,
    tkomSem5, 
    tkomSem6,
    tkomSem7,
    tkomSem8,
    //SI : 16 - 23
    siSem1, 
    siSem2,
    siSem3,
    siSem4,
    siSem5, 
    siSem6,
    siSem7,
    siSem8,
    //PTI : 24 - 31
    ptiSem1, 
    ptiSem2,
    ptiSem3,
    ptiSem4,
    ptiSem5, 
    ptiSem6,
    ptiSem7,
    ptiSem8,
    //TI : 32 - 39
    tiSem1, 
    tiSem2,
    tiSem3,
    tiSem4,
    tiSem5,
    tiSem6,
    tiSem7,
    tiSem8
]

module.exports = Course