import React from 'react'
import type { ScreenWrapperProps } from '@components/ScreenWrapper'

type FormLayoutProps = ScreenWrapperProps & {
	/**  */
	title?: string | undefined

	/** */
	formHeaderComponent?: ((props: any) => React.ReactNode) | undefined

	/** */
	formFooterComponent?: ((props: any) => React.ReactNode) | undefined

	/** */
	submitButtonLabel?: string

	/** */
	onSubmit: () => void

	/** */
	isValid?: boolean

	/** */
	isLoading?: boolean

	/** */
	isComplete?: boolean

	/** Enable or disable keyboard handling. */
	keyboardHandlingEnabled?: boolean | undefined
}

export default FormLayoutProps
