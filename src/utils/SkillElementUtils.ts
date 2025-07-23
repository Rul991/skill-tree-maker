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

    static fromJson(json: string): SkillElement | null {
        try {
            let obj: SkillElement = JSON.parse(json)
            
            if(SkillElementValidator.isSkillValid(obj)) 
                return {...obj, isRoot: true}
            else {
                console.warn('Wrong object:', obj)
                return null
            }
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
                skill.id = ''
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
}