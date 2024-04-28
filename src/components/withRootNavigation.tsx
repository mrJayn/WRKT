import React, { ComponentType, ForwardedRef, RefAttributes } from 'react'
import { NavigationProp } from '@react-navigation/native'
import type { RootStackParamList } from '@navigation/types'
import getComponentDisplayName from '@libs/getComponentDisplayName'
import useRootNavigation from '@hooks/useRootNavigation'

export type WithRootNavigationProps = {
	navigation: NavigationProp<RootStackParamList>
}

export default function withRootNavigation<TProps extends WithRootNavigationProps, TRef>(
	WrappedComponent: ComponentType<TProps & RefAttributes<TRef>>
) {
	function WithNavigation(props: Omit<TProps, keyof WithRootNavigationProps>, ref: ForwardedRef<TRef>) {
		const navigation = useRootNavigation()

		return (
			<WrappedComponent
				{...(props as TProps)}
				ref={ref}
				navigation={navigation}
			/>
		)
	}

	WithNavigation.displayName = `withRootNavigation(${getComponentDisplayName(WrappedComponent)})`

	return React.forwardRef(WithNavigation)
}
