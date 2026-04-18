import { useEffect, useState } from "react";
import styles from './tasks.module.css'
import { Check, XLg, CheckCircleFill, Clipboard2Check, PencilSquare } from 'react-bootstrap-icons'
import { useSearch } from "../context/search";

function Tasks() {
    const [Title, setTitle] = useState('')
    const [Text, setText] = useState('')
    const [tasks, setTasks] = useState([])
    const [Edit, setEdit] = useState(false)
    const [EditedTitle, setEditedTitle] = useState('')
    const [EditedText, setEditedText] = useState('')
    const [EditedTask, setEditedTask] = useState({})
    const [TaskCreated, setTaskCreated] = useState(false)
    const [ClickCreate, setClickCreate] = useState(true)
    const { SearchText, Done, setDone } = useSearch()
    const API = 'http://localhost:3300/tasks'

    function handleSubmit(e) {
        e.preventDefault()

        if (Title.trim() !== '' && Text.trim() !== '') {

            fetch('http://localhost:3300/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Text: Text, Title: Title })
            })
                .then(res => res.json())
                .then(data => {
                    setTaskCreated(true)
                    setTimeout(() => setTaskCreated(false), 2000)
                    setTasks([...tasks, data])
                    setText('')
                    setTitle('')
                })
                .catch(err => console.log('Erro ao criar task: ', err))

        }
    }

    function handleEdit(task) {

        fetch('http://localhost:3300/Edit', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        })
            .then(() => setEdit(!Edit))
    }

    function handleDelete(task) {
        fetch(`http://localhost:3300/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: task.id, title: task.title, text: task.text })
        })
            .then(() => setDone([...Done, task]))
    }

    useEffect(() => {
        setEditedText(EditedTask.text)
        setEditedTitle(EditedTask.title)
    }, [Edit])

    useEffect(() => {
        fetch(API)
            .then(json => json.json())
            .then(data => setTasks(data))
            .catch(err => console.log('Erro ao consultar a API:', err))
    }, [])

    return (
        <div className={styles.background} >
            <div className={styles.tasks}>
                <div className={styles.flexCreate}>
                    <XLg size={30} className={ClickCreate ? styles.xbtn : styles.rotated} onClick={e => {
                        setClickCreate(!ClickCreate)
                    }} />
                </div>
                <div>


                    {

                        (!ClickCreate) && (
                            !TaskCreated ? (
                                <div className={styles.createForm} >
                                    <form onSubmit={e => handleSubmit(e)} method="POST">
                                        <h1>Criar Tarefa</h1>
                                        <input onChange={e => setTitle(e.target.value)} placeholder="Título" name="title" type="text" />
                                        <textarea onChange={e => setText(e.target.value)} placeholder="Amanhã eu vou..."></textarea>
                                        <button type="submit">Criar</button>
                                    </form>
                                </div>
                            ) : (
                                <div className={styles.flexSubmited}>
                                    <CheckCircleFill className={styles.submited} color="#00b400" size={150} />
                                    Criado!
                                </div>
                            )
                        )
                    }

                    {
                        tasks.length == 0 && (
                            <div className={styles.flexline}>
                                <div className={styles.backgroundline}>
                                    <div className={styles.line}>Nenhuma tarefa foi criada</div>
                                </div>
                            </div>
                        )
                    }


                </div>
                <div className={styles.flexcontent}>
                    <div className={styles.gridcontent}>

                        {
                            tasks.filter(task => task.title.toLowerCase().trim().includes(SearchText.toLowerCase().trim())).map((task, index) => (
                                <div key={index} className={styles.task}>
                                    <h1>{task.title}</h1>
                                    <p>{task.text}</p>
                                    <div className={styles.flexbutton}>
                                        <button onClick={e => {
                                            setEdit(!Edit)
                                            setEditedTask({ id: task.id, title: task.title, text: task.text })
                                        }}><PencilSquare size={30} /></button>
                                        <button onClick={() => handleDelete(task)}><Check size={50} /></button>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
            {
                Edit && (
                    <div className={styles.editOpened}>
                        <div className={styles.editForm}>
                            <XLg size={30} className={styles.XlgEdit} onClick={e => {
                                setEdit(!Edit)
                                setEditedText('')
                                setEditedTitle('')
                            }
                            }
                            />
                            <form onSubmit={e => {
                                e.preventDefault()
                                if ((EditedTitle !== '' && EditedText !== '')) handleEdit({ id: EditedTask.id, title: EditedTitle, text: EditedText })
                            }}>
                                <div className={styles.flexEdit}>
                                    <h1>Editar Tarefa</h1>
                                    <input defaultValue={EditedTask.title} onChange={e => setEditedTitle(e.target.value)} placeholder="Título" name="title" type="text" />
                                    <textarea defaultValue={EditedTask.text} onChange={e => setEditedText(e.target.value)} placeholder="Amanhã eu vou..."></textarea>
                                    <button type="submit">Editar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Tasks;