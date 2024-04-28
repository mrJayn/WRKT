import { useState } from 'react'
import { View, SafeAreaView, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedScrollHandler,
	interpolate,
	interpolateColor,
	Extrapolate,
} from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@colors'
import P from '../base/p-tag'

const { width, height } = Dimensions.get('screen')

const slideWidth = width * 0.75
const slideHeight = height * 0.25

export default function AppSlides({ slides }) {
	const scroll = useSharedValue(0)
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scroll.value = event.contentOffset.x
		},
	})
	const [starred, setStarred] = useState(-1)
	const handleStar = (i) => setStarred(i === starred ? -1 : i)

	return (
		<SafeAreaView className='flex-1 justify-around'>
			<Animated.ScrollView
				scrollEventThrottle={1}
				horizontal
				snapToInterval={slideWidth}
				decelerationRate='fast'
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: 'center',
					paddingHorizontal: (width - slideWidth) / 2,
					justifyContent: 'center',
				}}
				onScroll={scrollHandler}
			>
				{slides.map((slide, index) => (
					<Slide
						key={index}
						{...{ index, slide, scroll, starred, handleStar }}
					/>
				))}
			</Animated.ScrollView>
			<View className='flex-1 flex-row justify-center'>
				{slides.map((_, index) => (
					<Indicator
						key={index}
						{...{ index, scroll }}
					/>
				))}
			</View>
		</SafeAreaView>
	)
}

const Slide = ({ slide, scroll, index, starred, handleStar }) => {
	const { icon, text, onPress } = slide
	const isStarred = starred === index

	const animatedStyle = useAnimatedStyle(() => {
		const input = scroll.value / slideWidth
		const inputRange = [index - 1, index, index + 1]
		return { transform: [{ scale: interpolate(input, inputRange, [0.8, 1, 0.8], Extrapolate.CLAMP) }] }
	})

	return (
		<Animated.View
			key={index}
			className='flex-1 py-3 h-40'
			style={[{ width: slideWidth }, animatedStyle]}
		>
			<View className='centered h-full rounded-2xl'>
				<Pressable
					onPress={() => handleStar(index)}
					className='centered absolute right-3 top-3 z-1 h-10 w-10'
				>
					<Ionicons
						name={`star${isStarred ? '' : '-outline'}`}
						size={32}
						color={isStarred ? '#ffd858' : '#000'}
					/>
				</Pressable>
				<TouchableOpacity
					className='full centered rounded-lg bg-white dark:bg-black p-3'
					onPress={onPress}
					activeOpacity={1}
				>
					<P className='text-center font-raleway-medium text-xl'>{text}</P>
				</TouchableOpacity>
			</View>
		</Animated.View>
	)
}

const Indicator = ({ scroll, index }) => {
	const [c1, c2] = [colors.grey[35], colors.grey[85]]
	const animatedStyle = useAnimatedStyle(() => {
		const input = scroll.value / slideWidth
		const inputRange = [index - 1, index, index + 1]

		return {
			width: interpolate(input, inputRange, [25, 50, 25], Extrapolate.CLAMP),
			backgroundColor: interpolateColor(input, inputRange, [c2, c1, c2]),
		}
	})
	return (
		<Animated.View
			className='mx-1 h-3.5 rounded-lg bg-grey-80'
			style={[animatedStyle]}
		/>
	)
}
