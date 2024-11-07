import { Icons, Fonts } from 'assets'
import { version } from '../package.json'
import CONST from './CONST'

const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT ?? CONST.ENVIRONMENT.DEV
const wrktURL = process.env.EXPO_PUBLIC_WRKT_URL ?? 'http://192.168.50.242:8000/'

const CONFIG = {
	APP_NAME: 'WrktApp',

	ASSETS: {
		ICONS: Icons,
		FONTS: Fonts,
	},

	ENVIRONMENT,

	IS_IN_PRODUCTION: !__DEV__,
	IS_USING_LOCAL_HOST: ENVIRONMENT === CONST.ENVIRONMENT.DEV,

	MAX_WORKOUTS: 3,
	MAX_PROGRAMS: 3,

	TOKEN_LIFETIMES: {
		ACCESS: 5 * 60, // 5 mins,
		REFRESH: 14 * 60 * 60 * 24, // 14 days
	},

	BASE_URL: wrktURL,

	VERSION: version,
} as const

export default CONFIG
