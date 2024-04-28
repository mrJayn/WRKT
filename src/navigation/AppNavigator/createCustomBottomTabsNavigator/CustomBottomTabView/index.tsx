import React, { useState } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { getHeaderTitle, Header, SafeAreaProviderCompat, Screen } from '@react-navigation/elements'
import type { ParamListBase, RouteProp } from '@react-navigation/native'
import { BottomTabBarHeightCallbackContext, BottomTabBarHeightContext } from '@react-navigation/bottom-tabs'
import type {
	BottomTabBarProps,
	BottomTabHeaderProps,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import RNBottomTabBar, { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar'
import { MaybeScreenContainer, MaybeScreen } from '@react-navigation/bottom-tabs/lib/typescript/src/views/ScreenFallback'
import type { CustomBottomTabViewProps } from './types'

const defaultHeader =
	(routeName: string) =>
	({ layout, options }: BottomTabHeaderProps) => (
		<Header
			{...options}
			layout={layout}
			title={getHeaderTitle(options, routeName)}
		/>
	)

function CustomBottomTabView(props: CustomBottomTabViewProps) {
	//
	const {
		tabBar = (props: BottomTabBarProps) => <RNBottomTabBar {...props} />,
		state,
		navigation,
		descriptors,
		safeAreaInsets,
		detachInactiveScreens = Platform.OS === 'web' || Platform.OS === 'android' || Platform.OS === 'ios',
		sceneContainerStyle,
	} = props

	const focusedRouteKey = state.routes[state.index].key
	const [loaded, setLoaded] = useState([focusedRouteKey])

	if (!loaded.includes(focusedRouteKey)) {
		setLoaded([...loaded, focusedRouteKey])
	}

	const dimensions = SafeAreaProviderCompat.initialMetrics.frame
	const [tabBarHeight, setTabBarHeight] = useState(() =>
		getTabBarHeight({
			state,
			descriptors,
			dimensions,
			layout: { width: dimensions.width, height: 0 },
			insets: {
				...SafeAreaProviderCompat.initialMetrics.insets,
				...props.safeAreaInsets,
			},
			style: descriptors[state.routes[state.index].key].options.tabBarStyle,
		})
	)

	const renderTabBar = () => (
		<SafeAreaInsetsContext.Consumer>
			{(insets) =>
				tabBar({
					state: state,
					descriptors: descriptors,
					navigation: navigation,
					insets: {
						top: safeAreaInsets?.top ?? insets?.top ?? 0,
						right: safeAreaInsets?.right ?? insets?.right ?? 0,
						bottom: safeAreaInsets?.bottom ?? insets?.bottom ?? 0,
						left: safeAreaInsets?.left ?? insets?.left ?? 0,
					},
				})
			}
		</SafeAreaInsetsContext.Consumer>
	)

	const mappedTab = ({ key, name }: RouteProp<ParamListBase>, index: number) => {
		const { navigation, route: _route, options, render } = descriptors[key]
		const isFocused = state.index === index

		if ((options.unmountOnBlur && !isFocused) || ((options.lazy || true) && !loaded.includes(key) && !isFocused)) {
			return null
		}
		const { freezeOnBlur, header = defaultHeader(name), headerShown, headerStatusBarHeight, headerTransparent } = options

		const headerComponent = header({
			layout: dimensions,
			route: _route,
			navigation: navigation as BottomTabNavigationProp<ParamListBase>,
			options: options,
		})

		return (
			<MaybeScreen
				key={key}
				style={[StyleSheet.absoluteFill, { zIndex: isFocused ? 0 : -1 }]}
				visible={isFocused}
				enabled={detachInactiveScreens}
				freezeOnBlur={freezeOnBlur}
			>
				<BottomTabBarHeightContext.Provider value={tabBarHeight}>
					<Screen
						focused={isFocused}
						route={_route}
						navigation={navigation}
						header={headerComponent}
						headerShown={headerShown}
						headerStatusBarHeight={headerStatusBarHeight}
						headerTransparent={headerTransparent}
						style={sceneContainerStyle}
					>
						{render()}
					</Screen>
				</BottomTabBarHeightContext.Provider>
			</MaybeScreen>
		)
	}

	return (
		<SafeAreaProviderCompat>
			<MaybeScreenContainer
				enabled={detachInactiveScreens}
				hasTwoStates={true}
				style={{ flex: 1, overflow: 'hidden' }}
			>
				{state.routes.map(mappedTab)}
			</MaybeScreenContainer>

			<BottomTabBarHeightCallbackContext.Provider value={setTabBarHeight}>
				{renderTabBar()}
			</BottomTabBarHeightCallbackContext.Provider>
		</SafeAreaProviderCompat>
	)
}

export default CustomBottomTabView
