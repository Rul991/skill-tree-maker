import { useContext } from 'react'
import type SkillElement from '../../../interfaces/SkillElement'
import { CurrentIndexContext } from '../../../providers/CurrentIndex'
import { useSkillTree, useTimeout } from '../../../utils/hooks'
import ClickButton from '../../buttons/ClickButton'
import SkillElementUtils from '../../../utils/SkillElementUtils'

const NewFileButton = () => {
    const [_skill, dispatchSkill] = useSkillTree()
    const [_index, setIndex] = useContext(CurrentIndexContext)
    const [name, setName] = useTimeout('Новый файл')

    const onClick = () => {
        const skill: SkillElement = SkillElementUtils.createNewObject(true)
        
        dispatchSkill({type: 'load', skill})
        setName('Создано!')
        setIndex(skill.id)
    }
    
    return (
        <ClickButton 
            onClick={onClick}
        >{name}</ClickButton>
    )
}

export default NewFileButton