import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Junio:12345@cluster0.fsusl4b.mongodb.net/?appName=Cluster0').then(() => {
    console.log('Banco conectado com sucesso!')
})
    .catch((err) => {
        console.log('Erro ao conectar no banco: ' + err)
    })

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('Tasks', taskSchema)