import { useState } from 'react'
import { View } from 'react-native'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@features/auth'
import { selectUser } from '@features/User'
import { DefaultScreen, H, P, Button } from '@components/base'

const SettingsScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const logoutUser = dispatch(logout)

	const { user } = useSelector(selectUser)

	return
	//
	const [editsMade, setEditsMade] = useState(false)
	// Textnput value states
	const [firstName, setFirstName] = useState(user.first_name)
	const [lastName, setLastName] = useState(user.last_name)
	const [email, setEmail] = useState(user.email)
	const [username, setUsername] = useState(user.username)
	const [pw1, setPw1] = useState('')
	const [pw2, setPw2] = useState('')

	/*
	useLayoutEffect(() => {
		if (editsMade)
			navigation.setOptions({
				headerRight: () => (
					<Save-Button
						onPress={() => {
							//API STUFF
							navigation.goBack()
						}}
					/>
				),
			})
	}, [editsMade])
*/

	const InputRenderItem = ({ item: { text, value, setValue } }) => (
		<View className='w-full'>
			<P>{text}</P>
			<TextInput
				// key={}
				value={value}
				onChangeText={(e) => {
					setValue(e)
					if (!editsMade) setEditsMade(true)
					// if ( !editsMade ) setEditsMade( defaultValue !== e )
				}}
				className='py-5 px-3 text-base font-inter text-tint-light dark:text-tint-dark bg-grey-15 dark:bg-grey-95'
			/>
		</View>
	)

	const ButtonRenderItem = ({ item }) => (
		<Button
			className='h-14 py-0 flex-row justify-start'
			textStyle='ml-3 text-lg font-inter-medium'
			iconSize={24}
			{...item}
		/>
	)

	const handleReset = () => null
	const handleDelete = () => () =>
		navigation.navigate('DeleteAccount', {
			title: "Are you certain you'd like to delete your account?",
			subtitle: 'All data on and associated with this profile will be permanantly delete... forever.',
			buttonText: 'Delete',
			alert: { confirmText: `Delete ${username}` },
			action: 'DELETE_ACCOUNT',
		})

	const RenderItemMap = {
		Account: {
			data: [
				{ text: 'First Name', value: firstName, setValue: setFirstName },
				{ text: 'Last Name', value: lastName, setValue: setLastName },
				{ text: 'Email Address', value: email, setValue: setEmail },
				{ text: 'Username', value: username, setValue: setUsername },
			],
			renderItem: InputRenderItem,
		},
		Password: {
			data: [
				{ text: 'New Password', value: pw1, setValue: setPw1 },
				{ text: 'Confirm New Password', value: pw2, setValue: setPw2 },
			],
			renderItem: InputRenderItem,
		},
		Settings: {
			data: [
				{ text: 'Log Out', icon: 'log-out', onPress: () => logoutUser() },
				{ text: 'Reset Data', icon: 'arrow-undo-circle', onPress: handleReset },
				{ text: 'Delete Profile', icon: 'trash', onPress: handleDelete },
			],
			renderItem: ButtonRenderItem,
		},
	}

	return (
		<DefaultScreen>
			<ScrollView
				contentContainerStyle={{ minHeight: '100%', paddingBottom: 100 }}
				alwaysBounceVertical={false}
				showsVerticalScrollIndicator={false}
			>
				{Object.entries(RenderItemMap).map(([key, props]) => (
					<FlatList
						key={key}
						keyExtractor={({ text }) => text}
						ListHeaderComponent={() => <H className='h5 my-2'>{key}</H>}
						ItemSeparatorComponent={() => (
							<View className='mb-3 h-px w-full bg-separator-light dark:bg-separator-dark' />
						)}
						ListFooterComponent={() => <View style={{ height: 50 }} />}
						scrollEnable={false}
						keyboardShouldPersistTaps='handled'
						{...props}
					/>
				))}
			</ScrollView>
		</DefaultScreen>
	)
}

export default SettingsScreen

/*  
				<InputsFlatList
					title='Account'
					data={accountData}
					renderItem={InputRenderItem}
				/>
				<InputsFlatList
					title='Password'
					data={passwordsData}
					renderItem={InputRenderItem}
				/>
				<ButtonsFlatList
					title='Settings'
					data={buttonsData}
					renderItem={ButtonRenderItem}
				/>
	*/
