import FileUtils from '../../../utils/FileUtils'
import { useSkillTree, useTimeout } from '../../../utils/hooks'
import SkillElementUtils from '../../../utils/SkillElementUtils'
import ClickButton from '../../buttons/ClickButton'

const SaveButton = () => {
    const [skill, _] = useSkillTree()
    const [name, setName] = useTimeout('Сохранить')

    const onClick = () => {
        FileUtils.save(`skill-${skill.id}.json`, SkillElementUtils.toJson(skill))
        setName('Сохранено!')
    }

    return (
        <ClickButton 
            onClick={onClick}
        >{name}</ClickButton>
    )
}

export default SaveButton