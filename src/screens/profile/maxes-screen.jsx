import { useState, useEffect, useContext } from 'react'
import { View } from 'react-native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { DefaultScreen, P } from '@components/base'
import { colors } from '@colors'

export default function MaxesScreen({ navigation }) {
	// const { maxes } = useContext(ProfileContext)
	const [editsMade, setEditsMade] = useState(false)

	const defaultValues = {
		squat: String(maxes.squat ?? ''),
		bench: String(maxes.bench ?? ''),
		deadlift: String(maxes.deadlift ?? ''),
	}

	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful },
	} = useForm({ defaultValues, mode: 'onChange' })

	const [submittedData, setSubmittedData] = useState({})

	const onSubmit = (data) => {
		setSubmittedData(data)
		console.log(data)
	}
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({ ...submittedData })
		}
	}, [isSubmitSuccessful, submittedData, reset])

	// useLayoutEffect(() => {
	// 	if (editsMade)
	// 		navigation.setOptions({
	// 			headerRight: () => (
	// 				<Save-Button
	// 					onPress={() => {
	// 						//API STUFF
	// 						navigation.goBack()
	// 					}}
	// 				/>
	// 			),
	// 		})
	// }, [editsMade])

	const RenderInput = ({ item }) => (
		<View>
			<P className='h5 capitalize ml-1'>{item}</P>
			<InputController
				name={item}
				handleEditsMade={() => {
					if (!editsMade) setEditsMade(true)
				}}
			/>
		</View>
	)

	return (
		<DefaultScreen>
			<FormProvider {...{ control }}>
				<FlatList
					data={['squat', 'bench', 'deadlift']}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<View>
							<P className='h5 capitalize ml-1'>{item}</P>
							<InputController
								name={item}
								handleEditsMade={() => {
									if (!editsMade) setEditsMade(true)
								}}
							/>
						</View>
					)}
					ItemSeparatorComponent={() => <View className='mb-3' />}
					scrollEnabled={false}
					keyboardShouldPersistTaps='handled'
				/>
			</FormProvider>
		</DefaultScreen>
	)
}

const InputController = ({ name, handleEditsMade }) => {
	const { control } = useFormContext()

	return (
		<Controller
			name={name}
			control={control}
			rules={{ required: true }}
			render={({ field: { value } }) => (
				<TextInput
					value={value}
					onChangeText={(e) => {
						field.onChange(e)
						//field.onChange(parseInt(e.target.value))
						handleEditsMade()
					}}
					onBlur={field.onBlur}
					keyboardType='numeric'
					inputMode='numeric'
					maxLength={4}
					placeholder={`${name} 1RM`}
					placeholderTextColor={colors.grey[80]}
					className='py-5 px-3 leading-2xl font-inconsolata text-tint-light dark:text-tint-dark bg-grey-15 dark:bg-grey-95'
					style={{ fontSize: value ? 30 : 24 }}
				/>
			)}
		/>
	)
}
