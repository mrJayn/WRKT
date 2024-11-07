import type {
	CommonActions,
	CompositeScreenProps,
	NavigationContainerRef,
	NavigationContainerRefWithCurrent,
	NavigationHelpers,
	NavigationState,
	NavigatorScreenParams,
	ParamListBase,
	PartialRoute,
	PartialState,
	Route,
} from '@react-navigation/native'
import type { StackNavigationOptions, StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import CONST from '@src/CONST'
import NAVIGATORS from '@src/NAVIGATORS'
import SCREENS from '@src/SCREENS'
import type { Route as Routes } from '@src/ROUTES'
import type { Workout, Day, Program, Week } from '@src/types/features'
import type { ValueOf } from '@src/types/utils'
import type { LinkModalType } from '@screens/LinkModal'

type NavigationRef = NavigationContainerRefWithCurrent<RootStackParamList>

type NavigationRoot = NavigationHelpers<RootStackParamList>

/**  Navigation Actions  */
type GoBackAction = Extract<CommonActions.Action, { type: 'GO_BACK' }>
type ResetAction = Extract<CommonActions.Action, { type: 'RESET' }>
type SetParamsAction = Extract<CommonActions.Action, { type: 'SET_PARAMS' }>

type ActionNavigate = {
	type: ValueOf<typeof CONST.NAVIGATION.ACTION_TYPE>
	payload: {
		name?: string
		key?: string
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		params?: any
		path?: string
		merge?: boolean
	}
	source?: string
	target?: string
}

type StackNavigationAction = GoBackAction | ResetAction | SetParamsAction | ActionNavigate | undefined

/**  State and routes  */
type NavigationStateRoute = NavigationState['routes'][number]

type NavigationPartialRoute<TRouteName extends string = string> = PartialRoute<Route<TRouteName>>

type StateOrRoute = NavigationState | NavigationStateRoute | NavigationPartialRoute

type State<TParamList extends ParamListBase = ParamListBase> =
	| NavigationState<TParamList>
	| PartialState<NavigationState<TParamList>>

/**  All navigator param lists  */
type RegisterStackParamList = {
	[SCREENS.REGISTER.WITH_EMAIL]: undefined
	[SCREENS.REGISTER.USER_EXISTS_MODAL]: {
		email: string
	}
	[SCREENS.REGISTER.CREATE_PASSWORD]: {
		email: string
	}
	[SCREENS.REGISTER.CREATE_USERNAME]: {
		email: string
		password: string
	}
}

type WorkoutsStackParamList = {
	[SCREENS.WORKOUTS.DAYS]: {
		workoutID: number
	}
	[SCREENS.WORKOUTS.DAYS_DETAIL]: {
		day: Day
	}
}
type ProgramsStackParamList = {
	[SCREENS.PROGRAMS.WEEKS]: {
		program: Program
	}
	[SCREENS.PROGRAMS.WEEKS_DETAIL]: {
		week: Week
	}
}

type SettingsStackParamList = {
	[SCREENS.SETTINGS.ROOT]: undefined
	[SCREENS.SETTINGS.ACCOUNT]: undefined
	[SCREENS.SETTINGS.PREFERENCES]: undefined
	[SCREENS.SETTINGS.MAXES]: undefined
	[SCREENS.SETTINGS.LIBRARY]: undefined
	[SCREENS.SETTINGS.DELETE_ACCOUNT]: undefined
}

type TabsNavigatorParamList = {
	[SCREENS.TABS.MAIN]: undefined
	[SCREENS.TABS.WORKOUTS]: undefined
	[SCREENS.TABS.PROGRAMS]: undefined
	[SCREENS.TABS.SETTINGS]: undefined
}

// PublicStack => `GettingStartedScreen`
// AuthStack => `TabsNavigator`
type SharedScreensParamList = {
	[NAVIGATORS.TABS_NAVIGATOR]: NavigatorScreenParams<TabsNavigatorParamList>
	// [SCREENS.TRANSITION_BETWEEN_APPS]: undefined
	[SCREENS.REFRESH_TOKEN]: undefined
	[SCREENS.NOT_FOUND]: undefined
}

type PublicStackParamList = SharedScreensParamList & {
	[NAVIGATORS.REGISTER_NAVIGATOR]: NavigatorScreenParams<RegisterStackParamList>
	[SCREENS.LOGIN]: { email: string }
	[SCREENS.FORGOT_PASSWORD]: undefined
}

type AuthStackParamList = SharedScreensParamList & {
	[NAVIGATORS.WORKOUTS_NAVIGATOR]: NavigatorScreenParams<WorkoutsStackParamList>
	[NAVIGATORS.PROGRAMS_NAVIGATOR]: NavigatorScreenParams<ProgramsStackParamList>
	[NAVIGATORS.SETTINGS_NAVIGATOR]: NavigatorScreenParams<SettingsStackParamList>
}

/** Param list type for the `RootStack` navigator. */
type RootStackParamList = PublicStackParamList & AuthStackParamList

/** Screen props type for the `RootStack` navigator. */
type RootStackScreenProps<RouteName extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, RouteName>

/** Screen props type for the `TabsNavigator` navigator. */
type TabsNavigatorScreenProps<RouteName extends keyof TabsNavigatorParamList> = CompositeScreenProps<
	BottomTabScreenProps<TabsNavigatorParamList, RouteName>,
	RootStackScreenProps<typeof NAVIGATORS.TABS_NAVIGATOR>
>

/** Screen props type for the `WorkoutsStack` navigator. */
type WorkoutsStackScreenProps<RouteName extends keyof WorkoutsStackParamList> = CompositeScreenProps<
	StackScreenProps<WorkoutsStackParamList, RouteName>,
	RootStackScreenProps<typeof NAVIGATORS.WORKOUTS_NAVIGATOR>
>

/** Screen props type for the `EditorStack` navigator. */
type EditorStackScreenProps<RouteName extends keyof WorkoutsStackParamList | keyof ProgramsStackParamList> =
	CompositeScreenProps<
		StackScreenProps<WorkoutsStackParamList & ProgramsStackParamList, RouteName>,
		RootStackScreenProps<typeof NAVIGATORS.WORKOUTS_NAVIGATOR>
	>

export type {
	NavigationRef,
	NavigationRoot,
	//
	GoBackAction,
	ResetAction,
	SetParamsAction,
	ActionNavigate,
	StackNavigationAction,
	//
	NavigationStateRoute,
	NavigationPartialRoute,
	StateOrRoute,
	State,
	//
	RegisterStackParamList,
	PublicStackParamList,
	TabsNavigatorParamList,
	WorkoutsStackParamList,
	ProgramsStackParamList,
	SettingsStackParamList,
	AuthStackParamList,
	//
	RootStackParamList,
	RootStackScreenProps,
	TabsNavigatorScreenProps,
	WorkoutsStackScreenProps,
	//
}

/*
type RootStackParamList = {
	[SCREENS.CONTENT]: ContentStackParamList
	[SCREENS.PUBLIC]: PublicStackParamList
}
type RootStackNavigationProp = StackScreenProps<RootStackParamList>["navigation"]
type RootStackRouteProp = StackScreenProps<RootStackParamList>["route"]
type RootStackNavigationState = StackNavigationState<RootStackParamList>


type PublicStackNavigationProp<T extends keyof PublicStackParamList> = CompositeNavigationProp<
	StackNavigationProp<PublicStackParamList, T>,
	RootStackNavigationProps<'PublicScreens'>
>

type PublicStackNavigationState = StackNavigationState<PublicStackParamList>

type PublicStackScreenProps<T extends keyof PublicStackParamList> = CompositeScreenProps<
	StackScreenProps<PublicStackParamList, T>,
	RootStackScreenProps<'PublicScreens'>
>

type ContentStackNavigationProp<T extends keyof ContentStackParamList> = CompositeNavigationProp<
	StackNavigationProp<ContentStackParamList, T>,
	RootStackNavigationProps<'ContentScreens'>
>

type ContentStackNavigationState = StackNavigationState<ContentStackParamList>

type ContentStackScreenProps<T extends keyof ContentStackParamList> = CompositeScreenProps<
	StackScreenProps<ContentStackParamList, T>,
	RootStackScreenProps<'ContentScreens'>
>

type TabsNavigationProp = BottomTabNavigationProp<TabsParamList>

// NOTE: `BottomTabsNavigationProp` does not provide a navigation state.

type TabsScreenProps<T extends keyof TabsParamList> = CompositeScreenProps<
	BottomTabScreenProps<TabsParamList, T>,
	ContentStackScreenProps<'Tabs'>
>
*/
