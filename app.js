const colors = require('colors')
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
const {guardarDB, leerDb} = require('./helpers/guardarLeerArchivo')

const main = async () => {
  let opt = ''
  const tareas = new Tareas()

  const tareasDb = leerDb()
  if (tareasDb) {
    //establecer tareas
    tareas.cargarTareasFromArr(tareasDb)
  }

  do {
    opt = await inquirerMenu()
    switch (opt) {
      case 1:
        const desc = await leerInput('Descripcion:')
        tareas.crearTarea(desc)
        break
      case 2:
        tareas.listadoCompletado()
        break
      case 3:
        tareas.listarPendientesCompletadas(true)
        break
      case 4:
        tareas.listarPendientesCompletadas(false)
        break
      case 5:
        const ids = await mostrarListadoCheckList(tareas.getListadorArr)
        tareas.tooggleCompletadas(ids)
        break
      case 6:
        const id = await listadoTareasBorrar(tareas.getListadorArr)
        if (id !== '0') {
          const resp = await confirmar('¿Esta seguro?')
          if (resp) {
            tareas.borrarTarea(id)
            console.log('Tarea borrada')
          }
        }
        break
    }
    guardarDB(tareas.getListadorArr)

    if (opt !== '0') await pausa()
  } while (opt !== '0')
}

main()
