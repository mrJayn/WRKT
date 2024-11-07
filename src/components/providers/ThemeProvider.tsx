import React, { useEffect, useMemo } from 'react'
import { useColorScheme as useNWColorScheme } from 'nativewind'
import themes from '@styles/theme'
import ThemeContext from '@styles/theme/context/ThemeContext'
import useThemePreference from '@hooks/useThemePreference'

type ThemeProviderProps = {
	children: React.ReactNode
}

function ThemeProvider({ children }: ThemeProviderProps) {
	const preferredTheme = useThemePreference()
	const { colorScheme, setColorScheme } = useNWColorScheme()

	/**
	 * Update the current color scheme if a change is detected.
	 */
	useEffect(() => {
		if (colorScheme === preferredTheme) {
			return
		}
		setColorScheme(preferredTheme)
	}, [preferredTheme, colorScheme])

	const theme = useMemo(() => themes[colorScheme], [colorScheme])

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'

export default ThemeProvider
