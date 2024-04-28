import React, { useEffect } from 'react'
import SCREENS from '@src/SCREENS'
import ScreenLoader from '@components/ScreenLoader'
import { RefreshTokenScreenProps } from './types'

function RefreshTokenScreen({ route }: RefreshTokenScreenProps) {
	return <ScreenLoader />
}

RefreshTokenScreen.displayName = 'RefreshTokenScreen'

export default RefreshTokenScreen
