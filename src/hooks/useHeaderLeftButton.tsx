import _ from 'lodash'
import React, { useLayoutEffect } from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { colors } from '@colors'
import type { RootStackParamList } from '@navigation/types'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import Navigation from '@navigation/Navigation'

const previousRouteName = () => {
	let prev = Navigation.getPrevRouteName()
	return prev && prev.replace('Navigator', '')
}

export default function useHeaderLeftButton({
	state,
	...props
}: {
	state: boolean
	label: string
	tintColor: string
	onPress: () => void
	backLabel?: string
	backTintColor?: string
	onGoBack?: () => void
	backImageVisible?: boolean
	useBackButton?: boolean
}) {
	let navigation = useNavigation<NavigationProp<RootStackParamList>>()
	let current: NavigationProp<RootStackParamList> | undefined

	while ((current = navigation.getParent())) {
		navigation = current
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				if (state === false && props.useBackButton === false) {
					return null
				}

				const { label, tintColor, onPress } = state
					? {
							label: props.label,
							tintColor: props.tintColor || colors.tint.warning,
							onPress: props.onPress,
					  }
					: {
							label: props.backLabel || previousRouteName() || 'Back',
							tintColor: props.backTintColor || colors.blue.neon,
							onPress: props.onGoBack || Navigation.goBack,
					  }

				return (
					<CustomHeaderBackButton
						label={label}
						tintColor={tintColor}
						onPress={onPress}
						backImageVisible={props.backImageVisible}
					/>
				)
			},
		})
	}, [navigation])
}

// label={state ? backLabel || 'Back' : label}
// tintColor={state ? backTintColor : tintColor}
// onPress={state ? navigation.goBack : onPress}
