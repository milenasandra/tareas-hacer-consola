const colors = require('colors')

const mostrarMenu = ()=>{
return new Promise((resolve) => {
    console.clear()
    console.log(colors.blue('==============================='));
    console.log(colors.blue('Seleccione una opción'));
    console.log(colors.blue('==============================='));

    console.log(`${'1.'.green} Crear una tarea`);
    console.log(`${'2.'.green} Listar tareas`);                            
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea(s)`);
    console.log(`${'0.'.green} Salir`);

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    readline.question(`Seleccione una opción: `, (opt)=>{
        readline.close()
        resolve(opt)
    })
})
}
const pausa = () => {
return new Promise((resolve) => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
})
readline.question(`Presione ENTER para continuar: `, (opt)=>{
    readline.close()
    resolve()
})
})
}

module.exports ={ 
    mostrarMenu,
    pausa,
}