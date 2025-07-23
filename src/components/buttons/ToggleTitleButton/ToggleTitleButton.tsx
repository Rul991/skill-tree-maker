import type ToggleTittleButtonProps from '../../../props/ToggleTitleButtonProps'
import { useToggle } from '../../../utils/hooks'
import ClickButton from '../ClickButton'
import _ from './ToggleTitleButton.module.less'

const ToggleTitleButton = ({
    onToggle: onClick = () => {}, 
    titles
}: ToggleTittleButtonProps) => {
    const [isActive, toggleActive] = useToggle()

    const buttonClick = () => {
        onClick(!isActive)
        toggleActive()
    }

    return <ClickButton onClick={buttonClick}>{titles[+isActive]}</ClickButton>
}

export default ToggleTitleButton