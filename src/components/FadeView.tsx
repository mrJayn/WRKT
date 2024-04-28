import { ViewProps } from 'react-native'
import Animated, { AnimateProps, FadeIn, FadeOut } from 'react-native-reanimated'

function FadeView({ entering = FadeIn, exiting = FadeOut, children, ...props }: AnimateProps<ViewProps>) {
	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			{...props}
		>
			{children}
		</Animated.View>
	)
}

FadeView.displayName = 'FadeView'

export default FadeView
