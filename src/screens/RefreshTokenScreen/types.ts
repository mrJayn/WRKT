import type { StackScreenProps } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import { PublicStackParamList } from '@navigation/types'

type RefreshTokenScreenProps = StackScreenProps<PublicStackParamList, typeof SCREENS.REFRESH_TOKEN>

export type { RefreshTokenScreenProps }
