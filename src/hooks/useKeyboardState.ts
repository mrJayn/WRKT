import { useEffect, useMemo, useState } from 'react'
import { Keyboard } from 'react-native'

type KeyboardState = {
	/** Whether the keyboard is open */
	isKeyboardShown: boolean

	/** Height of the keyboard in pixels */
	keyboardHeight: number
}

function useKeyboardState() {
	const [keyboardHeight, setKeyboardHeight] = useState(0)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
			setKeyboardHeight(e.endCoordinates.height)
		})

		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardHeight(0)
		})

		return () => {
			keyboardDidShowListener.remove()
			keyboardDidHideListener.remove()
		}
	}, [])

	const keyboardState: KeyboardState = useMemo(
		() => ({
			keyboardHeight,
			isKeyboardShown: keyboardHeight !== 0,
		}),
		[keyboardHeight]
	)

	return keyboardState
}

export default useKeyboardState
export type { KeyboardState }
