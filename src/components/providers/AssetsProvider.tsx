import React, { createContext, useEffect, useState } from 'react'
import { Asset as ExpoAsset } from 'expo-asset'
import * as ExpoFont from 'expo-font'
import CONFIG from '@src/CONFIG'

/** Method to obtain the local uri of a given asset module. */
const getUriSourceFromModule = async (module: any): Promise<string> => {
	const [{ localUri }] = await ExpoAsset.loadAsync(module)
	if (!localUri) {
		throw new Error(`An error occurred while loading the asset from the path "${module}".`)
	}
	return localUri
}

type AssetsContextType = Record<keyof typeof CONFIG.ASSETS.ICONS, { uri: string }>

const AssetsContext = createContext<AssetsContextType | null>(null)

type AssetsProviderProps = {
	children: React.ReactNode
}

function AssetsProvider({ children }: AssetsProviderProps) {
	const [contextValue, setContextValue] = useState<AssetsContextType>()

	/** Loads fonts and image assets used within the app
	 * and appends the image uri source of each image
	 * asset to the context. ( Invoked at runtime only ) */
	useEffect(() => {
		const prepareAssets = async () => {
			try {
				// Load font assets.
				await ExpoFont.loadAsync(CONFIG.ASSETS.FONTS)

				// Load image uri sources.
				const context = (await Object.entries(CONFIG.ASSETS.ICONS).reduce(
					async (accP, [key, module]) => ({
						...(await accP),
						[key]: { uri: await getUriSourceFromModule(module) },
					}),
					Promise.resolve({})
				)) as AssetsContextType
				setContextValue(context)
			} catch (e) {
				throw e
			}
		}
		prepareAssets()
	}, [])

	if (!contextValue) {
		return null
	}

	return <AssetsContext.Provider value={contextValue}>{children}</AssetsContext.Provider>
}

AssetsProvider.displayName = 'AssetsProvider'

export default AssetsProvider
export { AssetsContext }
