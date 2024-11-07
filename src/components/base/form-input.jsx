import { Pressable, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { colors } from '@colors'
import P from './p-tag'
import { forwardRef } from 'react'
import { styled } from 'nativewind'

const StyledTextInput = styled(TextInput)

const Form_Input = forwardRef(function Form_Input(props, ref) {
	const { label, errors, secure, toggleSecure = () => null, containerStyle, ...inputProps } = props
	const withSecure = secure !== undefined

	return (
		<View className={`w-full ${containerStyle ?? ''}`}>
			{label && <LabelText {...{ errors }}>{label}</LabelText>}

			<StyledTextInput
				tw={`w-full py-5 px-3 text-base font-inter-regular text-tint-light dark:text-tint-dark bg-grey-15 dark:bg-grey-95 ${
					errors ? '' : ''
				}`}
				placeholderTextColor='#fff4'
				{...(withSecure && {
					secureTextEntry: secure,
					textContentType: 'oneTimeCode',
				})}
				{...inputProps}
				{...(ref && { ref })}
			/>

			{withSecure && (
				<Pressable
					className='centered absolute top-4 bottom-0 right-0 w-10'
					onPress={toggleSecure}
				>
					<Eye_Icon {...{ secure }} />
				</Pressable>
			)}
			{errors && <P className='centered absolute top-0.5 right-1 text-xs text-tint-error'>{errors.message}</P>}
		</View>
	)
})

const LabelText = ({ errors, children }) => (
	<P
		className={`px-1 mb-px capitalize text-tint-secondary-light dark:text-tint-tertiary-dark ${
			errors ? 'bg-tint-error/10' : ''
		}`}
	>
		{children}
	</P>
)
const Eye_Icon = ({ secure }) => (
	<MaterialCommunityIcons
		name={`eye${secure ? '' : '-off'}-outline`}
		size={24}
		style={{ height: 23 }}
		color={secure ? colors.tint.primary.dark : colors.tint.error}
	/>
)

export default Form_Input
