import React from 'react'
import {
	createNavigatorFactory,
	useNavigationBuilder,
	DefaultNavigatorOptions,
	ParamListBase,
	TabRouter,
	TabNavigationState,
	TabRouterOptions,
	TabActionHelpers,
} from '@react-navigation/native'
import { BottomTabNavigationOptions, BottomTabView, BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs'
import { BottomTabNavigationConfig } from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import TabBar from './TabBar/TabBar'

type Props = DefaultNavigatorOptions<
	ParamListBase,
	TabNavigationState<ParamListBase>,
	BottomTabNavigationOptions,
	BottomTabNavigationEventMap
> &
	TabRouterOptions &
	BottomTabNavigationConfig & {
		initialRouteName: string
	}

function CustomBottomTabNavigator({
	id,
	backBehavior = 'none',
	initialRouteName,
	children,
	screenOptions,
	...props
}: Props) {
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

	return (
		<NavigationContent>
			<BottomTabView
				{...props}
				tabBar={TabBar}
				state={state}
				navigation={navigation}
				descriptors={descriptors}
			/>
		</NavigationContent>
	)
}

CustomBottomTabNavigator.displayName = 'CustomBottomTabNavigator'

export default createNavigatorFactory(CustomBottomTabNavigator)
