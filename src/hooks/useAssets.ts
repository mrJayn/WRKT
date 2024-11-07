import { useContext } from 'react'
import { AssetsContext } from '@components/providers/AssetsProvider'

function useAssets() {
	const value = useContext(AssetsContext)

	if (!value || value === undefined) {
		throw new Error('useAssets() hook must be used within a "AssetsProvider".')
	}

	return value
}

export default useAssets
