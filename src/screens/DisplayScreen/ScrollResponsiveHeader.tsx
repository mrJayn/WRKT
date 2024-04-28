import React, { Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
//
import type { WeekdayIndex } from '@src/types/utils'
import P from '@components/P'
import DefaultButton from '@components/DefaultButton'

type ScrollResponsiveHeaderProps = {
	title: string
	subtitle: string
	dayNames: string[]
	scrollY: SharedValue<number>
	displayDayNum: WeekdayIndex
	setDisplayDayNum: Dispatch<SetStateAction<WeekdayIndex>>
}

const HEADER_HEIGHT = 200
const TITLE_HEIGHT = 60
const SUBTITLE_HEIGHT = 22

function ScrollResponsiveHeader({
	title,
	subtitle,
	dayNames,
	scrollY,
	displayDayNum,
	setDisplayDayNum,
}: ScrollResponsiveHeaderProps) {
	const flatlistRef = useRef<FlatList<string> | null>(null)

	const scrollY1 = HEADER_HEIGHT - TITLE_HEIGHT
	const textScrollY0 = scrollY1 - SUBTITLE_HEIGHT

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
		flatlistRef?.current?.scrollToIndex({
			animated: true,
			index: index,
			viewPosition: 0.5,
		})
	}

	const dayNamesRenderItem: ListRenderItem<string> = ({ item, index }) => {
		let isSelected = index === displayDayNum

		const handlePress = () => {
			if (!isSelected) {
				setDisplayDayNum(index)
				scrollToDayNameIndex(index)
			}
		}

		return (
			<DefaultButton
				text={item}
				variant='grey'
				className={isSelected ? 'bg-white/25' : ''}
				onPress={handlePress}
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
				className='flex-1 px-3 justify-end'
				style={[titlesContainerStyle]}
			>
				<P className='h-12 text-4xl font-inter-semibold text-tint-primary-light dark:text-tint-primary-dark'>
					{title}
				</P>

				<Animated.Text
					className='h-5 mt-1 pl-2 pb-2 text-lg font-inter-regular text-tint-secondary-light dark:text-tint-secondary-dark'
					style={[subtitleTextStyle]}
				>
					{subtitle}
				</Animated.Text>
			</Animated.View>
		</Animated.View>
	)
}

ScrollResponsiveHeader.displayName = 'ScrollResponsiveHeader'

export default ScrollResponsiveHeader
