import { ListCheck } from 'react-bootstrap-icons'
import styles from './check.module.css'

function CheckIcon() {
    return (
        <div className={styles.flexcontent}>
            <div >
                <ListCheck className={styles.check} size={35} color='white' />
            </div>
        </div>
    )
}

export default CheckIcon;