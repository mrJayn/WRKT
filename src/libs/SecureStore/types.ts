import CONST from '@src/CONST'
import type { AuthTokenPair } from '@features/auth/types'
import type { ThemeName } from '@styles/theme/types'

type SecureValuesMap = {
	[CONST.SECURE_KEYS.AUTH_TOKEN_PAIR]: AuthTokenPair
	[CONST.SECURE_KEYS.DEVICE_ID]: string
	[CONST.SECURE_KEYS.THEME]: ThemeName
}

type SecureKey = keyof SecureValuesMap

type SecureValue<K extends SecureKey> = SecureValuesMap[K]

export type { SecureValuesMap, SecureKey, SecureValue }
