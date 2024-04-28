import { colors } from '@colors'
import SCREENS from '@src/SCREENS'
import { forDetailHeader, forListHeader } from '@navigation/headerStyleInterpolators'
import type { WorkoutsStackParamList } from '@navigation/types'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import { forSlideInFadeOut } from '@navigation/cardStyleInterpolators'
import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack'

type WorkoutsStackScreen = keyof WorkoutsStackParamList

type WorkoutsStackNavigationOptions =
	| StackNavigationOptions
	| ((props: StackScreenProps<WorkoutsStackParamList, WorkoutsStackScreen>) => StackNavigationOptions)
	| undefined

export const editorStackNavigationScreenOptions: WorkoutsStackNavigationOptions = {
	headerShown: false,
	headerTransparent: true,
	headerTintColor: colors.blue.neon,
	//
	headerTitleAlign: 'center',
	headerTitleStyle: {
		fontFamily: 'Inter-Medium',
		fontSize: 21,
		letterSpacing: 0,
		color: colors.tint.title.dark,
	},
	//
	headerBackTitleVisible: true,
	headerBackTitleStyle: {
		fontFamily: 'Inter-Medium',
		fontSize: 18,
		letterSpacing: 0,
	},
	cardStyleInterpolator: forSlideInFadeOut,
}

export const listScreenOptions: WorkoutsStackNavigationOptions = ({ navigation }) => ({
	headerLeft: () => (
		<CustomHeaderBackButton
			label='Workouts'
			onPress={navigation.goBack}
		/>
	),
	headerStyleInterpolator: forListHeader,
})

export const listDetailScreenOptions: WorkoutsStackNavigationOptions = {
	headerStyleInterpolator: forDetailHeader,
}

const editorScreenOptions = {
	listScreen: listScreenOptions,
	listDetailScreen: listDetailScreenOptions,
}

export default editorScreenOptions as Record<keyof typeof editorScreenOptions, WorkoutsStackNavigationOptions>
