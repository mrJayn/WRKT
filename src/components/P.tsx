import { Text as RNText, type TextProps } from 'react-native'
import { styled } from 'nativewind'

const StyledText = styled(RNText, `font-inter-regular text-base text-tint-primary-light dark:text-tint-primary-dark`)

function P({ allowFontScaling = false, suppressHighlighting = true, children, ...props }: TextProps) {
	return (
		<StyledText
			allowFontScaling={allowFontScaling}
			suppressHighlighting={suppressHighlighting}
			{...props}
		>
			{children}
		</StyledText>
	)
}

P.displayName = 'Text'

export default P
