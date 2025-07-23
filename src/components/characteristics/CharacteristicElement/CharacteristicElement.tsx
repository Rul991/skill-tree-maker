import type CharacteristicElementProps from '../../../props/CharacteristicElementProps'
import styles from './CharacteristicElement.module.less'

const CharacteristicElement = ({title, value}: CharacteristicElementProps) => {
    return <div className={styles.component}>
        <div className={styles.title}>{title}:</div>
        <div className={styles.value}>
            {(typeof value == 'string' && !value.length) ? `(empty)` : value}
        </div>
    </div>
}

export default CharacteristicElement