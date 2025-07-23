import { useContext } from 'react'
import FileUtils from '../../../utils/FileUtils'
import { useSkillTree, useTimeout } from '../../../utils/hooks'
import SkillElementUtils from '../../../utils/SkillElementUtils'
import ClickButton from '../../buttons/ClickButton'
import { CurrentIndexContext } from '../../../providers/CurrentIndex'

const LoadButton = () => {
    const [_, dispatchSkill] = useSkillTree()
    const [_index, setIndex] = useContext(CurrentIndexContext)
    const [name, setName] = useTimeout('Загрузить')

    return (
        <ClickButton 
            onClick={() => {
                FileUtils.load()
                .then(val => {
                    let validatedObject = SkillElementUtils.fromJson(val)
                    if(!validatedObject) {
                        setName('@~@')
                        return
                    }

                    const [skill, isError] = validatedObject

                    dispatchSkill({type: 'load', skill})
                    setIndex(skill.id)

                    if(!isError) {
                        setName('^_^')
                    }
                    else {
                        setName('-_-')
                    }
                })
                .catch(e => {
                    console.error(e)
                    setName('@~@')
                })
            }}
        >{name}</ClickButton>
    )
}

export default LoadButton