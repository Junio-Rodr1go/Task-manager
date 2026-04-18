import { useState, useContext } from 'react';
import styles from './SearchInp.module.css'
import { Search } from 'react-bootstrap-icons'
import { useSearch } from '../context/search.jsx'

function SearchInp() {

    const { setSearchText } = useSearch('')

    return (
        <div className={styles.flexcontent}>
            <div className={styles.bar} >
                <input onChange={e => setSearchText(e.target.value)} type="text" />
                <button className={styles.searchbtn}>
                    <Search size={15} />
                </button>
            </div>
        </div>
    )
}

export default SearchInp;