import type { TabsNavigatorParamList, NavigationPartialRoute, RootStackParamList, State } from './types'

function getTopmostTabRoute(
	state: State<RootStackParamList> | undefined
): NavigationPartialRoute<keyof TabsNavigatorParamList> | undefined {
	const tabsNavigatorRoute = state?.routes[0]

	// The tabsNavigatorRoute state may be empty if we just logged in.
	if (!tabsNavigatorRoute || tabsNavigatorRoute.name !== 'TabsNavigator' || tabsNavigatorRoute.state === undefined) {
		return undefined
	}

	const topmostTabsRoute = tabsNavigatorRoute.state.routes.at(0) //tabsNavigatorRoute.state.routes.at(-1)

	if (!topmostTabsRoute) {
		throw new Error('TabNavigator route have no routes.')
	}

	return {
		name: topmostTabsRoute.name as keyof TabsNavigatorParamList,
		params: topmostTabsRoute.params,
	}
}

export default getTopmostTabRoute
