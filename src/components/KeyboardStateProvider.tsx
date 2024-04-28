import React, { createContext, useEffect, useMemo, useState } from 'react'
import { Keyboard } from 'react-native'
import { ChildrenProps } from '@src/types/utils'

type KeyboardStateContextValue = {
	isKeyboardShown: boolean
}

const KeyboardStateContext = createContext<KeyboardStateContextValue>({
	isKeyboardShown: false,
})

function KeyboardStateProvider({ children }: ChildrenProps): React.ReactElement | null {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
			setIsKeyboardShown(true)
		})
		const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
			setIsKeyboardShown(false)
		})
		return () => {
			keyboardDidShowListener.remove()
			keyboardDidHideListener.remove()
		}
	}, [])

	const contextValue = useMemo(() => ({ isKeyboardShown }), [isKeyboardShown])

	return <KeyboardStateContext.Provider value={contextValue}>{children}</KeyboardStateContext.Provider>
}

export default KeyboardStateProvider

export { KeyboardStateContext }

export type { KeyboardStateContextValue }
