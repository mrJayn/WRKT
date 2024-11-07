import { getPathFromState } from '@react-navigation/native'
import type { RootStackParamList, State } from '@navigation/types'

const customGetPathFromState: typeof getPathFromState = (state, options) => {
	const path = getPathFromState(state as State<RootStackParamList>, options)
	return path
}

export default customGetPathFromState
