import CONST from '@src/CONST'
import * as SecureStore from '@libs/SecureStore'
import generateDeviceID from './generateDeviceID'
import getDeviceInfo from './getDeviceInfo'

let deviceID: string | null = null

/**
 * Get the unique device ID from the secure store.
 */
const getDeviceID = async () => {
	if (deviceID) {
		return deviceID
	}

	return SecureStore.get(CONST.SECURE_KEYS.DEVICE_ID).then((storedDeviceID) => {
		deviceID = storedDeviceID
		return storedDeviceID
	})
}

/**
 * Saves the unique device ID in the secure store.
 */
function setDeviceID() {
	getDeviceID()
		.then((existingDeviceID) => {
			if (!existingDeviceID) {
				return Promise.resolve()
			}
			throw new Error(existingDeviceID)
		})
		.then(generateDeviceID)
		.then((uniqueID: string) => {
			// console.log('[Device] New device ID -', uniqueID)
			SecureStore.save(CONST.SECURE_KEYS.DEVICE_ID, uniqueID)
		})
		.catch((e: Error) => {
			// console.log('[Device] Found device ID -', e.message)
		})
}

/**
 * Returns a string object with device info and uniqueID
 */
function getDeviceInfoWithID(): Promise<string> {
	return new Promise((resolve) => {
		getDeviceID().then((currentDeviceID) =>
			resolve(
				JSON.stringify({
					...getDeviceInfo(),
					deviceID: currentDeviceID,
				})
			)
		)
	})
}

export { getDeviceID, setDeviceID, getDeviceInfoWithID }
