import { NON_CHOOSED_INDEX } from '../utils/consts'
import ProviderCreator from './ProviderCreator'

const creator = new ProviderCreator(NON_CHOOSED_INDEX)

export const CurrentIndexContext = creator.context
export const CurrentIndexProvider = creator.createProvider()