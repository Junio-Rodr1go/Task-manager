import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { nanoid } from 'nanoid'
import tasks from './models/tasks'
import { error } from 'console'


const app = express()

app.use(cors())

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/tasks', async (req, res) => {
    try {
        const data = await tasks.find()
        res.json(JSON.parse(data))
    }
    catch {
        res.status(400).json({ error: 'Nenhuma tarefa encontrada!' })
    }
})

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

app.patch('/Edit', (req, res) => {
    try {
        const { id, title, text } = req.body
        const data = tasks.findByIdAndUpdate(id, { title, text })
        res.json(req.body)
    } catch {
        res.status(400).json({ error: 'Não foi possível editar tarefa!' })
    }
})

app.post('/create', (req, res) => {
    try {
        const { Title, Text } = req.body
        const data = tasks.create({ id: nanoid(), title: Title, text: Text })
        res.json(data)
    }
    catch {
        res.status(400).json({ error: 'Não foi possível criar tarefa!' })
    }
})

const porta = 3300
app.listen(porta, () => {
    console.log('Servidor rodando na porta:', porta)
})