import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@features/auth'
import Navigation from '@navigation/Navigation'
import NavigationRoot from '@navigation/NavigationRoot'
import SplashTransitioner from '@components/SplashTransitioner'

function Wrkt() {
	const [isNavigationReady, setIsNavigationReady] = useState(false)
	const isAuthenticated = useSelector(selectIsAuthenticated)

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
