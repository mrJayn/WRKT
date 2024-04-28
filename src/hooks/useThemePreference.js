import { useEffect, useState } from 'react'
import { Appearance } from 'react-native'
import { useColorScheme } from 'nativewind'
import CONST from '@src/CONST'

function useThemePreference() {
	const [themePreference, setThemePreference] = useState(CONST.THEME.DEFAULT)
	const [systemTheme, setSystemTheme] = useState()
	const storedTheme = undefined // useContext(PreferredThemeContext);

	const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()
	const navigationTheme = useMemo(
		() => ({
			dark: colorScheme === 'dark',
			colors: {
				primary: 'transparent',
				background: 'transparent',
				notification: 'transparent',
				...themeColors[colorScheme || 'dark'],
			},
		}),
		[colorScheme]
	)

	useEffect(() => {
		const systemThemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
			setSystemTheme(colorScheme)
		})
		return () => systemThemeSubscription.remove()
	}, [])

	useEffect(() => {
		var theme = storedTheme ?? CONST.THEME.DEFAULT
		if (theme === CONST.THEME.SYSTEM) {
			theme = systemTheme ?? CONST.THEME.DEFAULT
		}
		setThemePreference(theme)
	}, [storedTheme, systemTheme])

	return themePreference
}

export default useThemePreference
