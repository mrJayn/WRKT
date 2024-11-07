import React from 'react'
import { Asset as ExpoAsset } from 'expo-asset'

/**
 * Method to obtain the local uri of a given asset module.
 */
const getUriSourceFromModule = async (module: any): Promise<string> => {
	const [{ localUri }] = await ExpoAsset.loadAsync(module)

	if (!localUri) {
		throw new Error(`An error occurred while loading the asset from the path "${module}".`)
	}

	return localUri
}

export { getUriSourceFromModule }
