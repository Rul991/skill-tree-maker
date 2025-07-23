import type SkillElement from '../interfaces/SkillElement'
import SkillElementValidator from './SkillElementValidator'

export default class SkillElementUtils {
    static maxLength({children}: SkillElement): number {
        if(!children.length) return 1

        const maxChildLength = Math.max(
            ...children.map(child => this.maxLength(child))
        )

        return maxChildLength + 1
    }

    static count({children}: SkillElement): number {
        return children.reduce((currentCount, child) => {
            return currentCount + this.count(child)
        }, 1)
    }

    static fromJson(json: string): [SkillElement, boolean] | null {
        try {
            let skill: SkillElement = JSON.parse(json)
            return this.validify(skill, skill)
        }
        
        catch(e) {
            console.error('SkillElement Parsing Error:',e)
            return null
        }
    }

    static toJson(obj: SkillElement): string {
        return JSON.stringify(obj, (key, value) => {
            if(key == 'isRoot') return undefined
            return value
        })
    }

    static findByIndex(skill: SkillElement, index: number): SkillElement[] {
        let result: SkillElement[] = []

        if(index == -1) {
            return []
        }
        else if(index == 0) {
            return [skill]
        }
        else {
            for (const child of skill.children) {
                let childResult = this.findByIndex(child, index - 1)
                if(!childResult.length) continue

                result.push(...childResult)
            }
        }

        return result
    }

    static findById(skill: SkillElement, id: string): SkillElement | null {
        if(skill.id == id) return skill

        for (const child of skill.children) {
            const foundChild = this.findById(child, id)
            if(foundChild) return foundChild
        }

        return null
    }

    static findRootById(skill: SkillElement, id: string): SkillElement | null {
        for (const child of skill.children) {
            if(child.id == id) 
                return skill
            
            const root = this.findRootById(child, id)
            if(!root) continue
            else return root
        }

        return null
    }

    static delete(id: string, skill: SkillElement, root?: SkillElement): void {        
        if(skill.id == id) {
            if(skill.isRoot) {
                skill.children = []
                skill.description = ''
                skill.id = 'root'
                skill.name = ''
            }
            else if(root) {
                const i = root.children.indexOf(skill)
                if(i !== -1) root.children.splice(i, 1)
            }
        }
        else {
            skill.children.forEach(child => {
                this.delete(id, child, skill)
            })
        }
    }

    static createNewObject(isRoot?: true): SkillElement {
        return {
            id: `el${++this.createdObjects}`,
            name: '',
            description: '',
            children: [],
            isRoot: isRoot
        }
    }

    static validify(skill: SkillElement, root: SkillElement): [SkillElement, boolean] {
        if(typeof skill != 'object' || typeof root != 'object') {
            console.warn('wrong skill or root', skill, root)
            return [this.createNewObject(true), true]
        }

        const {id, name, description, children, isRoot} = skill
        let isError = false

        if(isRoot && skill !== root) {
            console.warn(`${this.validifyWarningMessage} child cant be root`, skill)
            skill.isRoot = undefined
            isError = true
        }

        if(!SkillElementValidator.isIdValid(id) || this.findById(root, id) !== skill) {
            console.warn(`${this.validifyWarningMessage} wrong id`, skill.id)
            skill.id = id?.toString() + '_'
            isError = true
        }

        if(!SkillElementValidator.isDescriptionValid(description)) {
            console.warn(`${this.validifyWarningMessage} wrong description`, skill.description)
            skill.description = ''
            isError = true
        }

        if(!SkillElementValidator.isNameValid(name)) {
            console.warn(`${this.validifyWarningMessage} wrong name`, skill.name)
            skill.name = ''
            isError = true
        }

        if(!SkillElementValidator.isChildrenArray(children)) {
            console.warn(`${this.validifyWarningMessage} wrong children`, skill.children)
            skill.children = []
            isError = true
        }
        else {
            skill.children.forEach(child => {
                let [_, childError] = this.validify(child, root)
                if(childError)
                    isError = childError
            })
        }

        return [skill, isError]
    }

    static validifyWarningMessage = 'Validify Warning:'
    static createdObjects = 0
}