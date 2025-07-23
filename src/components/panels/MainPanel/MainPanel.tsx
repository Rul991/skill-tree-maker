import SkillTree from '../../skills/SkillTree'
import styles from './MainPanel.module.less'

const MainPanel = () => {
    return (
        <div className={styles.panel}>
            <h2>Дерево навыков</h2>
            <SkillTree />
        </div>
    )
}

export default MainPanel