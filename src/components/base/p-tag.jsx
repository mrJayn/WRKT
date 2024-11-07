import { Text } from 'react-native'
import { styled } from 'nativewind'

const StyledText = styled(Text, 'font-inter-regular text-base text-tint-light dark:text-tint-dark')

export default function P({ children, ...props }) {
	return <StyledText {...props}>{children}</StyledText>
}
