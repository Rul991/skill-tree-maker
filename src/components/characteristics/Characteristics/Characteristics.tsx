import type CharacteristicsProps from '../../../props/CharacteristicsProps'
import CharacteristicElement from '../CharacteristicElement'

const Characteristics = ({elements}: CharacteristicsProps) => {
    const usedElements = elements ?? []

    return (
        <div>
            {
                usedElements.map(({title, value}, i) => 
                    <CharacteristicElement key={i} title={title} value={value} />
                )
            }
        </div>
    )
}

export default Characteristics