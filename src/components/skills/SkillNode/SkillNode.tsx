import { useContext } from 'react'
import styles from './SkillNode.module.less'
import { CurrentIndexContext } from '../../../providers/CurrentIndex'
import type { CharacteristicObject } from '../../../utils/types'
import Characteristics from '../../characteristics/Characteristics'
import type SkillNodeProps from '../../../props/SkillNodeProps'
import { SKILL_MARGIN_REM } from '../../../utils/consts'

const SkillNode = ({name, description, id, level}: SkillNodeProps) => {
    const [currentIndex, setCurrentIndex] = useContext(CurrentIndexContext)
    
    const elements: CharacteristicObject[] = [
        {
            title: 'ID',
            value: id
        },

        {
            title: 'Описание',
            value: description
        },
    ]

    const onClick = () => {
        setCurrentIndex(id)
    }


    return (
        <div 
            onClick={onClick}
            style={{display: 'grid', gridTemplateColumns: `${level * SKILL_MARGIN_REM}rem 1fr`}}
        >
            {
                level > 0 &&
                <div className={styles.point} style={{marginLeft: `${level * SKILL_MARGIN_REM / 2}rem`}}>
                    <div className={id == currentIndex ? styles.choosed : ''}></div>
                </div>
            }
            <div className={`${styles.node} ${id == currentIndex ? styles.choosed : ''}`}>
                <h2>{name} ({level + 1} ур.)</h2>
                <div>
                    <Characteristics elements={elements} />
                </div>
            </div>
        </div>
    )
}

export default SkillNode