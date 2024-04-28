import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import CONST from '@src/CONST'
import Icon from '@components/Icon'
import P from '@components/P'
import TabBarProps from './types'

function TabBar(props: BottomTabBarProps) {
	const { navigation, state, descriptors, insets } = props as TabBarProps

	return (
		<View className='w-full flex-row border-t-2 border-t-white/10 overflow-hidden'>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index

				const handleTabPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					})

					if (isFocused || event.defaultPrevented) {
						return
					}

					navigation.navigate(route.name)
				}

				return (
					<TouchableOpacity
						key={route.key}
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityRole={CONST.ROLE.BUTTON}
						disabled={isFocused}
						className='flex-1 centered pt-2 bg-primary-light dark:bg-primary-dark'
						style={{
							opacity: isFocused ? 1 : 0.4,
							paddingBottom: insets.bottom,
						}}
						onPress={handleTabPress}
					>
						<Icon
							name={CONST.TAB_ICONS[route.name]}
							size={28}
						/>
						<P className='text-xxs'>{route.name.slice(5)}</P>
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export default TabBar
