import type { ViewProps } from 'react-native'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import type { Theme } from '@styles/theme/types'
import useTheme from '@hooks/useTheme'

type LinearGradientViewProps = ViewProps & {
	name: keyof Theme['linearGradients']
}

function LinearGradientView({ name, style, ...rest }: LinearGradientViewProps) {
	const { linearGradients } = useTheme()

	return (
		<LinearGradient
			colors={linearGradients[name]}
			locations={undefined}
			start={undefined}
			end={undefined}
			dither={true}
			style={[StyleSheet.absoluteFill, style]}
			{...rest}
		/>
	)
}

LinearGradientView.displayName = 'LinearGradientView'

export default LinearGradientView
