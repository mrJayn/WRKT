import React from 'react'
import type { TextProps } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { colors } from '@colors'

type IconType = typeof Ionicons | typeof MaterialCommunityIcons

type IonIconName = keyof typeof Ionicons.glyphMap

type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap

type IconName = IonIconName | MaterialCommunityIconName

interface IconProps extends Omit<TextProps, 'suppressHighlighting'> {
	name: IconName
	size?: number
	color?: string
}

const isGlyphOf = (name: IconName, IconType: IconType) => Object.keys(IconType.glyphMap).includes(name)

function Icon({ name, size = 24, color, ...props }: IconProps) {
	const { colorScheme } = useColorScheme()

	const iconsProps = {
		size,
		color: color || colors.tint.primary[colorScheme || 'dark'],
		suppressHighlighting: true,
		...props,
	}

	if (isGlyphOf(name, Ionicons)) {
		return (
			<Ionicons
				name={name as IonIconName}
				{...iconsProps}
			/>
		)
	}

	return (
		<MaterialCommunityIcons
			name={name as MaterialCommunityIconName}
			{...iconsProps}
		/>
	)
}

Icon.displayName = 'Icon'

export default Icon

export type { IconName }
