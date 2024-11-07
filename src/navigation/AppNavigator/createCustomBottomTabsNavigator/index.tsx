import React from 'react'
import { View } from 'react-native'
import { createNavigatorFactory, useNavigationBuilder, TabRouter } from '@react-navigation/native'
import type {
	DefaultNavigatorOptions,
	ParamListBase,
	TabNavigationState,
	TabRouterOptions,
	TabActionHelpers,
} from '@react-navigation/native'
import { BottomTabView } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationOptions, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationConfig } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import SCREENS from '@src/SCREENS'
import type { NavigationStateRoute } from '@navigation/types'
import ScreenWrapper from '@components/ScreenWrapper'
import TabBar from './TabBar/TabBar'

type CustomBottomTabNavigatorProps = DefaultNavigatorOptions<
	ParamListBase,
	TabNavigationState<ParamListBase>,
	BottomTabNavigationOptions,
	BottomTabNavigationEventMap
> &
	TabRouterOptions &
	BottomTabNavigationConfig & {
		initialRouteName: string
	}

function getStateToRender(state: TabNavigationState<ParamListBase>): TabNavigationState<ParamListBase> {
	const routesToRender = [state.routes.at(-1)] as NavigationStateRoute[]

	// Currently this value will be switched only after the first MAIN screen is rendered.
	if (routesToRender[0].name !== SCREENS.TABS.MAIN) {
		const routeToRender = state.routes.find((route) => route.name === SCREENS.TABS.MAIN)
		if (routeToRender) {
			routesToRender.unshift(routeToRender)
		}
	}

	return { ...state, routes: routesToRender, index: routesToRender.length - 1 }
}

function CustomBottomTabNavigator({
	id,
	backBehavior = 'none',
	initialRouteName,
	children,
	screenOptions,
	...props
}: CustomBottomTabNavigatorProps) {
	const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder<
		TabNavigationState<ParamListBase>,
		TabRouterOptions,
		TabActionHelpers<ParamListBase>,
		BottomTabNavigationOptions,
		BottomTabNavigationEventMap
	>(TabRouter, {
		id,
		initialRouteName,
		children,
		screenOptions,
		defaultScreenOptions: { headerShown: false },
		backBehavior: 'none',
	})

	const stateToRender = getStateToRender(state)

	return (
		<ScreenWrapper
			testID={CustomBottomTabNavigator.displayName}
			shouldShowOfflineIndicator={false}
			shouldEnableKeyboardAvoidingView={false}
		>
			<View style={{ flex: 1 }}>
				<NavigationContent>
					<BottomTabView
						{...props}
						tabBar={TabBar}
						state={state}
						navigation={navigation}
						descriptors={descriptors}
					/>
				</NavigationContent>
			</View>
		</ScreenWrapper>
	)
}

CustomBottomTabNavigator.displayName = 'CustomBottomTabNavigator'

export default createNavigatorFactory(CustomBottomTabNavigator)
