import Animated, {
	FadeInRight,
	FadeOutRight,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'
import { colors } from '@colors'
import DefaultButton from '../../components/DefaultButton'
import { useCreateWorkoutMutation } from './workoutsAPI'
import FadeView from '@components/FadeView'
import { ActivityIndicator } from 'react-native'
import { useEffect } from 'react'

function CreateWorkoutButton() {
	const [create, { isLoading }] = useCreateWorkoutMutation()
	const visibilty = useSharedValue(0)

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: visibilty.value,
	}))

	useEffect(() => {
		visibilty.value = withTiming(isLoading ? 0.25 : 1)
	}, [isLoading])

	return (
		<Animated.View
			className='absolute right-5 bottom-5'
			entering={FadeInRight}
			exiting={FadeOutRight}
		>
			<Animated.View style={[animatedOpacity]}>
				<DefaultButton
					icon='add'
					iconSize={48}
					iconColor={colors.tint.success}
					containerStyle={{ padding: 5 }}
					onPress={() => create()}
				/>
			</Animated.View>
			{isLoading && (
				<FadeView className='absoluteFill centered scale-[1.35]'>
					<ActivityIndicator color={colors.tint.success} />
				</FadeView>
			)}
		</Animated.View>
	)
}

export default CreateWorkoutButton
