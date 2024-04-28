import PropTypes from 'prop-types'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'
import { colors } from '@colors'

const propTypes = {
	name: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
}

function Icon({ name, size, color }) {
	const { colorScheme } = useColorScheme()

	return (
		<Ionicons
			name={name || 'help'}
			size={size || 24}
			color={color || colors.tint.primary[colorScheme || 'dark']}
			suppressHighlighting={true}
		/>
	)
}

Icon.displayName = 'Icon'
Icon.propTypes = propTypes

export default Icon
