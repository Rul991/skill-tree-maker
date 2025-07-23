import { createContext, useState, type Context, type PropsWithChildren } from 'react'
import type { ContextValue } from '../utils/types'

export default class ProviderCreator<T> {
    private _defaultValue: T
    private _context: Context<ContextValue<T>>

    constructor(defautlValue: T) {
        this._defaultValue = defautlValue
        this._context = this._createContext()
    }

    private _getDefaultValueTuple(): ContextValue<T> {
        return [this.getDefaultValue(), (_: T) => {this.getDefaultValue()}]
    }

    private _createContext(): Context<ContextValue<T>> {
        return createContext(this._getDefaultValueTuple())
    }

    getDefaultValue(): T {
        if(typeof this._defaultValue == 'object' && this._defaultValue !== null) {
            const result = {} as T & object
            Object.assign(result, this._defaultValue)
            
            return result
        }
        else return this._defaultValue
    }

    createProvider() {
        return ({children}: PropsWithChildren) => {
            const state = useState(this.getDefaultValue())
            return <this._context value={state}>{children}</this._context>
        }
    }

    get context(): Context<ContextValue<T>> {
        return this._context
    }
}