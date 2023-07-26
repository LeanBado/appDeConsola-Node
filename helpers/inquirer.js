const inquirer = require('inquirer')
require('colors')


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.rainbow} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.rainbow} Listar tarea`
            },
            {
                value: '3',
                name: `${'3.'.rainbow} Listar tarea completadas`
            },
            {
                value: '4',
                name: `${'4.'.rainbow} Listar tarea pendientes`
            },
            {
                value: '5',
                name: `${'5.'.rainbow} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.rainbow} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.  Salir'.bgRed}`
            }
        ]
    }
]

const pausable = [
    {
        type: 'input',
        name: 'entrada',
        message: `${'Confirme lo que desea hacer apretando'.italic} ${'ENTER'.green.underline}`,
    }
]



const  inquirerMenu = async () => {

    //console.clear()
        console.log('==========================='.green)
        console.log(`   ${'Seleccione una opcion'.underline.white}  `)
        console.log('===========================\n'.green)
        
    const {opcion} = await inquirer.prompt(preguntas)
  
    return opcion
}

const pausa = async() => {
    console.log('\n')
    const confirmacion = await inquirer.prompt(pausable)
  
    return confirmacion
}

const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length === 0){
                    return 'Favor de ingresar un valor'
                }
                return true
            }    
        }
    ]
    const {desc} = await inquirer.prompt(question)
  
    return desc
}

const listadoTareasBorrar = async(tareas) => {

    const choices = tareas.map((tarea, idx) =>{
        
        const i = idx+1
        
        return {
            value: tarea.id,
            name: `${i}. ${tarea.desc}`
        }
    })
    
    choices.unshift({
        value: '0',
        name: '0. '.bgRed + 'CANCELAR\n'.bgRed
    })

    const pregunta = [{
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
    }]
    const {id} = await inquirer.prompt(pregunta)
    return {id}
}

const confirmaBorrado = async() => {
    console.log('\n')

    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message: 'Confirma borrado?',
    }]

    const confirmacion = await inquirer.prompt(pregunta)
    return confirmacion
}

const completarTareas = async(tareas) => {

    const choices = tareas.map((tarea, idx) =>{
        
        const i = idx+1
        
        return {
            value: tarea.id,
            name: `${i}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [{
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
    }]
    const {ids} = await inquirer.prompt(pregunta)
    return ids
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmaBorrado,
    completarTareas
}

