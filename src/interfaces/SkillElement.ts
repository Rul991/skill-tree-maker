export default interface SkillElement {
    id: string
    name: string
    description: string
    children: SkillElement[]
    isRoot?: true
}