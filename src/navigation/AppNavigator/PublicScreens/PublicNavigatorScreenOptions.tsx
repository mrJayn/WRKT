// import type { TransitionPreset, TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types'
// import SCREENS from '@src/SCREENS'
// import type { PublicStackScreenName, RootStackNavigationOptions } from '@navigation/types'
// import { forSlideLeft, forSlideUp } from '../../cardStyleInterpolators'
// import { View } from 'react-native'
// import Icon from '@components/Icon'
// import P from '@components/P'
// import CONST from '@src/CONST'
// import { forPopHeader } from '@navigation/headerStyleInterpolators'
// import { colors } from '@colors'
// import { backImageStyle } from '@components/HeaderBackButton'
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

// const transitionSpec: TransitionSpec = {
// 	animation: 'spring',
// 	config: CONST.ANIMATION.SMOOTH_SPRING,
// }

// const publicStackNavigationOptions = {
// 	[SCREENS.GETTING_STARTED]: { headerShown: false },
// 	[SCREENS.REGISTER.ROOT]: {
// 		headerShown: false,
// 		cardStyleInterpolator: forSlideLeft,
// 	},
// 	[SCREENS.LOGIN]: {
// 		gestureDirection: 'vertical',
// 		cardStyleInterpolator: forSlideUp,
// 		headerShown: false,
// 		headerStyle: { height: 75 },
// 		headerTitleContainerStyle: { display: 'none' },
// 		headerRightContainerStyle: { display: 'none' },
// 		headerBackTitleVisible: false,
// 		headerBackImage: () => (
// 			<View className='h-12 w-full centered'>
// 				<Icon
// 					name='chevron-up'
// 					size={32}
// 				/>
// 				<P className='absolute bottom-0 text-xs uppercase tracking-1'>Back</P>
// 			</View>
// 		),
// 	},
// 	[SCREENS.FORGOT_PASSWORD]: {
// 		title: 'Reset Password',
// 	},
// } as Record<PublicStackScreenName, RootStackNavigationOptions<PublicStackScreenName>>

// export default publicStackNavigationOptions
