import type SkillElement from '../interfaces/SkillElement'

export default class SkillElementValidator {
    static isIdValid(id: any): boolean {
        return typeof id == 'string'
    }

    static isNameValid(name: any): boolean {
        return typeof name == 'string'
    }

    static isDescriptionValid(description: any): boolean {
        return typeof description == 'string'
    }

    static isChildrenArray(children: any): boolean {
        return Array.isArray(children)
    }

    static isSkillValid(skill: SkillElement): boolean {
        if(!skill) return false

        const {id, name, description, children} = skill
        return (
            this.isIdValid(id) &&
            this.isNameValid(name) &&
            this.isDescriptionValid(description) &&
            this.isChildrenArray(children) &&
            children.every(child => this.isSkillValid(child))
        )
    }
}