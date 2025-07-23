export default interface InputProps {
    title: string;
    type: 'string' | 'number';
    max?: number;
    value?: string | number
    onChange?: (value: string | number) => void
    onPreChange?: (value: string) => string
}