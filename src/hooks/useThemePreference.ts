import { useMemo } from 'react'
import { useColorScheme as useRNColorScheme } from 'react-native'
import CONST from '@src/CONST'
import { useGetProfileQuery } from '@features/Profile/profileAPI'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@features/auth/authSlice'
// import { useSelector } from 'react-redux'
// import { selectPreferredTheme } from '@features/Profile/profileSlice'

/**
 * source:  https://github.com/Expensify/App/blob/main/src/hooks/useThemePreference.ts
 */

export default function useThemePreference() {
	const isAuthenticated = useSelector(selectIsAuthenticated)

	const { themeFromProfile } = useGetProfileQuery(undefined, {
		skip: !isAuthenticated,
		selectFromResult: ({ data }) => ({ themeFromProfile: data?.theme }),
	})
	const systemTheme = useRNColorScheme()

	const themePreference = useMemo(() => {
		if (!themeFromProfile || themeFromProfile === CONST.THEME.SYSTEM) {
			return systemTheme ?? CONST.THEME.DEFAULT
		}
		return themeFromProfile
	}, [themeFromProfile, systemTheme])

	return themePreference
}
