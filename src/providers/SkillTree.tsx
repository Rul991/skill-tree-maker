import { createContext, useContext, useEffect, useReducer, type Dispatch, type PropsWithChildren } from 'react'
import type SkillElement from '../interfaces/SkillElement'
import SkillElementUtils from '../utils/SkillElementUtils'
import SkillElementValidator from '../utils/SkillElementValidator'
import type { SkillTreeAction } from '../utils/types'
import { CurrentIndexContext } from './CurrentIndex'

export const createNewObject = (): SkillElement => ({
    id: `el${Math.ceil(++createdObjects / 2)}`,
    name: 'name',
    description: 'description',
    children: []
})

let createdObjects = 0
let initialState: SkillElement = {...createNewObject(), isRoot: true}

try {
    const parsed: SkillElement = JSON.parse(localStorage.getItem('skill-tree')!)
    if(SkillElementValidator.isSkillValid(parsed)) {
        initialState = parsed
    }
}
catch {}

export const SkillTreeContext = createContext<[SkillElement, Dispatch<SkillTreeAction>]>(
    [initialState, () => {}]
)

export const SkillTreeProvider = ({ children }: PropsWithChildren) => {
    const [_, setIndex] = useContext(CurrentIndexContext)
    const reducer = (state: SkillElement, action: SkillTreeAction): SkillElement => {
        const cloneState: SkillElement = JSON.parse(JSON.stringify(state))
        switch (action.type) {
            case 'add':
                {
                    const obj = SkillElementUtils.findById(cloneState, action.id)
                    if(obj) {
                        obj.children.push(createNewObject())
                    }
                }
                return cloneState

            case 'update':
                {
                    const obj = SkillElementUtils.findById(cloneState, action.id)
                    
                    if(obj) {
                        const {values} = action

                        for (const key in obj) {
                            //@ts-ignore
                            if(typeof values[key] == typeof obj[key]) 
                                //@ts-ignore
                                obj[key] = values[key]
                        }
                    }

                }
                
                return cloneState

            case 'delete':
                SkillElementUtils.delete(action.id, cloneState)                
                return cloneState

            case 'load':
                setIndex(action.skill.id)
                createdObjects = 0
                return action.skill

            case 'splice':
                const root = SkillElementUtils.findRootById(cloneState, action.id)
                const child = SkillElementUtils.findById(cloneState, action.id)

                if(root && child) {
                    root.children.push(...child.children)
                    SkillElementUtils.delete(action.id, root)
                }
                else if(child) {
                    SkillElementUtils.delete(action.id, cloneState)
                }

                return cloneState
            default:
                return cloneState
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        localStorage.setItem('skill-tree', SkillElementUtils.toJson(state))
    }, [state])

    return (
        <SkillTreeContext.Provider value={[state, dispatch]}>
            {children}
        </SkillTreeContext.Provider>
    )
}
