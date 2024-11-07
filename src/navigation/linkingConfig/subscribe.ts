import { Linking } from 'react-native'
import { isNativePlatformSupported } from 'react-native-screens/lib/typescript/core'
import type { LinkingConfig } from './types'

function handleDeepLink(e: { url: string }) {
	const route = e.url.replace(/.*?:\/\//g, '')
	// use route to navigate
	// ...
}

const subscribe: LinkingConfig['subscribe'] = (listener) => {
	if (!isNativePlatformSupported) {
		// The `subscribe` field in linkingConfig is supported on native only.
		return undefined
	}

	const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
		listener(url)
	})

	return () => {
		linkingSubscription.remove()
	}
}

export default subscribe
