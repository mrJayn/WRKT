import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChildrenProps } from '@src/types/utils'

function SafeArea({ children }: ChildrenProps) {
	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['left', 'right']}
		>
			{children}
		</SafeAreaView>
	)
}

SafeArea.displayName = 'SafeArea'

export default SafeArea
