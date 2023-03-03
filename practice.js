const fs = require('fs')

// sincronicos

// escribit un archivo
//fs.writeFileSync('archivo.txt', 'primera linea')
//fs.appendFileSync('archivo.txt', 'segunda linea')

//leer archivo
//const infoArchivo = fs.readFileSync('archivo.txt', 'utf-8')
//console.log(infoArchivo)

//eliminar archivo
//fs.unlinkSync('archivo.txt')

//console.log(fs.existsSync('archivo.txt'))

/* const date = new Date().toLocaleString()

/* fs.writeFile('Fecha y hora.txt', date, (err) => {
    if(err){
        console.log(err)
    }
}) */

/* fs.readFile('Fecha y hora.txt', 'utf-8', (err, info) => {
    if (err) {
        console.log(err)
    } else {
        console.log(info)
    }
})  */

const productos = [
    {
        nombre: 'iPhone',
        precio: 200,
        stock: 10
    },
    {
        nombre: 'iPad',
        precio: 200,
        stock: 10
    },
    {
        nombre: 'iPong',
        precio: 200,
        stock: 10
    },
    {
        nombre: 'iPaddle',
        precio: 200,
        stock: 10
    }
]

//fs.writeFileSync('Productos.json', JSON.stringify(productos))

const readProducts = fs.readFileSync('Productos.json', 'utf-8')
console.log(readProducts)