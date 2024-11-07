import { isBoolean, isString } from 'lodash'
import * as ExpoSecureStore from 'expo-secure-store'
import type { SecureStoreOptions, KeychainAccessibilityConstant } from 'expo-secure-store'

let isSecureStoreAvailable: boolean | undefined = undefined

async function save(key: string, rawValue: any, options: SecureStoreOptions = {}) {
	let value = isString(rawValue) ? rawValue : JSON.stringify(rawValue)
	await ExpoSecureStore.setItemAsync(key, value, options).catch(() => {
		//value cannot be stored on the device.
	})
}

async function get(key: string, options: SecureStoreOptions = {}) {
	return await ExpoSecureStore.getItemAsync(key, options).catch(() => {
		// No entry exists for the given key or this key has been invalidated.
		return null
	})
}

async function destroy(key: string) {
	try {
		await ExpoSecureStore.deleteItemAsync(key)
	} catch (e) {
		// The value for the given key could not be deleted.
	}
}

async function checkDeviceCompatibility() {
	if (isBoolean(isSecureStoreAvailable)) {
		return isSecureStoreAvailable
	}
	let isAvailable = await ExpoSecureStore.isAvailableAsync()
	isSecureStoreAvailable = isAvailable
	return isAvailable
}

function checkBiometricAuthAvailability() {
	return ExpoSecureStore.canUseBiometricAuthentication()
}

export { save, get, destroy }
