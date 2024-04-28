import React from 'react'
import Navigation from '@navigation/Navigation'

type AppNavigatorProps = {
	isAuthenticated: boolean
}

function AppNavigator({ isAuthenticated }: AppNavigatorProps) {
	if (isAuthenticated) {
		const ContentScreens = require('./AuthScreens').default
		return <ContentScreens />
	}

	const PublicScreens = require('./PublicScreens').default
	return <PublicScreens />
}

AppNavigator.displayName = 'AppNavigator'

export default AppNavigator
