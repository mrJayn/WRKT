import React, { ForwardedRef } from 'react'
import { View, ViewStyle } from 'react-native'
import { NativeSafeAreaViewProps, SafeAreaView } from 'react-native-safe-area-context'

function ScreenSafeAreaView(
	{ mode = 'padding', edges = ['top', 'bottom'], style, children, ...props }: NativeSafeAreaViewProps,
	ref: ForwardedRef<View>
) {
	const componentStyle: ViewStyle = {
		flex: 1,
		paddingHorizontal: 20,
	}

	return (
		<SafeAreaView
			{...props}
			style={[componentStyle, style]}
			mode={mode}
			edges={edges}
			ref={ref}
		>
			{children}
		</SafeAreaView>
	)
}

ScreenSafeAreaView.displayName = 'ScreenSafeAreaView'
export default React.forwardRef(ScreenSafeAreaView)
