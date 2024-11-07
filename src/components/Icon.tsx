import React from 'react'
import type { TextProps } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import useTheme from '@hooks/useTheme'

type IconSet = typeof Ionicons | typeof MaterialCommunityIcons

type IonIconName = keyof typeof Ionicons.glyphMap
type MaterialCommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap
type IconName = IonIconName | MaterialCommunityIconName

interface IconProps extends TextProps {
	name: IconName
	size?: number
	color?: string
}

/** Check if a name is a glyph for the given icon set. */
const isGlyphOf = (name: IconName, iconSet: IconSet) => Object.keys(iconSet.glyphMap).includes(name)

function Icon({ name, size = 24, color, ...props }: IconProps) {
	const themeColors = useTheme()

	if (!color) {
		color = themeColors.tint.primary
	}

	const iconsProps: Omit<IconProps, 'name'> = {
		size,
		color: color || themeColors.tint.primary,
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

	if (isGlyphOf(name, MaterialCommunityIcons)) {
		return (
			<MaterialCommunityIcons
				name={name as MaterialCommunityIconName}
				{...iconsProps}
			/>
		)
	}

	return (
		<Ionicons
			name={undefined}
			{...iconsProps}
		/>
	)
}

Icon.displayName = 'Icon'

export default Icon
export type { IconName }
