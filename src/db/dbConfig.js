import mongoose from "mongoose"

const URI = 'mongodb+srv://francojoaquinbeccari:HanJurirules9@cluster0.p43inzh.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error))