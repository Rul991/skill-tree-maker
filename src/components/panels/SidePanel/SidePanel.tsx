import { useContext, useMemo } from 'react'
import { MAX_SYMBOLS } from '../../../utils/consts'
import { useSkillTree } from '../../../utils/hooks'
import ClickButton from '../../buttons/ClickButton'
import Input from '../../other/Input'
import styles from './SidePanel.module.less'
import { CurrentIndexContext } from '../../../providers/CurrentIndex'
import SkillElementUtils from '../../../utils/SkillElementUtils'
import type SkillElement from '../../../interfaces/SkillElement'
import LoadButton from '../../side-panel-components/buttons/LoadButton'
import NewFileButton from '../../side-panel-components/buttons/NewFileButton'
import SaveButton from '../../side-panel-components/buttons/SaveButton'

const SidePanel = () => {
    const [skill, dispatchSkill] = useSkillTree()

    const [currentID, setIndex] = useContext(CurrentIndexContext)

    const currentSkill = useMemo(() => {
        return SkillElementUtils.findById(skill, currentID)
    }, [currentID, skill])
    
    const symbolCoefficients = {
        id: 1/3,
        description: 2
    }

    const updateSkill = (key: keyof SkillElement, value: SkillElement[keyof SkillElement]) => {
        dispatchSkill({
            type: 'update', 
            id: currentID, 
            values: {
                [key]: value,
            }
        })
    }

    return <div className={styles.panel}>
            <h2>Файл</h2>
            <div className={styles.buttons}>
                <SaveButton />
                <LoadButton />
                <NewFileButton />
            </div>

            <h2>Редактор</h2>
            <div className={styles.inputs}>
                <Input 
                    title='Название' 
                    type='string' 
                    onChange={val => updateSkill('name', val as string)}
                    value={currentSkill?.name}
                />
                
                <Input 
                    max={MAX_SYMBOLS * symbolCoefficients.id} 
                    title='ID' 
                    type='string' 
                    onChange={val => {
                        const value = val as string

                        updateSkill('id', value)
                        setIndex(value)
                    }}
                    onPreChange={val => {
                        let isWrongId = false

                        if(SkillElementUtils.findById(skill, val) && val !== currentID) {
                            isWrongId = true
                        }

                        return isWrongId ? val + '_' : val
                    }}
                    value={currentSkill?.id}
                />

                <Input 
                    max={MAX_SYMBOLS * symbolCoefficients.description} 
                    title='Описание' 
                    type='string' 
                    onChange={val => updateSkill('description', val as string)}
                    value={currentSkill?.description}
                />
            </div>

            <h2>Действия</h2>
            <div className={styles.buttons}>
                <ClickButton onClick={() => dispatchSkill({type: 'delete', id: currentID})}>Удалить ветвь</ClickButton>
                <ClickButton onClick={() => dispatchSkill({type: 'splice', id: currentID})}>Удалить навык</ClickButton>
                <ClickButton onClick={() => dispatchSkill({type: 'add', id: currentID})}>Добавить навык</ClickButton>
            </div>
    </div>
}

export default SidePanel