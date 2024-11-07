import { getStateFromPath } from '@react-navigation/native'
import config from './config'

type GetCustomStateFromPath = (
	...args: Parameters<typeof getStateFromPath>
) => NonNullable<ReturnType<typeof getStateFromPath>>

/**
 * Removes the optional param strings from the path.
 */
function removeOptionParamsFromPath(path: string) {
	return path.replace(/(:\w+\?($|\s))/g, '')
}

const customGetStateFromPath: GetCustomStateFromPath = (path, options) => {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	const pathWithoutOptionalParams = removeOptionParamsFromPath(normalizedPath)

	const state = getStateFromPath(pathWithoutOptionalParams, config)

	if (!state) {
		throw new Error('Failed to parse the path to a navigation state.')
	}

	return state
}

export default customGetStateFromPath
