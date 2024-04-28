import { ViewProps } from 'react-native'
import Animated, {
	withTiming,
	withDelay,
	Easing,
	type EntryAnimationsValues,
	type AnimateProps,
	LayoutAnimation,
} from 'react-native-reanimated'

type FadeInViewProps = AnimateProps<ViewProps> & {
	i: number
	baseDelay: number
	stagger: number
}

function StaggerFadeView({ i, baseDelay = 1500, stagger = 150, children, ...props }: FadeInViewProps) {
	const delay = baseDelay + stagger * i

	const fadeInDown = (targetValues: EntryAnimationsValues): LayoutAnimation => {
		'worklet'
		const animations = {
			opacity: withDelay(delay, withTiming(1, { duration: 700 })),
			transform: [
				{
					translateY: withDelay(
						delay,
						withTiming(0, {
							duration: 900,
							easing: Easing.out(Easing.circle),
						})
					),
				},
			],
		}
		const initialValues = {
			opacity: 0,
			transform: [{ translateY: -10 }],
		}
		return { initialValues, animations }
	}

	return (
		<Animated.View
			entering={fadeInDown}
			{...props}
		>
			{children}
		</Animated.View>
	)
}

export default StaggerFadeView
