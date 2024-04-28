import lodashGet from 'lodash/get'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { selectIsAuthenticated } from '@features/auth'

function CustomStatusBar() {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	return <StatusBar style={isAuthenticated ? 'auto' : 'light'} />
}

export default CustomStatusBar
