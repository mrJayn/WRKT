import React from 'react'
import { DefaultButtonProps } from '@components/DefaultButton'
import { ScreenWrapperProps } from '@components/ScreenWrapper'
import { KeyboardHandlerViewProps } from '@components/KeyboardHandlerView'

type FormLayoutProps = KeyboardHandlerViewProps &
	ScreenWrapperProps & {
		/**  */
		title?: string | undefined

		/** */
		formHeaderComponent?: ((props: any) => React.ReactNode) | undefined

		/** */
		formFooterComponent?: ((props: any) => React.ReactNode) | undefined

		/** */
		submitButtonLabel?: string

		/** */
		onSubmit: DefaultButtonProps['onPress']

		/** */
		isValid?: boolean

		/** */
		isLoading?: boolean

		/** */
		isComplete?: boolean
	}

export default FormLayoutProps
