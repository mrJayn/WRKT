import { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlatList, GestureDetector, Swipeable, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { styled } from 'nativewind'
import { Button, Form_Input, Icon, P } from '../base'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

import { colors } from '@colors'
//const { name, order, srws, is_superset,  data } = exItem

const appSpecs = {
	stiffness: 1100,
	damping: 500,
	mass: 3,
	overshootClamping: true,
	restDisplacementThreshold: 10,
	restSpeedThreshold: 10,
}

const EditableExercise = ({ selected, setSelected, editing, manager, ...item }) => {
	const { id, name, order, secondary, sets } = item
	const num_sets = (sets ?? 0).length
	const has_secondary = secondary !== null

	const defaultValues = {
		name,
		order,
		s0: sets ? sets[0]?.sets : null,
		r0: sets ? sets[0]?.reps : null,
		w0: sets ? sets[0]?.weight : null,
		s1: sets ? sets[1]?.sets : null,
		r1: sets ? sets[1]?.reps : null,
		w1: sets ? sets[1]?.weight : null,
		s2: sets ? sets[2]?.sets : null,
		r2: sets ? sets[2]?.reps : null,
		w2: sets ? sets[2]?.weight : null,
		ss_name: secondary?.name,
		s_ss: secondary?.sets,
		r_ss: secondary?.reps,
		w_ss: secondary?.weight,
	}

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty, isSubmitSuccessful },
	} = useForm({ defaultValues, mode: 'all' })

	const [submittedData, setSubmittedData] = useState({})
	//const [srwData, setSrwData] = useState(srws)

	const onSubmit = (data) => {
		setSubmittedData(data)
		console.log(data)
		//navigation.goBack()
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({ ...submittedData })
		}
	}, [isSubmitSuccessful, submittedData, reset])

	const addEx = () => manager.add(false)
	const addSet = () => manager.add(false)

	const addSs = () => manager.add(true)
	const deleteExercise = () => manager.delete(exItem.id)

	const progress = useSharedValue(0)
	const shiftOnEditStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: progress.value }],
	}))

	useEffect(() => {
		progress.value = withSpring(editing ? 1 : 0, appSpecs)
	}, [editing])

	return (
		<FormProvider {...{ control }}>
			<Animated.View
				className='w-full centered flex-row'
				style={[shiftOnEditStyle]}
			>
				<AnimatedFillBubble />
				<View className='min-w-full items-center'>
					<InputController
						name='name'
						placeholder='Exercise Name'
						maxLength={50}
						className='py-2 text-2xl bg-grey-95'
					/>
					{sets != null && (
						<FlatList
							data={sets}
							keyExtractor={({ id }) => id}
							ListHeaderComponent={() => <SrwHeaders />}
							renderItem={({ item, index }) => <SrwRow {...{ index, manager, ...item }} />}
							scrollEnabled={false}
							className='px-3 overflow-visible w-full'
						/>
					)}
					<View className='h-9 w-full flex-row my-1 px-3'>
						{num_sets < 3 && (
							<Button
								text='Add Set'
								type='icon'
								icon='add'
								iconColor={colors.tint.success}
								containerStyle='h-full flex-[0.5] mx-1 centered bg-tertiary-light/25 dark:bg-tertiary-dark/25 rounded-lg'
								textStyle='text-grey'
								className='flex-row pr-1'
								onPress={addSet}
							/>
						)}
						{!has_secondary && (
							<Button
								text='Add Superset'
								type='icon'
								icon='add'
								iconColor={colors.blue.neon}
								containerStyle='h-full flex-[0.5] mx-1 centered bg-tertiary-light/25 dark:bg-tertiary-dark/25 rounded-lg'
								textStyle='text-grey'
								className='flex-row pr-1'
								onPress={addSs}
							/>
						)}
					</View>
				</View>
			</Animated.View>
			{has_secondary && (
				<Animated.View
					className='w-full centered flex-row'
					style={[shiftOnEditStyle]}
				>
					<AnimatedFillBubble />
					<View className='min-w-full'>
						<InputController
							name='superset'
							placeholder='Superset'
							maxLength={50}
							className='py-2 text-xl bg-transparent'
						/>
						<View className='px-3 w-full'>
							<SrwHeaders />

							<SrwRow
								index='_ss'
								{...{ manager }}
							/>
						</View>
					</View>
				</Animated.View>
			)}
		</FormProvider>
	)
}

const AnimatedFillBubble = ({}) => {
	const selected = useSharedValue(0)
	const innerStyle = useAnimatedStyle(() => ({ opacity: selected.value }))

	return (
		<TouchableOpacity
			className=' absolute left-[-100px] w-8 h-8 rounded-full border-2 border-blue'
			onPressOut={() => {
				const toValue = selected.value === 0 ? 1 : 0
				selected.value = withSpring(toValue, { stiffness: 500, damping: 200 })
			}}
		>
			<Animated.View
				className='full rounded-full bg-blue-neon'
				style={[innerStyle]}
			/>
		</TouchableOpacity>
	)
}

const SrwRow = ({ index, manager, ...item }) => {
	const srwInputs = [
		{ name: `s${index}`, placeholder: 'sets', maxLength: 10 },
		{ name: `r${index}`, placeholder: 'reps', maxLength: 10 },
		{ name: `w${index}`, placeholder: 'wgt', maxLength: 6 },
	]

	const renderRightActions = () => (
		<Button
			icon='trash'
			iconSize={18}
			onLongPress={() => manager.delete(index)}
			containerStyle='w-14 py-1'
			className='bg-red/20 rounded-none'
		/>
	)

	return (
		<Swipeable
			friction={2}
			renderRightActions={renderRightActions}
			rightThreshold={40}
			dragOffsetFromRightEdge={5}
			overshootRight={false}
			shouldCancelWhenOutside={true}
			containerStyle={{ overflow: 'visible' }}
		>
			<View className='w-full flex-row overflow-hidden rounded-lg'>
				{srwInputs.map((item) => (
					<InputController
						key={item.name}
						containerStyle='flex-1 my-px mx-1'
						className='h-9 text-center'
						{...item}
					/>
				))}
			</View>

			<View className='centered absolute inset-y-0 right-[-15px] rotate-90 scale-x-[2] opacity-25'>
				<Icon
					name='menu'
					size={12}
				/>
			</View>
		</Swipeable>
	)
}

const InputController = ({ name, render, ...inputProps }) => {
	const { control } = useFormContext()
	return (
		<Controller
			{...{ name, control }}
			rules={{ required: true }}
			render={({ field }) => (
				<Form_Input
					value={field.value}
					onChangeText={field.onChange}
					inputMode='text'
					{...(!field.value && { style: { opacity: 0.2 } })}
					{...inputProps}
				/>
			)}
		/>
	)
}

const SrwHeaders = () => (
	<View className='flex-row'>
		<P className='text-xs flex-1 pl-3 text-grey-60 font-inconsolata'>Sets</P>
		<P className='text-xs flex-1 pl-3 text-grey-60 font-inconsolata'>Reps</P>
		<P className='text-xs flex-1 pl-3 text-grey-60 font-inconsolata'>Wgt.</P>
	</View>
)

export default EditableExercise
