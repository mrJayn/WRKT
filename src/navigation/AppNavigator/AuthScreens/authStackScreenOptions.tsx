import { TextStyle } from 'react-native'
import { RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { colors } from '@colors'
import CONST from '@src/CONST'
import NAVIGATORS from '@src/NAVIGATORS'
import SCREENS from '@src/SCREENS'
import { forListHeader } from '@navigation/headerStyleInterpolators'
import { forSlideInFadeOut } from '@navigation/cardStyleInterpolators'
import type { RootStackParamList, RootStackScreenProps } from '@navigation/types'
import defaultScreenOptions, { defaultTextStyle } from '../defaultScreenOptions'

type RootStackNavigationOptions<RouteName extends keyof RootStackParamList = keyof RootStackParamList> =
	| StackNavigationOptions
	| ((props: RootStackScreenProps<RouteName>) => StackNavigationOptions)

const getTabHeaderTitle = (route: RouteProp<RootStackParamList>) => {
	let routeName = getFocusedRouteNameFromRoute(route)

	if (routeName && (routeName === SCREENS.TABS.WORKOUTS || routeName === SCREENS.TABS.PROGRAMS)) {
		// Remove "Tabs_" from the beginning of the route name.
		return routeName.slice(5)
	}

	return ''
}

const authScreenOptions: RootStackNavigationOptions = {
	...defaultScreenOptions,
	headerStyle: {
		height: 100,
	},
	headerTintColor: colors.blue.neon,
	headerTitleContainerStyle: {
		position: 'absolute',
		left: 0,
		height: 150,
	},
	headerTitleStyle: {
		...(defaultScreenOptions['headerTitleStyle'] as TextStyle),
		fontSize: 44,
	},
	headerLeftContainerStyle: {
		justifyContent: 'flex-start',
	},
	headerRightContainerStyle: {
		justifyContent: 'flex-start',
	},
	headerBackTitleStyle: {
		...defaultTextStyle,
		fontFamily: CONST.FONT_FAMILY.INTER_MEDIUM,
		fontSize: 18,
		letterSpacing: 0,
	},
	cardStyleInterpolator: forSlideInFadeOut,
	headerStyleInterpolator: forListHeader,
}

const tabsRootScreenOptions: RootStackNavigationOptions = ({ route, navigation }) => {
	const tabTitle = getTabHeaderTitle(route)

	return {
		...authScreenOptions,
		headerShown: !!tabTitle,
		title: tabTitle,
		headerTransparent: true,
	}
}

const workoutsRootOptions: RootStackNavigationOptions = (props) => ({
	...authScreenOptions,
})

const authStackScreenOptions = {
	[NAVIGATORS.TABS_NAVIGATOR]: tabsRootScreenOptions,
	[NAVIGATORS.WORKOUTS_NAVIGATOR]: workoutsRootOptions,
} as {
	[K in keyof RootStackParamList]: RootStackNavigationOptions<K>
}

export default authStackScreenOptions

export { tabsRootScreenOptions }
