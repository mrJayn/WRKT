import React, { memo } from 'react'
import { colors } from '@colors'
import DefaultButton, { DefaultButtonProps } from './DefaultButton'

export type FormButtonProps = Omit<DefaultButtonProps, 'style' | 'variant' | 'className'>

function FormButton(props: FormButtonProps) {
	/*
    const methods = useFormContext()
	const disabled = _.isBoolean(disabled) ? disabled : Boolean(methods.formState.errors)
    */

	return (
		<DefaultButton
			className='bg-darkgreen-10'
			variant='filled'
			{...props}
		/>
	)
}

FormButton.displayName = 'FormButton'

export default FormButton
