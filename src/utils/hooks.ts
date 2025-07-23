import { useContext, useState } from 'react'
import { DEFAULT_TIMEOUT_TIME } from './consts'
import { SkillTreeContext } from '../providers/SkillTree'

export const useToggle = (start = false) => {
    const [toggled, setToggle] = useState(start)

    return [
        toggled,
        () => setToggle(!toggled)
    ] as [boolean, VoidFunction]
}

export const useSkillTree = () => {
    return useContext(SkillTreeContext)
}

export const useTimeout = <T>(defaultValue: T, time: number = DEFAULT_TIMEOUT_TIME) => {
    const [state, setState] = useState(defaultValue)

    return [
        state,
        value => {
            setState(value)

            setTimeout(() => {
                setState(defaultValue)
            }, time)
        }
    ] as [T, (value: T) => void]
}