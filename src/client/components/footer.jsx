import styles from './footer.module.css'

const date = new Date()
const currentYear = date.getFullYear()

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.gridcontent}>
                <p>&copy; Site desenvolvido por Júnio Rodrigo</p>
                <p>{currentYear}</p>
            </div>
        </div>
    )
}

export default Footer;