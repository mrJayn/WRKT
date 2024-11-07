import React, { useRef, useState, useCallback, useEffect } from 'react'
import { TextInput, View, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSharedValue } from 'react-native-reanimated'
//
import { colors } from '@colors'
import getSecureEntryKeyboardType from '@libs/getSecureEntryKeyboardType'
import getAutoCompleteContentTypeProps from '@libs/getAutoCompleteContentTypeProps'
import useThemePreference from '@hooks/useThemePreference'
import DefaultButton from '@components/DefaultButton'
import P from '@components/P'
import TextInputBottomBorder from './TextInputBottomBorder'
import TextInputLabel from './TextInputLabel'
import type { BaseTextInputProps, BaseTextInputRef } from './types'

const TEXT_INPUT_AUTO_FOCUS_DELAY = 400

const FormTextInput = (
	{
		label = undefined,
		forceLabelActive = false,
		helpText,
		errorText = undefined,
		forceError,
		isError = false,
		isLoading = false,
		isValid = false,
		autoFocusDelay = TEXT_INPUT_AUTO_FOCUS_DELAY,
		containerClassName = undefined,

		/** RN text input props */
		value = undefined,
		defaultValue = undefined,
		autoComplete,
		autoCorrect,
		autoFocus,
		keyboardType,
		placeholder,
		returnKeyType,
		returnKeyLabel,
		secureTextEntry,
		textContentType,
		...props
	}: BaseTextInputProps,
	ref: React.ForwardedRef<BaseTextInputRef>
) => {
	const initialValue = String(value || defaultValue || '')
	const initialActiveLabel = Boolean(!!forceLabelActive || initialValue.length > 0)

	const input = useRef<TextInput | null>(null)
	const hasValueRef = useRef(initialValue.length > 0)

	const [isFocused, setIsFocused] = useState(false)
	const [passwordHidden, setPasswordHidden] = useState(secureTextEntry)

	const navigation = useNavigation()
	const colorScheme = useThemePreference()
	const isLabelActiveSV = useSharedValue(initialActiveLabel)
	const focusSV = useSharedValue(false) // autoFocus

	const hasValue = Boolean((value ?? '').length > 0 || hasValueRef.current)
	const hasError = Boolean(forceError ?? !!errorText)

	const helpOrErrorText = (hasError && !!errorText ? errorText : helpText) || ''

	/**  Platform dependent properties  */
	const keyboardTypeValue = getSecureEntryKeyboardType(keyboardType, secureTextEntry || false, passwordHidden || false)
	const { autoCompleteValue, textContentTypeValue } = getAutoCompleteContentTypeProps(
		autoComplete,
		textContentType,
		secureTextEntry || false
	)

	const togglePasswordVisibility = useCallback(() => {
		setPasswordHidden((prevPasswordHidden) => !prevPasswordHidden)
	}, [])

	const onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		props.onFocus?.(event)
		focusSV.value = true
		setIsFocused(true)
	}

	const onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		props.onBlur?.(event)
		focusSV.value = false
		setIsFocused(false)
	}

	/**  Activate or deactivate the label.  */
	useEffect(() => {
		let isLabelActive = Boolean(hasValue || isFocused)
		if (forceLabelActive || isLabelActive === isLabelActiveSV.value) {
			return
		}
		isLabelActiveSV.value = isLabelActive
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasValue, isFocused, forceLabelActive])

	/**  Update the `hasValueRef` if `value` is cleared externally.  */
	useEffect(() => {
		if (value === undefined || value) {
			// Return early for uncontrolled component -or- we still have a value

			return
		}
		hasValueRef.current = false
	}, [value])

	/**  Prevents immediate auto focus on screen focus.  */
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (!autoFocus || !input.current) {
				return
			}
			const focusTimeout = setTimeout(() => {
				input.current?.focus()
				focusSV.value = true
			}, autoFocusDelay)
			return () => clearTimeout(focusTimeout)
		})

		return unsubscribe

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigation])

	return (
		<View className={containerClassName}>
			<View className='w-full justify-center bg-grey/[0.03]'>
				{!!label && (
					<TextInputLabel
						label={label}
						isLabelActiveSV={isLabelActiveSV}
						for={props.nativeID}
					/>
				)}

				<TextInput
					ref={(element: BaseTextInputRef) => {
						if (typeof ref === 'function') {
							ref(element)
						} else if (ref && 'current' in ref) {
							ref.current = element
						}
						input.current = element
					}}
					{...props}
					value={value}
					defaultValue={defaultValue}
					onBlur={onBlur}
					onFocus={onFocus}
					//
					autoComplete={autoCompleteValue}
					autoCorrect={secureTextEntry ? false : autoCorrect}
					// inputMode={props.inputMode}
					keyboardType={keyboardTypeValue}
					keyboardAppearance={colorScheme} // android only
					placeholder={isFocused || !Boolean(label?.length) ? placeholder : undefined}
					placeholderTextColor={colors.tint.tertiary[colorScheme]}
					secureTextEntry={passwordHidden}
					returnKeyType={returnKeyType || 'default'}
					returnKeyLabel={returnKeyLabel || returnKeyType || undefined} // android
					textContentType={textContentTypeValue} // ios only
					//
					className='w-full pt-8 pb-3 px-3 font-inter text-base text-tint-primary-light dark:text-tint-primary-dark'
					underlineColorAndroid='transparent' // android only
				/>

				{!!secureTextEntry && (
					<DefaultButton
						icon={passwordHidden ? 'eye-outline' : 'eye-off-outline'}
						onPress={togglePasswordVisibility}
						containerStyle={{
							position: 'absolute',
							right: 0,
						}}
					/>
				)}

				<TextInputBottomBorder
					isValid={isValid}
					isError={forceError || !!errorText}
					focusSV={focusSV}
				/>
			</View>

			{/** Help or error text. */}
			<P className='h-5 text-xs leading-2xl'>{helpOrErrorText}</P>
		</View>
	)
}

/* {isLoading ? (
				<FadeView className='absolute right-3 z-2'>
					<ActivityIndicator
						size='small'
						color={colors.tint.primary[colorScheme]}
					/>
				</FadeView>
			) : (
				isValid && (
					<Animated.View
						className='absolute right-3'
						entering={FadeIn.duration(100).delay(500)}
					>
						<Icon
							name='check'
							color={colors.tint.success}
						/>
					</Animated.View>
				)
			)} */

/** TextInput props defaults
	
//  IOS Only  // 
	clearButtonMode: 'never', // DEL
	clearTextOnFocus: false,
	dataDetectorTypes: 'none',
	enablesReturnKeyAutomatically: false,
	inputAccessoryViewID: '',
	rejectResponderTermination: true,
	scrollEnabled: true, // multiline only
	spellCheck: true, // inherits from `autoCorrect`
	textContentType: undefined, // Avoid using with `autoComplete`.
	passwordRules: undefined,
	lineBreakStrategyIOS: 'standard',

 
//  Android Only  //  
	cursorColor: colors.tint.primary[CONST.THEME.DEFAULT],
	disableFullscreenUI: false,
	importantForAutofill: 'auto',
	inlineImageLeft: undefined,
	inlineImagePadding: undefined,
	keyboardAppearance: CONST.THEME.DEFAULT,
	numberOfLines: undefined,
	returnKeyLabel: undefined,
	textBreakStrategy: 'simple',
	underlineColorAndroid: 'transparent',
}
*/

export default React.forwardRef(FormTextInput)
