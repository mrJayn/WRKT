import { TouchableOpacity, TextInput, View } from 'react-native'
import Animated, { SlideInRight, FadeOutRight } from 'react-native-reanimated'
//
import { theme } from 'tailwind.config'
import DefaultButton from '@components/DefaultButton'

import FadeView from '@components/FadeView'
// import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from '@features/Workouts/workoutsApi'
import { Controller, useForm } from 'react-hook-form'
import { Program } from '@src/types/features'
import { useDeleteProgramMutation, useUpdateProgramMutation } from '@features/Programs/programsApi'

interface ProgramDetailViewProps {
	item: Program
	onPress: () => void
	editing: boolean
	shouldUpdate: boolean
}

function ProgramDetailView({ item, onPress, editing, shouldUpdate }: ProgramDetailViewProps) {
	const program = {
		name: item.name,
		startdate: item.startdate,
		duration: item.duration,
		active: item.isActive,
		order: item.order,
	} as const

	const { control, reset } = useForm({ defaultValues: program })

	// const [nameVal, setNameVal] = useState(item.name)
	const [updateProgram, { isLoading: isUpdating }] = useUpdateProgramMutation()
	const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation()

	const handleEditsMade = async (name: string) => {
		if (!editing && name !== program.name) {
			if (!shouldUpdate) {
				return reset()
			}
			// Update the `name` field for the program.
			updateProgram({
				id: item.id,
				name: name,
			})
		}
	}

	const activateProgram = () => null
	const removeProgram = () => null

	return (
		<View className='flex-row centered'>
			<DefaultButton
				icon={`star${item.isActive ? '' : '-outline'}`}
				iconSize={24}
				{...(item.isActive && { iconColor: theme.colors.tint.success })}
				onPress={activateProgram}
				disabled={isUpdating || isDeleting}
				containerStyle={{
					position: 'absolute',
					left: 0,
					height: 60,
					width: 60,
					justifyContent: 'center',
					alignItems: 'center',
					zIndex: 10,
				}}
			/>
			<TouchableOpacity
				className='h-12 flex-1 flex-row centered px-14 bg-tertiary-light dark:bg-tertiary-dark'
				activeOpacity={0.6}
				onPress={onPress}
				disabled={editing}
			>
				<Controller
					control={control}
					name='name'
					rules={{ required: false }}
					render={({ field }) => (
						<TextInput
							value={field.value}
							onChangeText={field.onChange}
							className='h6 flex-1 text-grey-20'
							style={{ pointerEvents: editing ? 'auto' : 'none' }}
							editable={editing}
						/>
					)}
				/>
				{editing && (
					<>
						<FadeView
							className='absolute h-10 inset-x-12 rounded-md bg-grey-90 -z-1'
							pointerEvents='none'
						/>
						<Animated.View
							className='absolute right-0 h-12 w-12 centered z-1'
							entering={SlideInRight}
							exiting={FadeOutRight}
						>
							<DefaultButton
								icon='trash'
								iconSize={24}
								iconColor={theme.colors.tint.error}
								onPress={removeProgram}
								disabled={isDeleting || isUpdating}
							/>
						</Animated.View>
					</>
				)}
			</TouchableOpacity>
		</View>
	)
}

ProgramDetailView.displayName = 'ProgramDetailView'

export default ProgramDetailView
