import { Text } from 'react-native'
import { styled } from 'nativewind'

const StyledText = styled(Text, 'font-raleway text-base text-tint-light dark:text-tint-dark')

export default function P({ children, ...props }) {
	return <StyledText {...props}>{children}</StyledText>
}
