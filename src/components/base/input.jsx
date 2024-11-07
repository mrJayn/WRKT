import { Pressable, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@colors'
import P from './p-tag'
import { useRef, useState } from 'react'
import { useEffect } from 'react'

export default function Input({
	label = '',
	isFocused = false,
	errors,
	secureStates,
	onFocus = () => null,
	onBlur = () => null,
	...props
}) {
	const ref = useRef()
	const [hasFocus, setFocus] = useState(false)

	useEffect(() => {
		console.log('Input > isFocused =', isFocused)
		if (isFocused && !hasFocus) ref.current.focus()
	}, [isFocused])

	return (
		<View className={`w-full mb-2 ${errors ? '' : ''}`}>
			<P className='ml-px mb-px capitalize text-tint-secondary-light dark:text-tint-tertiary-dark'>{label}</P>
			<TextInput
				className='w-full py-5 px-3 text-base font-inter-regular text-tint-light dark:text-tint-dark bg-grey-15 dark:bg-grey-95'
				placeholderTextColor='#fff8'
				autoCapitalize={'none'}
				onFocus={() => {
					setFocus(true)
					onFocus()
				}}
				onBlur={() => {
					setFocus(false)
					onBlur()
				}}
				ref={ref}
				{...(secureStates && {
					secureTextEntry: !secureStates[0],
					textContentType: 'oneTimeCode',
				})}
				{...props}
			/>

			{secureStates && <SecurityRevealBtn {...{ secureStates }} />}
		</View>
	)
}

const SecurityRevealBtn = ({ secureStates }) => {
	const [secure, setSecure] = secureStates

	return (
		<Pressable
			className='centered absolute top-4 bottom-0 right-0 w-10'
			onPress={() => setSecure(!secure)}
		>
			<MaterialCommunityIcons
				name={secure ? 'eye-off-outline' : 'eye'}
				color={colors[secure ? 'red' : 'light']}
				size={24}
				style={{ height: 23 }}
			/>
		</Pressable>
	)
}
