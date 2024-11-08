import 'react-native-url-polyfill/auto'

/**
 * Add / to the end of any URL if not present
 */
function addTrailingForwardSlash(url: string): string {
	if (!url.endsWith('/')) {
		return `${url}/`
	}
	return url
}

export { addTrailingForwardSlash }
