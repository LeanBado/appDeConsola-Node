const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmaBorrado, completarTareas} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors')

const main = async () => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()
    if(tareasDB){
       tareas.cargarTareasFromArray(tareasDB)
        
    }

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
            break;
            
            case '2':
                tareas.listadoCompleto()
               
            break;

            case '3':
                tareas.listarTareasCompletadas(true)
               
            break;

            case '4':
                tareas.listarTareasCompletadas(false)
               
            break;

            case '5':
              const ids = await completarTareas(tareas.listadoArr)
              tareas.toggleCompleteada(ids)
            break;

            case '6':
               const {id} = await listadoTareasBorrar(tareas.listadoArr)
               
               if(id !== '0'){
                    const {ok} = await confirmaBorrado()
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente'.bgGreen)
                    }
               }   

            break;

        }
        guardarDB(tareas.listadoArr)

       await pausa()
        
    } while (opt !== '0');
        

}

main()