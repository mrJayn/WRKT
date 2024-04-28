import React, { ForwardedRef } from 'react'
import { View } from 'react-native'
import { SafeAreaView, NativeSafeAreaViewProps } from 'react-native-safe-area-context'

export type ScreenWrapperProps = NativeSafeAreaViewProps

function ScreenWrapper(
	{ mode = 'padding', edges = ['top', 'bottom'], style, className, children, ...props }: ScreenWrapperProps,
	ref: ForwardedRef<View>
) {
	return (
		<SafeAreaView
			style={{ flex: 1 }}
			mode={mode}
			edges={edges}
		>
			<View
				style={[{ flex: 1, paddingHorizontal: 20 }, style]}
				className={className}
				{...props}
				ref={ref}
			>
				{children}
			</View>
		</SafeAreaView>
	)
}

ScreenWrapper.displayName = 'ScreenWrapper'

export default React.forwardRef(ScreenWrapper)
