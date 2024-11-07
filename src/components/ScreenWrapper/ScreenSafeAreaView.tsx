import React from 'react'
import { View } from 'react-native'
import { SafeAreaView, type NativeSafeAreaViewProps } from 'react-native-safe-area-context'

function ScreenSafeAreaView(
	{ mode = 'padding', edges = ['top', 'bottom'], style, children, ...props }: NativeSafeAreaViewProps,
	ref: React.ForwardedRef<View>
) {
	return (
		<SafeAreaView
			{...props}
			style={[{ flex: 1, paddingHorizontal: 20 }, style]}
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
