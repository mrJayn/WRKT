import CONST from '@src/CONST'
import getEnvironment from './getEnvironment'

/**
 * Are we running the app in development?
 */
function isDevelopment(): boolean {
	return (process.env.EXPO_PUBLIC_ENVIRONMENT ?? CONST.ENVIRONMENT.DEV) === CONST.ENVIRONMENT.DEV
}

/**
 * Are we running the app in production?
 */
async function isProduction(): Promise<boolean> {
	return getEnvironment().then((environment) => environment === CONST.ENVIRONMENT.PRODUCTION)
}

export { getEnvironment, isDevelopment, isProduction }
