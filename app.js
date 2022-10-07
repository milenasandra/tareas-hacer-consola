const colors = require('colors')
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
const { guardarDB, leerDB } = require('./helpers/guardarLeerArchivo')

const main = async () =>{
    let opt = ''
    const tareas = new Tareas()

    const tareaDB = leerDB()
    if(tareaDB){
        tareas.cargarTareasFromArr(tareaDB)
    }

    do {
        opt = await inquirerMenu()
        
        switch (opt){
            case 1:
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break
            case 2:
                console.log(tareas.getListadoArr);
                break
        }
        guardarDB(tareas.getListadoArr)

        if(opt !== '0') await pausa()
    } while (opt !== '0');
}


main()

