import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/taskmanager').then(() => {
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