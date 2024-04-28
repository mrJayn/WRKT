import * as ExpoSecureStore from 'expo-secure-store'

async function save(key, value) {
	await ExpoSecureStore.setItemAsync(key, value)
}

async function get(key) {
	const value = await ExpoSecureStore.getItemAsync(key)
	return value
}

async function destroy(key) {
	await ExpoSecureStore.deleteItemAsync(key)
}
// This resolves true on Android and iOS only.
async function isCompatible(key, value) {
	return await ExpoSecureStore.isAvailableAsync(key, value)
}

const {
	AFTER_FIRST_UNLOCK,
	AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
	ALWAYS, // LEAST SECURE
	ALWAYS_THIS_DEVICE_ONLY,
	WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
	WHEN_UNLOCKED,
	WHEN_UNLOCKED_THIS_DEVICE_ONLY,
} = ExpoSecureStore

export default { save, get, destroy, isCompatible }
