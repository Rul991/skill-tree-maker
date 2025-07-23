import type { PropsWithChildren } from 'react'

export default interface ClickButtonProps extends PropsWithChildren {
    onClick?: VoidFunction
    click?: boolean
    className?: string
}