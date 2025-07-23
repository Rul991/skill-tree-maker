import type SkillElement from '../../../interfaces/SkillElement'
import { createNewObject } from '../../../providers/SkillTree'
import { useSkillTree, useTimeout } from '../../../utils/hooks'
import ClickButton from '../../buttons/ClickButton'

const NewFileButton = () => {
    const [_skill, dispatchSkill] = useSkillTree()
    const [name, setName] = useTimeout('Новый файл')

    const onClick = () => {
        const skill: SkillElement = {...createNewObject(), isRoot: true}
        dispatchSkill({type: 'load', skill})
        setName('Создано!')
    }
    
    return (
        <ClickButton 
            onClick={onClick}
        >{name}</ClickButton>
    )
}

export default NewFileButton