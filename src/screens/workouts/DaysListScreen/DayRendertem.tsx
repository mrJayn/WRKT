import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeOutRight, SlideInRight } from 'react-native-reanimated'
//

import withTransition from '@utils/animation/withTransition'
import ROUTES from '@src/ROUTES'
import { useUpdateDayMutation } from '@features/Days/daysApi'
import FadeView from '@components/FadeView'
import Navigation from '@navigation/Navigation'
import { Day } from '@src/types/features'
import DefaultButton from '@components/DefaultButton'
import P from '@components/P'

const propTypes = {
	/** Day data object. */
	item: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		day_id: PropTypes.number.isRequired,
	}).isRequired,

	/** item new order value */
	reorder: PropTypes.number,

	/** item drag fn */
	drag: PropTypes.func.isRequired,

	/** editing / should-update state values */
	editing: PropTypes.bool.isRequired,
	shouldUpdate: PropTypes.bool.isRequired,
}

type DayRenderItemProps = {
	/** Day data object. */
	item: Day

	/** editing / should-update state values */
	editing: boolean

	/** If the day should be saved on editing complete. */
	shouldUpdate: boolean

	/** item new order value */
	reorder?: number | undefined

	/** item drag fn */
	drag: () => void
}
function DayRenderItem({ item: day, reorder, drag, editing, shouldUpdate }: DayRenderItemProps) {
	const { name } = day

	const [nameValue, setNameValue] = useState(name)
	const exercises = []
	const [updateDay, { isLoading: isUpdating }] = useUpdateDayMutation()

	const reset = () => {
		setNameValue(name)
		// orders will reset themselves because no tags are being invalidated.
	}

	useEffect(() => {
		const didChange = String(nameValue) !== String(name) || _.isNumber(reorder)
		if (day.dayIndex === 0) {
			console.log('...')
		}
		// console.log('<DayRenderItem/>... reorder=', reorder)

		if (!editing && didChange) {
			if (!shouldUpdate) {
				return reset
			}
			return
			updateDay({
				id: day.id,
				name: nameValue,
			})
		}
	}, [editing])

	return (
		<TouchableOpacity
			className='flex-row centered h-12 ml-14 px-3 bg-tertiary-light dark:bg-tertiary-dark'
			activeOpacity={0.6}
			onPress={() => {
				Navigation.navigate(ROUTES.WORKOUT_DAYS_DETAIL.getRoute(day.workout, day.id))
			}}
			disabled={isUpdating || editing}
		>
			<TextInput
				value={nameValue}
				onChangeText={(text) => setNameValue(text)}
				className='h6 flex-1 text-tint-primary-dark'
				editable={editing}
				style={{ pointerEvents: editing ? 'auto' : 'none' }}
				// placeholder={`Day ${day_id}`}
			/>

			<P className='text-tint-secondary-dark opacity-50'>{`${exercises.length} exs`}</P>

			{editing && (
				<>
					<FadeView
						className='absolute h-10 right-12 left-0 rounded-md bg-grey-90 -z-1'
						pointerEvents='none'
					/>
					<Animated.View
						className='absolute right-0 h-12 w-12 centered z-1 bg-tertiary-light dark:bg-tertiary-dark'
						entering={withTransition(SlideInRight)}
						exiting={FadeOutRight}
					>
						{drag && (
							<DefaultButton
								icon='reorder-two-outline'
								onPressIn={drag}
								disabled={isUpdating}
							/>
						)}
					</Animated.View>
				</>
			)}
		</TouchableOpacity>
	)
}

DayRenderItem.displayName = 'DayRenderItem'
export default DayRenderItem
