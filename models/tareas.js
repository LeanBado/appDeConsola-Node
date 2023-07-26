const Tarea = require("./tarea")
require('colors')

class Tareas{
    _listado = {}

    get listadoArr() {
        const listado = []
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key]
            listado.push(tarea)
        })
        return listado
    }

    constructor() {
        this._listado = {}
    }

    cargarTareasFromArray( tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }

    listadoCompleto(){
       const check = `${'Completada'.green}`
       const uncheck = `${'Pendiente'.red}`

       console.log('')

       this.listadoArr.forEach((tarea, index) => {

            const {desc, completadoEn} = tarea
            const idx = `${index+1}`.green
             console.log(`${idx}. ${desc} ==> ${
                 completadoEn !== null ? check : uncheck
             }`)       
       })

    }

    listarTareasCompletadas(completadas){
        console.log('')

        const check = `${'Completada'.green}`
        const uncheck = `${'Pendiente'.red}`
        let contador = 0

        this.listadoArr.forEach(tarea => {

            const {desc, completadoEn} = tarea

            if(completadas){
                if(completadoEn){ //si el completadoEn de la tarea da TRUE entra al if solo con las tareas que el completadoEn dan true
                contador += 1
                console.log(`${contador.toString().green}. ${desc} ==> ${
                    completadoEn !== null ? check : uncheck
                }`)
            }
                
            } else{
                if(!completadoEn){// si el completadoEn de la tarea no da TRUE ENTRA al if solo con las tareas que NO DAN TRUE
                    contador += 1
                    console.log(`${contador.toString().green}. ${desc} ==> ${
                        completadoEn !== null ? check : uncheck
                    }`)
                }
                
                
            }
          
        }
        )

    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    toggleCompleteada(ids){
        ids.forEach(id =>{
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea =>{
            if(!ids.includes(tarea.id)){
                
                this._listado[tarea.id].completadoEn = null
               
            }
        })
    }


}

module.exports = Tareas