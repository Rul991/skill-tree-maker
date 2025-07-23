import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react'
import styles from './Input.module.less'
import type InputProps from '../../../props/InputProps'
import { MAX_SYMBOLS } from '../../../utils/consts'

const Input = ({
    max, 
    type, 
    title, 
    value: inputValue,
    onChange = () => {},
    onPreChange = val => val
}: InputProps) => {
    const getValue = () => {
        return typeof inputValue != type ? (type == 'string' ? '' : 0) : inputValue!
    }

    const [value, setValue] = useState(getValue())

    useEffect(() => {
        if(!inputValue) setValue(getValue())
        else setValue(inputValue)
    }, [inputValue])

    const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const minValue = 0
        const maxValue = max || Number.MAX_SAFE_INTEGER

        let value = e.target.valueAsNumber

        if(value < minValue) value = minValue
        else if(value > maxValue) value = maxValue

        setValue(value)
    }

    const onStringChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setValue(value.substring(0, max || MAX_SYMBOLS))
    }

    const saveChanges = () => {
        const newValue = typeof value == 'string' ? onPreChange(value) : value
        
        onChange(newValue)
        setValue(newValue)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.code == 'Enter') {
            saveChanges()
        }
    }

    return <div className={styles.component}>
        <div className={styles.title}>{title}:</div>
        <input 
            className={styles.input} 
            placeholder={title}
            onChange={type == 'number' ? onNumberChange : onStringChange} 
            onBlur={saveChanges}
            onKeyDown={onKeyDown}
            type={type}
            value={value} 
        />
    </div>
}

export default Input