import type { ReactNode } from 'react'
import { Text as RNText, type TextProps } from 'react-native'
import { styled } from 'nativewind'

const StyledText = styled(RNText, `font-inter-regular text-base text-tint-primary-light dark:text-tint-primary-dark`)

type PProps = TextProps &
	(
		| {
				children?: ReactNode | undefined
				text?: undefined
		  }
		| {
				children?: undefined
				text: ReactNode
		  }
	)

function P({ allowFontScaling = false, suppressHighlighting = true, children, text, ...props }: PProps) {
	return (
		<StyledText
			allowFontScaling={allowFontScaling}
			suppressHighlighting={suppressHighlighting}
			{...props}
		>
			{children ?? text ?? undefined}
		</StyledText>
	)
}

P.displayName = 'Text'

export default P
export type { PProps }
