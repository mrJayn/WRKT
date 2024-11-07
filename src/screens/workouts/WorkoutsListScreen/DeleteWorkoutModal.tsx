import { useDeleteWorkoutMutation } from '@features/Workouts/workoutsAPI'
import BaseModal from '@screens/BaseModal'
import { Workout } from '@src/types/features'

type DeleteWorkoutModalProps = {
	workout: Workout
}

function DeleteWorkoutModal({ workout }: DeleteWorkoutModalProps) {
	const [deleteWorkout, { isLoading }] = useDeleteWorkoutMutation()

	const removeWorkout = () => {
		deleteWorkout({ id: workout.id })
	}

	return (
		<BaseModal
			title={`Delete ${workout.name || 'workout'}?`}
			subtitle="Are you sure you'd like to delete this workout?"
			onPress={removeWorkout}
		/>
	)
}

export default DeleteWorkoutModal
