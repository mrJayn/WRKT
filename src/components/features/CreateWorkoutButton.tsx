import * as React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { colors } from '@colors'
import { useCreateWorkoutMutation } from '@features/Workouts/workoutsAPI'
import DefaultButton from '@components/DefaultButton'
import FadeView from '@components/FadeView'

function CreateWorkoutButton() {
	const [createWorkout, { isLoading, isError, error }] = useCreateWorkoutMutation()

	React.useEffect(() => {
		if (isError) {
			console.log('[ CreateWorkoutButton ] Error:', error)
		}
	}, [error, isError])

	return (
		<View className='flex-1'>
			<DefaultButton
				disabled={isLoading}
				icon='add-circle-outline'
				iconSize={55}
				iconColor={colors.darkgreen[10]}
				onPress={() => {
					createWorkout()
				}}
			/>

			{isLoading && (
				<FadeView className='absoluteFill centered scale-[1.35]'>
					<ActivityIndicator color={colors.tint.success} />
				</FadeView>
			)}
		</View>
	)
}

CreateWorkoutButton.displayName = 'CreateWorkoutButton'

export default CreateWorkoutButton

/*

function CreateWorkoutButton() {
	const [create, { isLoading }] = useCreateWorkoutMutation()
	const opacitySV = useSharedValue(0)

	const animatedOpacity = useAnimatedStyle(() => ({
		opacity: opacitySV.value,
	}))

	//  Disable and dim the button when the action is loading.
	React.useEffect(() => {
		opacitySV.value = withTiming(isLoading ? 0.25 : 1)
	}, [isLoading])

	return (
		<View className=' flex-1'>
			<Animated.View style={[animatedOpacity]}>
				<DefaultButton
                    // disabled={!isLoading}
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
		</View>
	)
}
*/
