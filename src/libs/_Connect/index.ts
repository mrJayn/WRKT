import { isString, isFunction } from 'lodash'
import { connect } from 'react-redux'
import filterObjectEntries from '@libs/filterObjectEntries'
import type { RootState } from '@features/Store'
import type { StateToPropsMap, DispatchToPropsMap, SelectorFn, ViewsetAction } from './types'
import type { ValueOf } from '@src/types/utils'

const CONNECT_SELECTOR_TYPE = {
	DATA: 'data',
	INFO: 'info',
} as const

const FEATURE_KEYS = {
	// Features
	AUTH_STATE: 'authState',
	// store slices
	AUTH: 'auth',
	USER: 'user',
	PROFILE: 'profile',
	WORKOUTS: 'workouts',
	DAYS: 'days',
	PROGRAMS: 'programs',
	WEEKS: 'weeks',
	EXERCISES: 'exercises',
	//
	ACTIVE_WORKOUT: 'activeWorkout',
	//
	APP_OPEN: 'openApp',
	APP_RECONNECT: 'reconnectApp',

	//
	SCREENS: {
		LOGIN: 'loginScreen',
		REGISTER: 'registerScreen',
		//
		MAIN: 'MainScreen',
		WORKOUTS: 'WorkoutsScreen',
		PROGRAMS: 'ProgramsScreen',
		PROFILE: 'ProfileScreen',
	},
} as const

const CONNECTION_KEYS = {
	[FEATURE_KEYS.AUTH]: {
		mapDispatch: null,
	},
	[FEATURE_KEYS.USER]: {
		mapDispatch: null,
	},
	[FEATURE_KEYS.PROFILE]: {
		mapDispatch: null,
	},
	[FEATURE_KEYS.WORKOUTS]: {
		mapDispatch: null,
	},
	[FEATURE_KEYS.DAYS]: {
		mapDispatch: null,
	},
	//[FEATURE_KEYS.PROGRAMS]: Programs,
	//[FEATURE_KEYS.WEEKS]: Weeks,
	[FEATURE_KEYS.EXERCISES]: {
		mapDispatch: null,
	},
} as const

// Note that any time the store is updated, mapStateToProps will be called
// **********
// https://redux.js.org/usage/deriving-data-selectors#creating-unique-selector-instances
// **********

type SelectorType = ValueOf<typeof CONNECT_SELECTOR_TYPE>

type ConnectionKey = keyof typeof CONNECTION_KEYS

type ConnectProps = {
	key: ConnectionKey
	selector?: SelectorType | string | SelectorFn
	actions?: ViewsetAction[]
	stateProps?: boolean
	dispatchProps?: boolean
}

function Connect({ key, selector, actions = undefined, stateProps = true, dispatchProps = true }: ConnectProps) {
	const { mapDispatch } = CONNECTION_KEYS[key] || null
	// map state props
	let mapStateToProps: StateToPropsMap = () => ({})

	if (stateProps === true) {
		mapStateToProps = (rootState: RootState) => {
			const sliceState = rootState[key]

			if (selector) {
				if (isString(selector) && (selector === 'data' || selector === 'info')) {
					if (selector === 'data') {
						return sliceState
					}
					return {}
				} else if (isFunction(selector)) {
					return selector(sliceState)
				}
			}

			return sliceState
		}
	}

	// map dispatch props
	let mapDispatchToProps: DispatchToPropsMap = () => ({})
	/*
	if (dispatchProps === true) {
		mapDispatchToProps = (dispatch: AppDispatch) => {
			const sliceDispatch = mapDispatch(dispatch)
			if (actions && isArray(actions)) {
				// @ts-expect-error
				let keyedDispatch = filterObject(sliceDispatch, ([k, v]) => actions.includes(k))

				if (Object.keys(keyedDispatch).length > 0) {
					return keyedDispatch
				}

				return sliceDispatch
			}
			return sliceDispatch
		}
	}

		const mergeProps = (stateProps?: StateProps, dispatchProps?: DispatchProps, ownProps?: any) => ({
		...ownProps,
		...stateProps,
		...dispatchProps,
	})
*/
	return connect(mapStateToProps, mapDispatchToProps)
}

/*
// Get map for stateProps
	mapStateToProps = (rootState: RootState) => {
		return slicesList.reduce((acc, { propName, mapState }) => ({ ...acc, [propName]: mapState(rootState) }), {})
	}

	// Get map for dispatch props
	mapDispatchToProps = (dispatch: AppDispatch) => {
		return slicesList.reduce((acc, { mapDispatch }) => {
			if (!mapDispatch) {
				return acc
			}
			const dispatchedActions = Object.entries(mapDispatch).reduce((acc, [fnKey, fn]) => {
				return { ...acc, [fnKey]: (props: any) => dispatch(fn(props)) }
			}, {})
			return { ...acc, ...dispatchedActions }
		}, {})
	}
*/
