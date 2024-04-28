//
//
//
//
import { getActionFromState, getStateFromPath as RNgetStateFromPath } from '@react-navigation/core'
import {
	NavigationAction,
	NavigationContainerRef,
	NavigationState,
	PartialState,
	TabActions,
} from '@react-navigation/native'
import type { Writable } from 'type-fest'
import CONST from '@src/CONST'
import NAVIGATORS from '@src/NAVIGATORS'
import type { Route } from '@src/ROUTES'
import getTopMostTabRoute from './getTopMostTabRoute'
import linkingConfig from './linkingConfig'
import type { NavigationRoot, RootStackParamList, StackNavigationAction, State } from './types'
import SCREENS from '@src/SCREENS'
import customGetStateFromPath from './getStateFromPath'

const { NAVIGATE, PUSH, REPLACE } = CONST.NAVIGATION.ACTION_TYPE

type ActionPayloadParams<TParams = unknown> = {
	screen?: string
	params?: TParams
	path?: string
}

type ActionPayload = {
	params?: ActionPayloadParams
}

type RootStackNavigationState = NavigationState<RootStackParamList>

function getPathWithoutPolicyID(path: string) {
	return path.replace(CONST.REGEX.PATH_WITHOUT_POLICY_ID, '/')
}

function getPathWithoutOptionalParams(path: string) {
	return path.replace(/(:\w+\?($|\s))/g, '')
}

/**
 * Motivation for this function is described in NAVIGATION.md
 * @param action action generated by getActionFromState
 * @param state The root state
 * @returns minimalAction minimal action is the action that we should dispatch
 */
function getMinimalAction(action: NavigationAction, state: NavigationState): Writable<NavigationAction> {
	let currentAction: NavigationAction = action
	let currentState: State | undefined = state
	let currentTargetKey: string | undefined

	while (
		currentAction.payload &&
		'name' in currentAction.payload &&
		currentState?.routes[currentState.index ?? -1].name === currentAction.payload.name
	) {
		if (!currentState?.routes[currentState.index ?? -1].state) {
			break
		}

		currentState = currentState?.routes[currentState.index ?? -1].state
		currentTargetKey = currentState?.key

		const payload = currentAction.payload as ActionPayload

		// Creating new smaller action
		currentAction = {
			type: currentAction.type,
			payload: {
				name: payload?.params?.screen,
				params: payload?.params?.params,
				path: payload?.params?.path,
			},
			target: currentTargetKey,
		}
	}
	return currentAction
}

// Because we need to change the type to push, we also need to set target for this action to the bottom tab navigator.
function getActionForTabsNavigator(
	action: StackNavigationAction,
	state: NavigationState<RootStackParamList>
): Writable<NavigationAction> | undefined {
	const tabNavigatorRoute = state.routes.at(0)

	if (
		!tabNavigatorRoute ||
		tabNavigatorRoute.state === undefined ||
		!action ||
		action.type !== CONST.NAVIGATION.ACTION_TYPE.NAVIGATE
	) {
		return
	}
	const params = action.payload.params as ActionPayloadParams
	const currentTab = getTopMostTabRoute(state)

	if (currentTab?.name === params.screen) {
		return
	}

	return {
		type: 'JUMP_TO',
		payload: {
			name: params.screen,
			params: params.params as Record<string, string | undefined>,
		},
		target: tabNavigatorRoute.state.key,
	}
}

function normalizePath(path: string) {
	// Removes optional param strings and ensure the path begins with a "/".
	let p = path.replace(/(:\w+\?($|\s))/g, '')
	return p.startsWith('/') ? p : `/${p}`
}

/**
 * Method to get the root navigation from a given navigation object.
 * @param navigation - A navigation object.
 */
function getRootNavigation(navigation: NavigationContainerRef<RootStackParamList>) {
	let root: NavigationRoot = navigation
	let current: NavigationRoot | undefined

	while ((current = root.getParent())) {
		root = current
	}

	return root
}

export default function linkTo(navigation: NavigationContainerRef<RootStackParamList> | null, path: Route, type?: string) {
	if (!navigation) {
		throw new Error("Couldn't find a navigation object. Is your component inside a screen in a navigator?")
	}
	const root = getRootNavigation(navigation)
	const rootState = navigation.getRootState() as RootStackNavigationState
	// const normalPath = normalizePath(path) as Route
	// const stateFromPath = RNgetStateFromPath(normalPath, linkingConfig.config) as PartialState<RootStackNavigationState>
	const stateFromPath = customGetStateFromPath(path)

	// console.log('action=', action)

	const action: StackNavigationAction = getActionFromState(stateFromPath, linkingConfig.config)

	if (action?.type === NAVIGATE) {
		if (type === REPLACE) {
			action.type = REPLACE
			//
		} else if (action.payload.name === NAVIGATORS.TABS_NAVIGATOR) {
			const actionForTabsNavigator = getActionForTabsNavigator(action, rootState)
			if (!actionForTabsNavigator) {
				return
			}
			return root.dispatch(actionForTabsNavigator)
		}
	}

	// const payloadName = action && 'payload' in action && action.payload && 'name' in action.payload && action.payload.name
	// const isTargetModalNavigator = payloadName && isModalNavigator(payloadName)

	if (action !== undefined) {
		return root.dispatch(action)
	}

	root.reset(stateFromPath)
}
