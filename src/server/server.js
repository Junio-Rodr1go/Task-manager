import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { nanoid } from 'nanoid'


const app = express()

app.use(cors())

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/tasks', (req, res) => {
    const data = fs.readFileSync('./db.json', 'utf-8')
    res.json(JSON.parse(data))
})

app.delete('/delete', (req, res) => {
    const { id } = req.body
    let data = fs.readFileSync('./db.json', 'utf-8')
    data = JSON.parse(data)
    data = data.filter(data => data.id !== id)
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 4))
    res.json(req.body)
})

app.patch('/Edit', (req, res) => {
    console.log(req.body)
    const { id, title, text } = req.body
    let data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
    data.filter(data => data.id === id).map( data => {
        data.title = title
        data.text = text
    })
    
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 4))
    res.json(req.body)
})

app.post('/create', (req, res) => {
    const { Title, Text } = req.body
    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))

    console.log(Title, Text)

    const newTask = {
        id: nanoid(),
        title: Title,
        text: Text
    }
    data.push(newTask)
    fs.writeFileSync('./db.json', JSON.stringify(data, null, 4))
    res.json(newTask)
})

const porta = 3300
app.listen(porta, () => {
    console.log('Servidor rodando na porta:', porta)
})