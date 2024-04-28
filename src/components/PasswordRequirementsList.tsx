import React, { memo } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import type { MultipleFieldErrors } from 'react-hook-form'
//
import { colors } from '@colors'
import usePreferredTheme from '@hooks/useColorScheme'
import Heading from '@components/Heading'
import Icon from '@components/Icon'
import P from '@components/P'

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
] as const

type RenderItem = ListRenderItem<(typeof passwordRequirements)[number]>

function PasswordRequirementsList({ errorTypes, isValid }: { errorTypes?: MultipleFieldErrors; isValid?: boolean }) {
	const colorScheme = usePreferredTheme()

	const ListHeaderComponent = () => <Heading className='h6 text-base'>Your password must contain at least</Heading>

	const renderItem: RenderItem = ({ item }) => {
		const isItemValid = isValid || (!!errorTypes && !errorTypes[item.type])

		const iconName = isItemValid ? 'checkbox-marked-circle-outline' : 'checkbox-blank-circle-outline'
		const color = isItemValid ? colors.tint.success : colors.tint.primary[colorScheme]

		return (
			<View className='flex-row items-center gap-x-2'>
				<Icon
					name={iconName}
					color={color}
					size={16}
				/>
				<P
					className='text-xs leading-xs'
					style={{ color }}
				>
					{item.text}
				</P>
			</View>
		)
	}

	return (
		<FlatList
			data={passwordRequirements}
			keyExtractor={({ type }) => type}
			ListHeaderComponent={ListHeaderComponent}
			renderItem={renderItem}
			className='flex-none mb-6'
			contentContainerStyle={{ rowGap: 15 }}
			pointerEvents='none'
		/>
	)
}

PasswordRequirementsList.displayName = 'PasswordRequirementsList'

export default PasswordRequirementsList
