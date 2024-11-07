/* eslint-disable no-unreachable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isFunction } from 'lodash'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, PanResponder, View } from 'react-native'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { NativeSafeAreaViewProps, Edges } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'

import CONST from '@src/CONST'
import type { AuthStackParamList, RootStackParamList } from '@navigation/types'
import * as Environment from '@libs/Environment'
import { selectOfflineStatus } from '@features/Network'
import useAppSelector from '@hooks/useAppSelector'
import ScreenLoader from '@components/ScreenLoader'
import useKeyboardState from '@hooks/useKeyboardState'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { RootState } from '@features/Store'
import { createSelector } from '@reduxjs/toolkit'

type _OgProps = NativeSafeAreaViewProps & {
	/** Whether to show the screen loader.  */
	isLoading?: boolean
}

type TailwindViewProps = Pick<ViewProps, 'className' | 'tw'>

type ScreenWrapperProps = _OgProps &
	TailwindViewProps & {
		/** Returns a function as a child to pass insets to or a node to render without insets */
		children?: React.ReactNode // React.FC<{didScreenTransitionEnd: boolean}>

		/** A unique ID to find the screen wrapper in tests */
		testID?: string

		/** Additional styles to add */
		style?: StyleProp<ViewStyle>

		className?: ViewProps['className']

		/** The behavior to pass to the SafeAreaView.
		 * @Default `padding`
		 */
		safeAreaMode?: 'padding' | 'margin'

		/** The behavior to pass to the SafeAreaView.
		 * @Default `["top", "bottom"]`
		 */
		safeAreaEdges?: Edges

		/** The behavior to pass to the KeyboardAvoidingView.
		 * @Default `padding`
		 */
		keyboardAvoidingViewBehavior?: 'padding' | 'height' | 'position'

		/** Whether to apply the app default horizontal padding style */
		shouldEnableHorizontalPadding?: boolean

		/** Whether KeyboardAvoidingView should be enabled.
		 * Use false for screens where this functionality is not necessary */
		shouldEnableKeyboardAvoidingView?: boolean

		/** Whether to dismiss keyboard before leaving a screen */
		shouldDismissKeyboardBeforeClose?: boolean

		/** Whether to show loading indicator */
		// shouldShowLoadingIndicator?: boolean

		/** Whether a pending query status will trigger the loading state. */
		shouldQueryTriggerLoading?: boolean

		/** Whether to show offline indicator */
		shouldShowOfflineIndicator?: boolean

		/** Called when navigated Screen's transition is finished. It does not fire when user exit the page. */
		onEntryTransitionEnd?: () => void

		/**
		 * The navigation prop is passed by the navigator and used to trigger the `onEntryTransitionEnd` callback when the screen transition ends.
		 * This is required because `transitionEnd` event doesn't trigger in the testing environment.
		 */
		navigation?: StackNavigationProp<RootStackParamList> | StackNavigationProp<AuthStackParamList>
	}

function ScreenWrapper(
	{
		// og props
		isLoading = false,
		mode = 'padding',
		edges = ['top', 'bottom'],

		// new props
		children,
		style,
		className,
		safeAreaMode = 'padding',
		safeAreaEdges = ['top', 'bottom'],
		keyboardAvoidingViewBehavior = 'padding',
		shouldEnableHorizontalPadding = false,
		shouldEnableKeyboardAvoidingView = false,
		shouldDismissKeyboardBeforeClose = true,
		// // shouldShowLoadingIndicator = true,
		shouldQueryTriggerLoading = true,
		shouldShowOfflineIndicator = true,
		onEntryTransitionEnd,
		navigation: navigationProp,
		testID,
		...props
	}: ScreenWrapperProps,
	ref: React.ForwardedRef<View>
) {
	const isFirstRender = useRef(true)
	const [didScreenTransitionEnd, setDidScreenTransitionEnd] = useState(false)

	const navigationFallback = useNavigation<StackNavigationProp<RootStackParamList>>()
	const navigation = navigationProp ?? navigationFallback

	// const isDevelopment = Environment.isDevelopment()
	// const isOffline = useAppSelector(selectOfflineStatus)

	const keyboardState = useKeyboardState()
	const isKeyboardShown = keyboardState?.isKeyboardShown ?? false
	const isKeyboardShownRef = useRef<boolean>(false)

	isKeyboardShownRef.current = keyboardState?.isKeyboardShown ?? false

	const keyboardDissmissPanResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponderCapture: (_e, gestureState) => {
				const isHorizontalSwipe = Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
				const isMobile = true // Browser.isMobile()
				const shouldDismissKeyboard = Boolean(shouldDismissKeyboardBeforeClose && isKeyboardShown && isMobile)
				return isHorizontalSwipe && shouldDismissKeyboard
			},
			onPanResponderGrant: Keyboard.dismiss,
		})
	).current

	useEffect(() => {
		return

		// On iOS, the transitionEnd event doesn't trigger some times. As such, we need to set a timeout
		const timeout = setTimeout(() => {
			setDidScreenTransitionEnd(true)
			onEntryTransitionEnd?.()
		}, CONST.SCREEN_TRANSITION_END_TIMEOUT)

		const unsubscribeTransitionEnd = navigation.addListener('transitionEnd', (event) => {
			// Prevent firing the prop callback when user is exiting the page.
			if (event?.data?.closing) {
				return
			}
			clearTimeout(timeout)
			setDidScreenTransitionEnd(true)
			onEntryTransitionEnd?.()
		})

		// We need to have this prop to remove keyboard before going away from the screen, to avoid previous screen look weird for a brief moment, also we need to have generic control in future - to prevent closing keyboard for some rare cases in which beforeRemove has limitations described here
		// https://reactnavigation.org/docs/preventing-going-back/#limitations
		const beforeRemoveSubscription = shouldDismissKeyboardBeforeClose
			? navigation.addListener('beforeRemove', () => {
					if (!isKeyboardShownRef.current) {
						return
					}
					Keyboard.dismiss()
			  })
			: undefined

		return () => {
			clearTimeout(timeout)
			unsubscribeTransitionEnd()
			if (beforeRemoveSubscription) {
				beforeRemoveSubscription()
			}
		}
		// Rule disabled because this effect is only for component did mount & will component unmount lifecycle event
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Loading indicator state
	const selectIsQueryPending = useMemo(() => {
		return createSelector(
			[
				(state: RootState) =>
					Object.values(state.api.queries).some((q) => {
						return q && !q.fulfilledTimeStamp && q.status === QueryStatus.pending
					}),
				(state, shouldTriggerLoad: boolean) => shouldTriggerLoad,
			],
			(isPending, shouldTriggerLoad) => shouldTriggerLoad && isPending
		)
	}, [])

	const isLoadingFromQuery = useAppSelector((state) => selectIsQueryPending(state, shouldQueryTriggerLoading))

	return (
		<View
			ref={ref}
			style={{ flex: 1 }}
			testID={testID}
		>
			<SafeAreaView
				style={{ flex: 1 }}
				mode={safeAreaMode}
				edges={safeAreaEdges}
				//className='border-2 border-yellow'
			>
				<View
					style={[
						{ flex: 1 },
						shouldEnableHorizontalPadding ? { paddingHorizontal: 20 } : {},
						style,
						//{borderWidth: 2, borderColor: '#f00'}
					]}
					className={className}
					// {...keyboardDissmissPanResponder.panHandlers}
					{...props}
				>
					<KeyboardAvoidingView
						style={{ width: '100%', height: '100%' }}
						behavior={keyboardAvoidingViewBehavior}
						enabled={shouldEnableKeyboardAvoidingView}
					>
						{children}
						{/* {isFunction(children) ? children({didScreenTransitionEnd}) : children} */}
					</KeyboardAvoidingView>
				</View>
			</SafeAreaView>
			{(isLoading || isLoadingFromQuery) && <ScreenLoader />}
		</View>
	)
}

ScreenWrapper.displayName = 'ScreenWrapper'

export default forwardRef(ScreenWrapper)
export type { ScreenWrapperProps }
