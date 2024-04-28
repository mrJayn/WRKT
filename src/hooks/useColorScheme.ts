/**
 *
 * source: https://github.com/Expensify/App/blob/main/src/hooks/useThemePreference.ts
 *
 */
import { useMemo } from 'react'
import { useColorScheme } from 'react-native'
import CONST from '@src/CONST'
import { colors } from '@colors'
import { ValueOf } from '@src/types/utils'

type PreferredThemeName = ValueOf<typeof CONST.THEME>

function usePreferredTheme() {
	const systemTheme = useColorScheme() || CONST.THEME.FALLBACK
	const preferredTheme = undefined // useContext(PreferredThemeContext);

	const themePreference = useMemo(() => {
		const theme = (preferredTheme ?? CONST.THEME.DEFAULT) as PreferredThemeName

		return theme === CONST.THEME.SYSTEM ? systemTheme ?? CONST.THEME.FALLBACK : theme
	}, [preferredTheme, systemTheme])

	return themePreference
}

export default usePreferredTheme

export type { PreferredThemeName }
