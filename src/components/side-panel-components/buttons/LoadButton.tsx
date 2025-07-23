import FileUtils from '../../../utils/FileUtils'
import { useSkillTree, useTimeout } from '../../../utils/hooks'
import SkillElementUtils from '../../../utils/SkillElementUtils'
import ClickButton from '../../buttons/ClickButton'

const LoadButton = () => {
    const [_, dispatchSkill] = useSkillTree()
    const [name, setName] = useTimeout('Загрузить')

    return (
        <ClickButton 
            onClick={() => {
                FileUtils.load()
                .then(val => {
                    let skill = SkillElementUtils.fromJson(val)
                    if(!skill) return

                    dispatchSkill({type: 'load', skill})
                    setName('Загружено!')
                })
                .catch(e => console.error(e))
            }}
        >{name}</ClickButton>
    )
}

export default LoadButton