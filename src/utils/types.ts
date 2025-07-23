import type SkillElement from '../interfaces/SkillElement'

export type CharacteristicObject = {
    title: string,
    value: number | string
}

export type ContextValue<T> = [T, (value: T) => void]

export type SkillTreeAction =
    | { type: 'add', id: string }
    | { type: 'update', id: string, values: Partial<Record<keyof SkillElement, SkillElement[keyof SkillElement]>>}
    | { type: 'delete', id: string }
    | { type: 'splice', id: string }
    | { type: 'load', skill: SkillElement }