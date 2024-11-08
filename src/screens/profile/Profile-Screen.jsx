import { useContext } from 'react'
import { View, Linking } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button, DefaultScreen, P, ProfileContext } from '@components/base'

const send_email = () => Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')

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
const ProfileScreen = ({ navigation: { navigate } }) => {
	const { user } = useContext(ProfileContext)

	const goToSettings = () => navigate('Settings')
	const goToPreferences = () => navigate('Preferences')
	const goToMaxes = () => navigate('Maxes')
	const goToManager = () => navigate('ManageExs')

	const options = [
		{ text: 'Account', icon: 'settings', onPress: goToSettings },
		{ text: 'Preferences', icon: 'construct', onPress: goToPreferences },
		{
			text: 'Training Maxes',
			icon: 'medal',
			onPress: goToMaxes,
		},
		{
			text: 'Manage Exercises',
			icon: 'barbell',
			onPress: goToManager,
		},
		{ text: 'Share', icon: 'share', onPress: () => console.log('>>share_app()') },
		{ text: 'Contact', icon: 'mail', onPress: send_email },
	]

	return (
		<DefaultScreen className='px-3'>
			<View className='h-32 justify-end'>
				<P className='h2'>{user.username}</P>
			</View>

			<FlatList
				data={options}
				keyExtractor={({ text }) => text}
				renderItem={(props) => {
					const { icon, ...item } = props.item
					return (
						<Button
							type='plain'
							className={`min-w-full flex-row justify-start py-5 px-3`}
							textStyle='ml-3 text-lg font-inter-medium'
							icon={`${icon}-outline`}
							iconSize={24}
							{...item}
						/>
					)
				}}
				ItemSeparatorComponent={() => <View className='h-px w-full bg-separator-light dark:bg-separator-dark' />}
				scrollEnabled={false}
			/>
		</DefaultScreen>
	)
}

export default ProfileScreen
