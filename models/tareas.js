const Tarea = require('./tarea')
const colors = require('colors')

class Tareas {
  _listado = {}

  constructor() {
    this._listado = {}
  }
  crearTarea(desc = '') {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  get getListadorArr() {
    const listado = []
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key]
      listado.push(tarea)
    })
    return listado
  }

  cargarTareasFromArr(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompletado() {
    this.getListadorArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.yellow
      const {desc, completadoEn} = tarea
      const estado = completadoEn ? 'Completada'.grey : 'pendiente'.red

      console.log(`${idx} ${desc} :: ${estado}`)
    })
  }
  listarPendientesCompletadas(completadas = true) {
    let contador = 0
    this.getListadorArr.forEach((tarea, i) => {
      const {desc, completadoEn} = tarea
      const estado = completadoEn ? 'completada'.grey : 'pendiente'.red

      if (completadas && estado === 'completada'.grey) {
        contador++
        console.log(`${(contador + '.').grey} ${desc} :: ${completadoEn}`)
      }
      if (!completadas && estado === 'pendiente'.red) {
        contador++
        console.log(`${(contador + '.').grey} ${desc} :: ${estado}`)
      }
    })
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id]
    }
  }

  tooggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id]
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString()
      }
    })
    this.getListadorArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas
