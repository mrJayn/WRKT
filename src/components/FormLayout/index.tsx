import React, { useMemo } from 'react'
import Animated, { FadeOut } from 'react-native-reanimated'
import DefaultButton from '@components/DefaultButton'
import ScreenWrapper from '@components/ScreenWrapper'
import ScreenLoader from '@components/ScreenLoader'
import Heading from '@components/Heading'
import FormLayoutProps from './types'
import KeyboardHandlerView from '@components/KeyboardHandlerView'

function FormLayout({
	title,
	formHeaderComponent: FormHeaderComponent,
	formFooterComponent: FooterComponent,
	submitButtonLabel = 'Done',
	onSubmit = undefined,
	isValid = false,
	isLoading = false,
	isComplete,
	keyboardHandlingEnabled,
	children,
	...props
}: FormLayoutProps) {
	const componentShouldUnmount = useMemo(() => isComplete === true, [isComplete])

	return (
		!componentShouldUnmount && (
			<Animated.View
				className='flex-1'
				exiting={FadeOut}
			>
				<KeyboardHandlerView keyboardHandlingEnabled={keyboardHandlingEnabled}>
					<ScreenWrapper {...props}>
						{FormHeaderComponent && <FormHeaderComponent />}

						{title && <Heading className='h3 mb-3'>{title}</Heading>}

						{children}

						<DefaultButton
							text={submitButtonLabel}
							onPress={onSubmit}
							disabled={!isValid}
							variant='filled'
							containerStyle={{
								marginTop: 10,
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						/>

						{FooterComponent && <FooterComponent />}
					</ScreenWrapper>
				</KeyboardHandlerView>

				{isLoading === true && <ScreenLoader />}
			</Animated.View>
		)
	)
}

FormLayout.displayName = 'FormLayout'

export default FormLayout
