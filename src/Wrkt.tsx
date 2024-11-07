import React, { useCallback, useState } from 'react'
import Navigation from '@navigation/Navigation'
import NavigationRoot from '@navigation/NavigationRoot'
import { selectIsAuthenticated } from '@features/auth/authSlice'
import SplashTransitioner from '@components/SplashTransitioner'
import useAppSelector from '@hooks/useAppSelector'

function Wrkt() {
	const [isNavigationReady, setIsNavigationReady] = useState(false)

	// https://github.com/wpcodevo/JWT_Authentication_React/blob/master/frontend/src/components/requireUser.tsx
	const isAuthenticated = useAppSelector(selectIsAuthenticated)

	// const isBackendReachable = true // useAppSelector(selectIsBackendReachable)
	// const isUpdateAvailable = false // useSelector(selectIsUpdateAvailable)
	// const isUpdateRequired = false // useSelector(selectIsUpdateRequired)

	const onNavigationReady = useCallback(() => {
		setIsNavigationReady(true)
		// Navigate to any pending routes now that the NavigationContainer is ready
		Navigation.setIsNavigationReady()
	}, [])

	return (
		<>
			<NavigationRoot
				isAuthenticated={isAuthenticated}
				onReady={onNavigationReady}
			/>
			<SplashTransitioner isNavigationReady={isNavigationReady} />
		</>
	)
}

Wrkt.displayName = 'Wrkt'

export default Wrkt
