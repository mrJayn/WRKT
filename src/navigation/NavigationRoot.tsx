import React, { useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import navigationRef from './navigationRef'
import AppNavigator from './AppNavigator'
import linkingConfig from './linkingConfig'
import useTheme from '@hooks/useTheme'

type NavigationRootProps = {
	isAuthenticated: boolean
	onReady: () => void
}

function NavigationRoot({ isAuthenticated, onReady }: NavigationRootProps) {
	const theme = useTheme()

	const navigationTheme = useMemo(
		() => ({
			dark: theme.type === 'dark',
			colors: {
				primary: theme.darkgreen[10],
				text: theme.tint.title,
				notification: theme.tint.nav,
				border: theme.separator,
				background: theme.transparent,
				card: theme.transparent,
			},
		}),
		[theme]
	)

	useEffect(() => {
		if (!navigationRef.isReady() || !isAuthenticated) {
			return
		}
		navigationRef.resetRoot(navigationRef.getRootState())
	}, [isAuthenticated])

	return (
		<NavigationContainer
			// initialState={}
			// onStateChange={}
			onReady={onReady}
			theme={navigationTheme}
			ref={navigationRef}
			linking={linkingConfig}
			documentTitle={{ enabled: false }}
		>
			<AppNavigator isAuthenticated={isAuthenticated} />
		</NavigationContainer>
	)
}

NavigationRoot.displayName = 'NavigationRoot'

export default NavigationRoot
