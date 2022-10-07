const inquirer = require('inquirer')
const colors = require('colors')
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `1. Crear tarea`
            },
            {
                value: 2,
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: 3,
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: 4,
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: 5,
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: 6,
                name: `${'6.'.green} Borrar tarea(s)`
            },
            {
                value: 7,
                name: `${'7.'.green} Salir`
            }
            
        ],
    },
]

const inquirerMenu = async() => {
    console.clear()
    console.log(colors.blue('==============================='));
    console.log(colors.blue('Seleccione una opción'));
    console.log(colors.blue('==============================='))

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion
}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.magenta} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question)
}

const leerInput = async (message) =>{
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length === 0 ){
                return 'Por favor imgrese un valor'
            }
            return true
        }
      }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}
