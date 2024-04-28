import { useContext } from 'react'
import { AssetContext } from '@components/AssetsProvider'

function useAssets() {
	const value = useContext(AssetContext)

	if (!value || value === undefined) {
		throw new Error('useSplashAsset must be used within a AssetProvider.')
	}

	return value
}

export default useAssets
