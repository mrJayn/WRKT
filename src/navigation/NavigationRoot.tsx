import { useEffect, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '@colors'
import usePreferredTheme from '@hooks/useColorScheme'
import navigationRef from './navigationRef'
import AppNavigator from './AppNavigator'
import linkingConfig from './linkingConfig'

type NavigationRootProps = {
	isAuthenticated: boolean
	onReady: () => void
}

function NavigationRoot({ isAuthenticated, onReady }: NavigationRootProps) {
	const colorScheme = usePreferredTheme()

	const navigationTheme = useMemo(
		() => ({
			dark: colorScheme === 'dark',
			colors: {
				primary: colors.tint.primary[colorScheme],
				border: colors.separator[colorScheme],
				text: colors.tint.title[colorScheme],
				notification: colors.blue.neon,
				background: 'transparent',
				card: 'transparent',
			},
		}),
		[colorScheme]
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
