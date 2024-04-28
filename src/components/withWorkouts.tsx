import React, { ComponentType, ForwardedRef, RefAttributes } from 'react'
import getComponentDisplayName from '@libs/getComponentDisplayName'
import ScreenLoader from './ScreenLoader'
import QueryErrorMessage from './QueryErrorMessage'
import type { Workout } from '@src/types/features'
import { useGetWorkoutsQuery } from '@features/Workouts/workoutsApi'

export type WithWorkoutsProps = {
	data: Workout[]
}

export default function withWorkouts<TProps extends WithWorkoutsProps, TRef>(
	WrappedComponent: ComponentType<TProps & RefAttributes<TRef>>
) {
	const WithWorkouts = (props: Omit<TProps, keyof WithWorkoutsProps>, ref: ForwardedRef<TRef>) => {
		const { data, isSuccess, isError } = useGetWorkoutsQuery()

		if (isError) {
			return <QueryErrorMessage />
		}

		return (
			<React.Fragment>
				{data && (
					<WrappedComponent
						{...(props as TProps)}
						data={data}
						ref={ref}
					/>
				)}
				{!isSuccess && <ScreenLoader />}
			</React.Fragment>
		)
	}

	WithWorkouts.displayName = `withWorkouts(${getComponentDisplayName(WrappedComponent)})`
	return React.forwardRef(WithWorkouts)
}
