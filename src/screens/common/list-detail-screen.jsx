import { useState, useCallback, useLayoutEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Button, DefaultScreen } from '@components/base'
import GenieEffectView from '@components/GenieEffectView'
import { colors } from '@colors'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ListDetailScreen = ({ flatListProps }) => {
	const { navigate } = useNavigation()
	const [optionsMenu, setOptionsMenu] = useState(false)
	const [updating, setUpdating] = useState(false)

	const sv = useSharedValue(0)
	const scrollHandler = (e) => {
		const sy = e.nativeEvent.contentOffset.y
		const threshold = 62.5
		if ((sy > threshold && sv.value === 1) || (sy <= threshold && sv.value === 0)) return
		if (sy > threshold && sv.value !== 1) sv.value = withTiming(1, { duration: 200 })
		else if (sy <= threshold && sv.value !== 0) sv.value = withTiming(0, { duration: 200 })
	}

	const insets = useSafeAreaInsets()

	return (
		<DefaultScreen className=''>
			<HeaderRight
				onPress={() => setOptionsMenu(true)}
				{...{ updating }}
			/>
			<FlatList
				onScroll={scrollHandler}
				contentContainerStyle={{
					minHeight: '100%',
					paddingTop: 100,
					paddingRight: 15,
					paddingBottom: 100,
					marginTop: -insets.top,
				}}
				{...flatListProps}
			/>
			{optionsMenu && (
				<Pressable
					className='absolute inset-0 z-3'
					onPress={() => setOptionsMenu(false)}
				>
					<OptionsMenu {...{ navigate }} />
				</Pressable>
			)}
		</DefaultScreen>
	)
}

const HeaderRight = ({ updating, onPress }) => (
	<View className='absolute top-0 right-0 justify-center z-5'>
		{updating && (
			<Animated.View
				className='absolute -left-4'
				{...{ entering: FadeIn, exiting: FadeOut }}
			>
				<ActivityIndicator color={'#fff'} />
			</Animated.View>
		)}
		<Button
			icon='ellipsis-horizontal-circle-outline'
			iconColor={colors.tint.warning}
			onPress={onPress}
		/>
	</View>
)

const OptionsMenu = ({ navigate }) => {
	const options = [
		{
			text: 'Share',
			icon: 'share-outline',
			iconSize: 18,
			onPress: () => console.log('option 1'),
		},
		{ text: 'Select Items', icon: 'close-outline', iconSize: 24, onPress: () => console.log('option 2') },
	]
	return (
		<View className='absolute top-3 right-3 w-40 z-1'>
			<GenieEffectView className='full flex bg-grey-20 rounded-xl shadow-sm shadow-black/50 overflow-hidden'>
				{options.map((item) => (
					<Button
						key={item.text}
						containerStyle='w-full h-9 bg-grey-5 my-px'
						className='flex-row-reverse justify-between h-full min-w-full p-0 px-2'
						textStyle='text-lg'
						{...item}
					/>
				))}
			</GenieEffectView>
		</View>
	)
}

export default ListDetailScreen
