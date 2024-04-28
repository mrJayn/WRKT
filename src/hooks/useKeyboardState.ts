import { useContext } from 'react'
import { KeyboardStateContext, type KeyboardStateContextValue } from '@components/KeyboardStateProvider'

export default function useKeyboardState(): KeyboardStateContextValue {
	return useContext(KeyboardStateContext)
}
