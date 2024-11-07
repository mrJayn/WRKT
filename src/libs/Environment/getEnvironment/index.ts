import CONST from '@src/CONST'
import type { Environment } from './types'

function getEnvironment(): Promise<Environment> {
	return Promise.resolve((process.env.EXPO_PUBLIC_ENVIRONMENT as Environment) ?? CONST.ENVIRONMENT.DEV)
}

export default getEnvironment
