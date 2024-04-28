import React, { ForwardedRef } from 'react'
import { Text, TextProps } from 'react-native'
import { styled } from 'nativewind'

const StyledText = styled(Text, `h3 text-tint-title-light dark:text-tint-title-dark`)

function Heading({ children, ...props }: TextProps, ref: ForwardedRef<Text>) {
	return (
		<StyledText
			allowFontScaling={false}
			ref={ref}
			{...props}
		>
			{children}
		</StyledText>
	)
}

Heading.displayName = 'Heading'

export default React.forwardRef(Heading)
