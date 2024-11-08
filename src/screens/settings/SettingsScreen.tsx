import { View, Linking } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
//
import SCREENS from '@src/SCREENS'
import { TabsNavigatorParamList } from '@navigation/types'
import DefaultButton from '@components/DefaultButton'
import ScreenWrapper from '@components/ScreenWrapper'
import P from '@components/P'
import { useGetUserQuery } from '@features/User/userAPI'
import { IconName } from '@components/Icon'

/*
	Profile Screen
	-> Profile Detail
		- username
		- email 
		- change password
		- logout_
		--------------------
		- reset account
		- delete account
	-> Preferences
		- editor style ( simple | advanced )
		- units 
		- 
	-> Maxes
		- Edit Maxes

	-> Manage Exs
		- Select/ unselect exercises
	
*/

const send_email = () => {
	Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
}

type OptionsArray = Array<{ text: string; icon: IconName; onPress: () => void }>

type SettingsScreenProps = StackScreenProps<TabsNavigatorParamList, typeof SCREENS.TABS.SETTINGS>

function SettingsScreen(props: SettingsScreenProps) {
	const { data: user } = useGetUserQuery()

	if (!user) {
		return
	}

	const goToSettings = () => console.log('[ SettingsScreen ] --> Settings')
	const goToPreferences = () => console.log('[ SettingsScreen ] --> Preferences')
	const goToMaxes = () => console.log('[ SettingsScreen ] --> Maxes')
	const goToManager = () => console.log('[ SettingsScreen ] --> ManageExs')

	const options = [
		{ text: 'Account', icon: 'settings-outline', onPress: goToSettings },
		{ text: 'Preferences', icon: 'construct-outline', onPress: goToPreferences },
		{
			text: 'Training Maxes',
			icon: 'medal-outline',
			onPress: goToMaxes,
		},
		{
			text: 'Manage Exercises',
			icon: 'barbell-outline',
			onPress: goToManager,
		},
		{ text: 'Share', icon: 'share-outline', onPress: () => console.log('>>share_app()') },
		{ text: 'Contact', icon: 'mail-outline', onPress: send_email },
	] as OptionsArray

	return (
		<ScreenWrapper>
			<View className='h-32 justify-end'>
				<P className='h2'>{user.username || 'User'}</P>
			</View>

			<FlatList
				data={options}
				keyExtractor={({ text }) => text as string}
				renderItem={({ item }) => (
					<DefaultButton
						variant='plainText'
						iconSize={24}
						className={`min-w-full flex-row justify-start py-5 px-3`}
						textClassName='ml-3 text-lg text-red'
						{...item}
					/>
				)}
				ItemSeparatorComponent={() => <View className='h-px w-full bg-separator-light dark:bg-separator-dark' />}
				scrollEnabled={false}
			/>
		</ScreenWrapper>
	)
}

SettingsScreen.displayName = 'SettingsScreen'

export default SettingsScreen
