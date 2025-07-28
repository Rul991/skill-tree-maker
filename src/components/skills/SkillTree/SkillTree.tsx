import { useContext, useEffect, type JSX } from 'react'
import type SkillElement from '../../../interfaces/SkillElement'
import { useSkillTree } from '../../../utils/hooks'
import SkillNode from '../SkillNode'
import _ from './SkillTree.module.less'
import { CurrentIndexContext } from '../../../providers/CurrentIndex'

const SkillTree = () => {
    const [skill, _] = useSkillTree()
    const [_index, setCurrentIndex] = useContext(CurrentIndexContext)

    useEffect(() => {
        setCurrentIndex(skill.id)
    }, [])

    const renderTree = (skill: SkillElement, length = 0): JSX.Element => {
        return <div key={skill.id}>
            <SkillNode level={length} name={skill.name} description={skill.description} id={skill.id} />
            {skill.children.map(child => renderTree(child, length + 1))}
        </div>
        }    

    return <>{renderTree(skill)}</>
}

export default SkillTree