import { Image, View } from 'react-native'

import useAssets from '@hooks/useAssets'
import P from '@components/P'
import ScreenWrapper from '@components/ScreenWrapper'

function NotFoundScreen() {
	const assets = useAssets()

	return (
		<ScreenWrapper testID={NotFoundScreen.displayName}>
			<View className='flex-1 max-w-md self-center pb-20'>
				<Image
					source={assets.icon}
					className='h-20 w-20'
					resizeMode='contain'
					fadeDuration={0}
				/>
				<View>
					<P className='h2'>{`Not Found`}</P>
				</View>
			</View>
		</ScreenWrapper>
	)
}

NotFoundScreen.displayName = 'NotFoundScreen'

export default NotFoundScreen
