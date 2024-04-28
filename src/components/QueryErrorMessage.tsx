import { View } from 'react-native'
import { P } from './base'

interface QueryErrorMessageProps {
	message?: string
}

const QUERY_ERROR_TEXT = 'Something went wrong, you may want to retry in a bit.'

export default function QueryErrorMessage({ message }: QueryErrorMessageProps) {
	return (
		<View className='flex-1 centered'>
			<P className='h2 text-tint-error'>{message || QUERY_ERROR_TEXT}</P>
		</View>
	)
}
