import { useRef, useEffect } from 'react'
import { AppState } from 'react-native'

const isActive = (state) => state === 'active'
const isBlur = (state) => state.match(/inactive|background/)

function useOnAppStateChange(callback, key = 'focus') {
	const appState = useRef(AppState.currentState)
	// const [state, setState] = useState(appState.current)
	useEffect(() => {
		const subscription = AppState.addEventListener('change', (next) => {
			if (
				(key === 'focus' && isBlur(appState.current) && next === 'active') ||
				(key === 'blur' && appState.current === 'active' && isBlur(next))
			)
				callback()
			appState.current = next
		})
		return () => subscription.remove()
	}, [])
	// return state
}

function useOnAppFocus(callback) {
	return useOnAppStateChange(callback, 'focus')
}

function useOnAppBlur(callback) {
	return useOnAppStateChange(callback, 'blur')
}

export default useOnAppStateChange
export { useOnAppFocus, useOnAppBlur }
