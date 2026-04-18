import { useState } from 'react'
import SearchInp from '../events/SearchInp.jsx'
import { Search } from 'react-bootstrap-icons'
import Check from '../events/check.jsx'
import styles from './navBar.module.css'
import { useSearch } from '../context/search.jsx'

function NavBar() {

    const [Open, setOpen] = useState(false)
    const { Done } = useSearch()
    const [SearchDone, setSearchDone] = useState('')

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.gridcontent}>
                    <SearchInp />
                    <div onClick={() => setOpen(!Open)}>
                        <Check />
                    </div>
                </div>
            </div>

            {
                Open && (
                    <div className={styles.done}>
                        <div className={styles.content} >
                            <div className={styles.content}>
                                <h1 className={styles.title}>Tarefas Feitas</h1>
                                <h2 className={styles.subtitle}>{Done.length} tarefas concluídas</h2>
                                <div className={styles.flexcontent}>
                                    <div className={styles.bar}>
                                        <input type="text" onChange={e => setSearchDone(e.target.value)} />
                                        <Search size={30} />
                                    </div>
                                </div>
                            </div>

                            {
                                Done.filter(task => task.title.toLowerCase().trim().includes(SearchDone.toLowerCase().trim())).map((task, index) => (
                                    <div className={styles.flexcontent}>
                                        <div className={styles.doneTask} key={index}>
                                            <h1>{task.title}</h1>
                                            <p>{task.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default NavBar;