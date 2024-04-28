import { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Controller, useForm, useFormContext } from 'react-hook-form'
import Animated, {
	FadeIn,
	FadeOut,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'

import { colors } from '@colors'
import { Button } from '@components/base'

export default function DynamicTextInput({ name, editing, textStyle = '' }) {
	const { control, formState, setValue } = useFormContext()

	const errors = formState.errors ? formState.errors[name] : null

	const progress = useSharedValue(0)
	const AnimatedColorStyles = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(progress.value, [0, 1], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)']),
		borderColor: interpolateColor(progress.value, [0, 1], ['rgba(20,20,20,0)', 'rgba(20,20,20,1)']),
	}))

	useEffect(() => {
		progress.value = withTiming(editing ? 1 : 0)
	}, [editing])

	return (
		<Animated.View
			className={`justify-center mb-6 p-3 border-[1px] rounded z-2 ${errors ? 'border-tint-error' : ''} `}
			style={[AnimatedColorStyles, errors ? { borderColor: colors.tint.error } : {}]}
		>
			<Controller
				control={control}
				name={name}
				rules={{ required: true }}
				render={({ field: { value, onChange } }) => (
					<TextInput
						value={value}
						onChangeText={onChange}
						className={`font-raleway text-grey-20 ${textStyle}`}
						editable={editing}
					/>
				)}
			/>
			{editing && <ClearTextButton onPress={() => setValue('name', '')} />}
		</Animated.View>
	)
}

const ClearTextButton = ({ onPress }) => (
	<Animated.View
		className='absolute right-0 h-9 w-9'
		entering={FadeIn}
		exiting={FadeOut}
	>
		<Button
			icon='close-circle'
			iconColor={colors.grey[80]}
			onPress={onPress}
		/>
	</Animated.View>
)
