import styles from './Nav.module.less'

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <img src="assets/images/logo.png" alt="logo" />
            <div className={styles.rgb}>Редактор Навыков</div>
        </nav>
    )
}

export default Nav