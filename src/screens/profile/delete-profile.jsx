import { Alert, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { BlockButton, P } from '@components/base'

export default function DeleteProfileScreen() {
	const { params } = useRoute()
	const confirmDeleteAccount = () =>
		Alert.alert('Are you sure?', '', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: `Delete ${params.username}`,
				onPress: () => {
					console.log('account deleted')
				},
			},
		])

	return (
		<View className='flex-1 justify-center p-5'>
			<P className='h4'>Are you certain you'd like to delete your account?</P>
			<P className='mb-20 mt-5 text-xl'>
				All data on and associated with this profile will be permanantly delete... forever.
			</P>
			<BlockButton
				text='Delete'
				textStyle='text-red text-2xl uppercase'
				className='bg-red'
				onPress={confirmDeleteAccount}
			/>
		</View>
	)
}
