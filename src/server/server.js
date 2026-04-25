import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { nanoid } from 'nanoid'
import tasks from './models/tasks.js'
import 'dotenv/config'


const app = express()
mongoose.connect(process.env.MONGO_URI)

app.use(cors())

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//CREATE
app.post('/create', async (req, res) => {
    try {
        const { Title, Text } = req.body
        const data = await tasks.create({ title: Title, text: Text })
        res.json(data)
    }
    catch {
        res.status(400).json({ error: 'Não foi possível criar tarefa!' })
    }
})

//READ
app.get('/tasks', async (req, res) => {
    try {
        const data = await tasks.find()
        res.json(data)
    }
    catch {
        res.status(400).json({ error: 'Nenhuma tarefa encontrada!' })
    }
})

//UPDATE
app.patch('/Edit', async (req, res) => {
    try {
        const { id, title, text } = req.body
        const data = await tasks.findByIdAndUpdate(id, { title: title, text: text }, { new: true })
        res.json(data)
    } catch {
        res.status(400).json({ error: 'Não foi possível editar tarefa!' })
    }
})

//DELETE
app.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body
        const data = await tasks.findByIdAndDelete(id)
        res.json(req.body)
    }
    catch (err) {
        res.status(400).json({ error: 'Não foi possível deletar tarefa!' })
    }
})

const porta = 3300
app.listen(porta, () => {
    console.log('Servidor rodando na porta:', porta)
})