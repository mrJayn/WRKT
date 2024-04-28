import { StyleSheet } from 'react-native'
import { LinearGradient, type LinearGradientProps } from 'expo-linear-gradient'
import { useColorScheme } from 'nativewind'
import linearGradients, { GradientColorsKey } from '@styles/linearGradients'

interface LinearGradientViewProps extends Partial<LinearGradientProps> {
	name?: GradientColorsKey
}

function LinearGradientBackground({ name, colors, ...props }: LinearGradientViewProps) {
	const { colorScheme } = useColorScheme()

	return (
		<LinearGradient
			colors={colors || linearGradients[name || 'primary'][colorScheme || 'dark']}
			style={[StyleSheet.absoluteFill]}
			{...props}
		/>
	)
}

export default LinearGradientBackground
