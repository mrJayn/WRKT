import { View } from 'react-native'
import P from './P'

type QueryErrorMessageProps = {
	message: string
}

function QueryErrorMessage({ message }: QueryErrorMessageProps) {
	return (
		<View className='flex-1 centered'>
			<P className='h2 text-tint-error'>{message}</P>
		</View>
	)
}

QueryErrorMessage.displayName = 'QueryErrorMessage'

export default QueryErrorMessage
