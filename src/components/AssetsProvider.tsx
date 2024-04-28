import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { Asset } from 'expo-asset'
import * as ExpoFont from 'expo-font'
import { Fonts } from '@assets/index'
import { ChildrenProps } from '@src/types/utils'

const Icons = {
	icon: require(`@assets/icons/icon.png`),
	adaptiveIcon: require(`@assets/icons/adaptive-icon.png`),
	maskedIcon: require(`@assets/icons/inverse-adaptive-icon.png`),
	favicon: require(`@assets/icons/favicon.png`),
}

type AssetContextType = { [K in keyof typeof Icons]: { uri: string } } | null

const AssetContext = createContext<AssetContextType>(null)

function AssetsProvider({ children }: ChildrenProps) {
	const [assetsReady, setAssetsReady] = useState(false)

	const icon = Asset.fromModule(Icons.icon)
	const adaptiveIcon = Asset.fromModule(Icons.adaptiveIcon)
	const maskedIcon = Asset.fromModule(Icons.maskedIcon)
	const favicon = Asset.fromModule(Icons.favicon)

	useEffect(() => {
		async function prepare() {
			try {
				await icon.downloadAsync()
				await adaptiveIcon.downloadAsync()
				await maskedIcon.downloadAsync()
				await favicon.downloadAsync()
				// await Promise.all([ ])
				await ExpoFont.loadAsync(Fonts)
			} catch (e) {
				console.warn(e)
			} finally {
				setAssetsReady(true)
			}
		}
		prepare()
	}, [])

	const assets = useMemo(
		() => ({
			icon: { uri: icon.localUri as string },
			adaptiveIcon: { uri: adaptiveIcon.localUri as string },
			maskedIcon: { uri: maskedIcon.localUri as string },
			favicon: { uri: favicon.localUri as string },
		}),
		[assetsReady]
	)

	if (!assetsReady) {
		return null
	}

	return <AssetContext.Provider value={assets}>{children}</AssetContext.Provider>
}

AssetsProvider.displayName = 'AssetsProvider'

export default AssetsProvider

export { AssetContext }
