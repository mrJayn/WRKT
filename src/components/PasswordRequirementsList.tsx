import React from 'react'
import { FlatList, View } from 'react-native'
import type { MultipleFieldErrors } from 'react-hook-form'
//
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import P from '@components/P'
import { theme } from 'tailwind.config'
import cn from '@libs/cn'

type PasswordRequirement = {
	text: string
	type: string
}

const passwordRequirements = [
	{
		type: 'uppercase',
		text: '1 letter',
	},
	{
		type: 'number',
		text: '1 number or special character (example: ! ? @ #)',
	},
	{
		type: 'minLength',
		text: '8 characters',
	},
] as readonly PasswordRequirement[]

const VALID_ICON_NAME = 'checkbox-marked-circle-outline'
const ERROR_ICON_NAME = 'checkbox-blank-circle-outline'

function PasswordRequirementsList({ errorTypes, isValid }: { errorTypes?: MultipleFieldErrors; isValid?: boolean }) {
	const ListHeaderComponent = () => {
		return <Heading className='h6 text-base'>Your password must contain at least</Heading>
	}

	return (
		<FlatList
			data={passwordRequirements}
			keyExtractor={({ type }) => type}
			ListHeaderComponent={ListHeaderComponent}
			className='flex-none mb-6'
			contentContainerStyle={{ rowGap: 15 }}
			pointerEvents='none'
			renderItem={({ item }) => {
				const isItemValid = isValid || (!!errorTypes && !errorTypes[item.type])

				return (
					<View className='flex-row items-center gap-x-2'>
						<Icon
							name={isItemValid ? VALID_ICON_NAME : ERROR_ICON_NAME}
							size={16}
							{...(isItemValid && { color: theme.colors.tint.success })}
						/>
						<P
							className={cn('text-xs leading-xs', {
								'text-tint-success': isItemValid,
							})}
						>
							{item.text}
						</P>
					</View>
				)
			}}
		/>
	)
}

PasswordRequirementsList.displayName = 'PasswordRequirementsList'

export default PasswordRequirementsList
