import React from 'react'
import { View } from 'react-native'
import { useUpdateUserMutation } from '@features/User/userAPI'
import ScreenWrapper from '@components/ScreenWrapper'
import { StackScreenProps } from '@react-navigation/stack'
import { SettingsStackParamList } from '@navigation/types'
import SCREENS from '@src/SCREENS'

type AccountScreenProps = StackScreenProps<SettingsStackParamList, typeof SCREENS.SETTINGS.ACCOUNT>

function AccountScreen(props: AccountScreenProps) {
	const [updateUser, { data: user }] = useUpdateUserMutation()

	return (
		<ScreenWrapper>
			<View></View>
		</ScreenWrapper>
	)
}

AccountScreen.displayName = 'AccountScreen'
export default AccountScreen
