import { View } from 'react-native'
import { Button, P } from '@components/base'

const ResetProfileScreen = () => {
	return (
		<View className='flex-1 justify-center p-5'>
			<P className='h4'>Are you certain you'd like to delete your account?</P>
			<P className='mb-20 mt-5 text-xl'>
				All data on and associated with this profile will be permanantly delete... forever.
			</P>
			<Button
				type='filled'
				text='Reset Data'
				textStyle='text-tint-warning text-2xl uppercase'
				className='bg-tint-warning/20'
				onPress={() => {
					console.log('Reseting Data')
				}}
			/>
		</View>
	)
}
export default ResetProfileScreen
