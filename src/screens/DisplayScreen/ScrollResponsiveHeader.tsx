import React, { useRef, useEffect } from 'react'
import { FlatList } from 'react-native'
import type { ListRenderItem } from 'react-native'
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import type { Weekday } from '@src/types/utils'
import DefaultButton from '@components/DefaultButton'
import P from '@components/P'

const HEADER_HEIGHT = 200
const TITLE_HEIGHT = 60
const SUBTITLE_HEIGHT = 22
//
const scrollY1 = HEADER_HEIGHT - TITLE_HEIGHT
const textScrollY0 = scrollY1 - SUBTITLE_HEIGHT

type ScrollResponsiveHeaderProps = {
	dayNames: readonly string[]
	numExercises?: number
	scrollY: SharedValue<number>
	displayDayNum: Weekday
	setDisplayDayNum: React.Dispatch<React.SetStateAction<Weekday>>
}

function ScrollResponsiveHeader({
	dayNames,
	numExercises = 0,
	scrollY,
	displayDayNum,
	setDisplayDayNum,
}: ScrollResponsiveHeaderProps) {
	const flatlistRef = useRef<FlatList<string> | null>(null)

	const headerContainerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: interpolate(scrollY.value, [0, scrollY1], [0, -scrollY1], {
					extrapolateLeft: 'extend',
					extrapolateRight: 'clamp',
				}),
			},
		],
	}))

	const titlesContainerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: interpolate(scrollY.value, [textScrollY0, scrollY1], [0, SUBTITLE_HEIGHT], 'clamp') }],
	}))

	const subtitleTextStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY.value, [textScrollY0, scrollY1], [1, 0], 'clamp'),
	}))

	const bgStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY.value, [0, scrollY1], [0, 1], 'clamp'),
	}))

	const scrollToDayNameIndex = (index: number) => {
		if (!dayNames.length) {
			return
		}
		flatlistRef?.current?.scrollToIndex({
			animated: true,
			index: index,
			viewPosition: 0.5,
		})
	}

	const dayNamesRenderItem: ListRenderItem<string> = ({ item, index }) => {
		let isSelected = index === displayDayNum

		return (
			<DefaultButton
				text={item}
				variant='grey'
				className={isSelected ? 'bg-white/25' : ''}
				onPress={() => {
					if (!isSelected) {
						setDisplayDayNum(index as Weekday)
						scrollToDayNameIndex(index)
					}
				}}
				activeOpacity={isSelected ? 1 : 0.5}
			/>
		)
	}

	/** Scroll to the currently display dayName item. */
	useEffect(() => {
		if (!flatlistRef.current) {
			return
		}
		setTimeout(() => scrollToDayNameIndex(displayDayNum), 550)
	}, [])

	return (
		<Animated.View
			className='absolute inset-x-0 h-40 overflow-hidden z-2'
			style={[headerContainerStyle]}
		>
			<Animated.View
				className='absoluteFill bg-black'
				style={[bgStyle]}
			/>

			<FlatList
				ref={flatlistRef}
				data={dayNames}
				initialNumToRender={dayNames.length}
				keyExtractor={(_, index) => `dayname-${index}`}
				renderItem={dayNamesRenderItem}
				className='absolute inset-x-0 h-20 z-1'
				contentContainerStyle={{
					paddingHorizontal: 10,
					columnGap: 10,
					alignItems: 'center',
				}}
				horizontal={true}
				indicatorStyle='white'
				persistentScrollbar={true}
				showsHorizontalScrollIndicator={true}
				showsVerticalScrollIndicator={false}
			/>

			<Animated.View
				className='flex-1 px-2 justify-end'
				style={[titlesContainerStyle]}
			>
				<P className='h-12 text-4xl font-inter-semibold text-tint-primary-light dark:text-tint-primary-dark'>
					{dayNames[displayDayNum]}
				</P>

				<Animated.Text
					className='h-5 mt-1 pl-2 pb-2 text-lg font-inter-regular text-tint-secondary-light dark:text-tint-secondary-dark'
					style={[subtitleTextStyle]}
				>
					{`${numExercises} total exercises.`}
				</Animated.Text>
			</Animated.View>
		</Animated.View>
	)
}

ScrollResponsiveHeader.displayName = 'ScrollResponsiveHeader'

export default ScrollResponsiveHeader
