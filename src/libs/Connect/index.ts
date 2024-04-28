import _ from 'lodash'
import { connect } from 'react-redux'
//
import type { AppDispatch, RootState } from '@features/Store'
import type {
	StateProps,
	MapStateToProps,
	DispatchProps,
	MapDispatchToProps,
	SelectorString,
	SelectorFn,
	ActionString,
} from './types'
import { filterObject } from './helpers'

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

const ConnectionsMap = {
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
}

type ConnectionsMapKeyOf = keyof typeof ConnectionsMap

type Props = {
	key: ConnectionsMapKeyOf
	selector?: SelectorString | string | SelectorFn
	actions?: 'all' | Array<ActionString>
	stateProps?: boolean
	dispatchProps?: boolean
}

// Note that any time the store is updated, mapStateToProps will be called
// **********
// https://redux.js.org/usage/deriving-data-selectors#creating-unique-selector-instances
// **********

const preMadeSelector = (type: string, state: RootState[keyof RootState]) => {
	const { ...data } = state
	return type === 'data' ? data : {}
}

function Connect({ key, selector, actions, stateProps = true, dispatchProps = true }: Props) {
	const { mapDispatch } = ConnectionsMap[key] || null
	// map state props
	let mapStateToProps: MapStateToProps = () => ({})

	if (stateProps === true) {
		mapStateToProps = (rootState: RootState) => {
			const sliceData = rootState[key]
			//
			if (selector) {
				if (_.isString(selector) && ['data', 'info'].includes(selector)) {
					return preMadeSelector(selector, sliceData)
					//
				} else if (_.isFunction(selector)) {
					return selector(sliceData)
				}
			}
			return sliceData
		}
	}

	// map dispatch props
	let mapDispatchToProps: MapDispatchToProps = () => ({})
	/*
	if (dispatchProps === true) {
		mapDispatchToProps = (dispatch: AppDispatch) => {
			const sliceDispatch = mapDispatch(dispatch)
			if (actions && _.isArray(actions)) {
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

export default Connect

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
