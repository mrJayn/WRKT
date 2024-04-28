import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
/**
 *
 * @param {React.EffectCallback} callback — Imperative function that can return a cleanup function
 * @returns {void}
 */
export default function useOnFocus({ onFocus = () => null, onBlur = () => null } = {}) {
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener('focus', onFocus)
		const unsubscribeBlur = navigation.addListener('blur', onBlur)
		return () => {
			unsubscribeFocus()
			unsubscribeBlur()
		}
	}, [navigation, onFocus, onBlur])
}
