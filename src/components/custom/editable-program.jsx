import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import BlockButton from '../base/buttons/index'
import P from '../base/p-tag'

export default function EditableProgram({ week, day1, day2 }) {
	if (week !== 0) return null

	const [selected, setSelected] = useState(-1)

	const exs_arr = [day1.primary, day1.secondary, day2.primary, day2.secondary].filter((v) => v)

	return (
		<View className='flex-1 px-3'>
			{exs_arr.map((exercise, idx) => {
				return (
					<View
						key={`wk${week}-ex${idx}`}
						className='w-full mb-2'
					>
						<BlockButton
							text={exercise}
							textStyle='h6'
							className='bg-grey-5 items-start p-3'
							onPress={() => setSelected(selected === idx ? -1 : idx)}
						/>
						<Accordion {...{ week, exercise, idx, selected }} />
					</View>
				)
			})}
		</View>
	)
}

const Accordion = ({ week, exercise, idx, selected }) => {
	const h = useSharedValue(0)
	const animatedHeight = useAnimatedStyle(() => ({ height: h.value }))
	useEffect(() => {
		h.value = withTiming(idx === selected ? 360 : 0)
	}, [selected])

	return (
		<Animated.View
			className='overflow-hidden'
			style={[animatedHeight]}
		>
			<ScrollView horizontal={true}>
				<T_Block {...{ exercise, blocksWide: 3 }} />
			</ScrollView>
		</Animated.View>
	)
}

const T_Block = ({ exercise, blocksWide = 3 }) => {
	if (!exercise || !exercise.trim().length) return null

	return (
		<View className='h-full flex-row m-1'>
			{[...Array(blocksWide).keys()].map((_, i) => (
				<View
					key={`${exercise}-block-${i}`}
					className='h-full w-44 p-1'
				>
					<View className='w-full flex-row gap-x-2 p-1'>
						<P className='flex-1'>Exercise</P>
						<P>Set x Rep</P>
						<P>%</P>
						<P>wgt.</P>
					</View>
					<View className='flex-1 rounded-sm border-[1px] border-r-transparent p-1'>
						<P>{exercise}</P>
					</View>
				</View>
			))}
		</View>
	)
}
