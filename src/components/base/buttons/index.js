import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styled } from 'nativewind'
import P from '../p-tag'

import { colors } from '@colors'
import FadeView from '@components/FadeView'
import { Button } from './buttons'
export { Button }
export { default as Switch } from './switch'

const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledText = styled(Text)

export const TextButton = ({ text, textStyle = '', ...props }) => {
	return (
		<TouchableOpacity {...props}>
			<P className={textStyle}>{text}</P>
		</TouchableOpacity>
	)
}

export const BlockButton = ({ text, textStyle, ...props }) => {
	return (
		<View className='rounded-md bg-white dark:bg-black'>
			<StyledTouchableOpacity
				tw='centered h-10 min-w-full rounded-md bg-darkgreen-neon'
				activeOpacity={0.65}
				//  style={{}}   containerStyle={{}}
				{...props}
			>
				<View>
					<StyledText
						tw='font-inter-bold text-xl tracking-1'
						className={textStyle ?? ''}
					>
						{text}
					</StyledText>
				</View>
			</StyledTouchableOpacity>
		</View>
	)
}

export const DynamicEditButton = ({ editing, setEditing, updating }) => (
	<View className='absolute top-0 right-0 justify-center'>
		{updating && (
			<FadeView className='absolute -left-4'>
				<ActivityIndicator color={colors.blue[20]} />
			</FadeView>
		)}
		<Button
			text={editing ? 'Done' : 'Edit'}
			textStyle='text-lg leading-lg text-tint-warning'
			className='p-3'
			onPress={() => setEditing(!editing)}
		/>
	</View>
)
