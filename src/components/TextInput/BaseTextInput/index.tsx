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
import type { BaseTextInputProps, BaseTextInputRef } from './types'
import TextInputLabel from '../TextInputLabel'

const TEXT_INPUT_AUTO_FOCUS_DELAY = 400

const BaseTextInput = (
	{
		label,
		forceLabelActive,
		isError,
		isLoading,
		isValid,
		autoFocusDelay = TEXT_INPUT_AUTO_FOCUS_DELAY,
		containerClassName,
		containerStyle,

		/** text input props */
		value = undefined,
		defaultValue = undefined,
		autoComplete,
		autoCorrect, // defaults to true
		autoFocus, // defaults to false
		className,
		keyboardType,
		placeholder = undefined,
		returnKeyType,
		returnKeyLabel,
		secureTextEntry,
		textContentType,
		...props
	}: BaseTextInputProps,
	ref: React.ForwardedRef<BaseTextInputRef>
) => {
	const initialValue = String(value || defaultValue || '')

	const input = useRef<TextInput | null>(null)
	const hasValueRef = useRef(initialValue.length > 0)

	const [isFocused, setIsFocused] = useState(false)
	const [passwordHidden, setPasswordHidden] = useState(secureTextEntry)

	const navigation = useNavigation()
	const colorScheme = useThemePreference()

	// const initialActiveLabel = Boolean(!!forceLabelActive || initialValue.length > 0)
	const isLabelActiveSV = useSharedValue(Boolean(!!forceLabelActive || initialValue.length > 0))
	const focusSV = useSharedValue(false) // autoFocus

	const hasValue = Boolean((value ?? '').length > 0 || hasValueRef.current)

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

	/**  Set the `isLabelActive` shared value.  */
	useEffect(() => {
		let _active = hasValue || isFocused
		if (forceLabelActive || _active !== isLabelActiveSV.value) {
			return // `forceLabelActive` is true, or shared value has already updated.
		}
		isLabelActiveSV.value = _active
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasValue, isFocused, forceLabelActive])

	/**  Set the `hasValueRef` when the value is cleared externally.  */
	useEffect(() => {
		if (value === undefined || value) {
			return // component is uncontrolled, or input has value.
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
		<View
			className={`full justify-center ${containerClassName}`}
			style={containerStyle}
		>
			{!!label && (
				<TextInputLabel
					label={label}
					isLabelActiveSV={isLabelActiveSV}
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
				autoComplete={autoCompleteValue}
				autoCorrect={secureTextEntry ? false : autoCorrect}
				className={`full text-base font-inter-regular text-tint-primary-light dark:text-tint-primary-dark ${
					className || ''
				}`}
				keyboardType={keyboardTypeValue}
				keyboardAppearance={colorScheme} // android
				placeholder={isFocused || !Boolean(label?.length) ? placeholder : undefined}
				placeholderTextColor={colors.tint.tertiary[colorScheme]}
				returnKeyType={returnKeyType || 'default'}
				returnKeyLabel={returnKeyLabel || returnKeyType || undefined} // android
				secureTextEntry={passwordHidden}
				textContentType={textContentTypeValue} // ios
				underlineColorAndroid={colors.transparent}
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
		</View>
	)
}

export default React.forwardRef(BaseTextInput)
