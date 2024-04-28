import React, { ComponentType, ForwardedRef, RefAttributes } from 'react'
import getComponentDisplayName from '@libs/getComponentDisplayName'
import ScreenLoader from './ScreenLoader'
import QueryErrorMessage from './QueryErrorMessage'
//
import type { Day, WeightUnits } from '@src/types/features'
import { useGetActiveWorkoutDaysQuery } from '@features/Days/daysApi'

export type WithActiveWorkoutDaysProps = {
	data: Required<Day>[]
	units: WeightUnits
}

export default function withActiveWorkoutDays<TProps extends WithActiveWorkoutDaysProps, TRef>(
	WrappedComponent: ComponentType<TProps & RefAttributes<TRef>>
) {
	function WithActiveWorkoutDays(props: Omit<TProps, keyof TProps>, ref: ForwardedRef<TRef>) {
		const { data, isSuccess, isError } = useGetActiveWorkoutDaysQuery()

		const units: WeightUnits = 'lbs'

		if (isError) {
			return <QueryErrorMessage />
		}

		return (
			<React.Fragment>
				{data && (
					<WrappedComponent
						{...(props as TProps)}
						data={data}
						units={units}
						ref={ref}
					/>
				)}
				{!isSuccess && <ScreenLoader />}
			</React.Fragment>
		)
	}

	WithActiveWorkoutDays.displayName = `withQuery(${getComponentDisplayName(WrappedComponent)})`

	return React.forwardRef(WithActiveWorkoutDays)
}
