import 'react-native-gesture-handler'
import '@libs/yupMethods'

import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import ComposeProviders from '@components/providers/ComposeProviders'
import StoreProvider from '@components/providers/StoreProvider'
import AuthProvider from '@components/providers/AuthProvider'
import AssetsProvider from '@components/providers/AssetsProvider'
import ThemeProvider from '@components/providers/ThemeProvider'
import SafeArea from '@components/SafeArea'
import LinearGradientView from '@components/LinearGradientView'
import Wrkt from './Wrkt'

ExpoSplashScreen.preventAutoHideAsync().catch(() => null)

function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ComposeProviders
				components={[
					StoreProvider,
					AuthProvider,
					AssetsProvider,
					SafeAreaProvider,
					ThemeProvider,
					SafeArea,
					//
				]}
			>
				<LinearGradientView name='primary' />
				<StatusBar style='auto' />
				<Wrkt />
			</ComposeProviders>
		</GestureHandlerRootView>
	)
}

App.displayName = 'App'

export default App
