import {
	getPathFromState,
	StackActions,
	CommonActions,
	NavigationContainerRef,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native'
import navigationRef from './navigationRef'
import ROUTES, { Route } from '@src/ROUTES'
import linkTo from './linkTo'
import { NavigationRef, NavigationRoot, RootStackParamList, RootStackScreenProps, State } from './types'
import NAVIGATORS from '@src/NAVIGATORS'
import { StackNavigationProp } from '@react-navigation/stack'

let resolveNavigationIsReadyPromise: () => void

const navigationIsReadyPromise = new Promise<void>((resolve) => {
	resolveNavigationIsReadyPromise = resolve
})

let pendingRoute: Route | null = null

/**
 * Whether the navigation container is ready to handle actions.
 */
function canNavigate(methodName: string, params: Record<string, unknown> = {}): boolean {
	if (navigationRef.isReady()) {
		return true
	}
	console.log(`[Navigation] ${methodName} failed because navigation ref was not yet ready`, params)
	return false
}

/**
 * Main navigation method for redirecting to a route.
 */
function navigate(route: Route = ROUTES.HOME, type?: string) {
	if (!canNavigate('navigate', { route })) {
		pendingRoute = route
		return
	}

	linkTo(navigationRef.current, route, type)
}

/**
 * Main navigation method for go back a screen in the stack.
 */
function goBack({ shouldPopToTop }: { shouldPopToTop?: boolean | undefined } = {}) {
	if (!canNavigate('goBack')) {
		return
	}

	if (shouldPopToTop === true) {
		navigationRef.current?.dispatch(StackActions.popToTop())
		return
	}

	if (!navigationRef.current?.canGoBack()) {
		console.log('[Navigation] Unable to go back.')
		return
	}

	navigationRef.current.goBack()
}

/**
 * Return the current active route.
 */
function getActiveRoute(): string {
	const currentRoute = navigationRef.current && navigationRef.current.getCurrentRoute()
	if (!currentRoute?.name) {
		return ''
	}

	if (currentRoute?.path) {
		return currentRoute.path
	}

	const rootState = navigationRef.getRootState()
	const options = undefined // linkingConfig.config

	return getPathFromState(rootState, options) || ''
}

function isNestedNavigator(targetNavigator?: string) {
	return (
		targetNavigator === NAVIGATORS.WORKOUTS_NAVIGATOR ||
		targetNavigator === NAVIGATORS.PROGRAMS_NAVIGATOR ||
		targetNavigator === NAVIGATORS.SETTINGS_NAVIGATOR
	)
}

const _getPartialStateCurrentRouteIndex = (state: State) => {
	// If the current route is a WorkoutsNavigator, ProgramsNavigator or SettingsNavigator,
	// then the previous route will be the last route from the `TabsNavigator`.
	if (typeof state.type === 'string' && state.type !== 'stack') {
		return 0
	}
	return state.routes.length - 1
}

/**
 * Return the current active route.
 */
function getPrevRouteName(): string | undefined {
	if (!canNavigate('getPrevRouteName')) {
		return
	}
	const state = navigationRef.current?.getState()

	const prevIndex = state
		? !!state.index
			? state.index - 1
			: typeof state.type === 'string' && state.type !== 'stack'
			? 0
			: state.routes.length - 2
		: undefined

	console.log('prevIndex=', prevIndex)
	//
	const rootState = navigationRef.current?.getRootState()

	if (!rootState) {
		return undefined
	}

	try {
		return rootState.routes[rootState.routes.length - 1].name
	} catch {
		console.log('[ Navigation ] No previous route currently exists in the navigation state.')
		return undefined
	}
}

/**
 * Update route params for the specified route.
 */
function setParams(params: Record<string, unknown>, routeKey = '') {
	navigationRef.current?.dispatch({
		...CommonActions.setParams(params),
		source: routeKey,
	})
}

function isNavigationReady(): Promise<void> {
	return navigationIsReadyPromise
}

function setIsNavigationReady() {
	if (pendingRoute !== null) {
		// navigate to the pending route
		console.log(`[Navigation] Container now ready, going to pending route: ${pendingRoute}`)
		navigate(pendingRoute)
		pendingRoute = null
	}
	resolveNavigationIsReadyPromise()
}

export default {
	navigate,
	goBack,
	getPrevRouteName,
	isNavigationReady,
	setIsNavigationReady,
}

/*
const _includesProtectedRoutes = (state: State | undefined) => {
	return !!state?.routeNames && Array.isArray(state.routeNames) && state.routeNames.includes(PROTECTED_SCREENS.HOME)
}

function waitForProtectedRoutes() {
	return new Promise<void>((resolve) => {
		isNavigationReady().then(() => {
			if (_includesProtectedRoutes(navigationRef.current?.getState())) {
				resolve()
				return
			}
			const unsubscribe = navigationRef.current?.addListener('state', ({ data }) => {
				if (_includesProtectedRoutes(data?.state)) {
					unsubscribe?.()
					resolve()
				}
			})
		})
	})
}
*/
