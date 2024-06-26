// Mobile apps do not require this check for visibility as
// they do not use the Notification lib.
import { AppState } from 'react-native'
import { HasFocus, IsVisible, OnVisibilityChange } from './types'

const isVisible: IsVisible = () => AppState.currentState === 'active'

const hasFocus: HasFocus = () => true

const onVisibilityChange: OnVisibilityChange = (callback) => {
	const subscription = AppState.addEventListener('change', () => callback())
	return () => subscription.remove()
}

export default {
	isVisible,
	hasFocus,
	onVisibilityChange,
}
