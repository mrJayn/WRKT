import 'react-native-gesture-handler'

import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
//
import '@libs/yupMethods'
import AssetsProvider from '@components/AssetsProvider'
import AppProvider from '@components/AppProvider'
import ComposeProviders from '@components/ComposeProviders'
import LinearGradientBackground from '@components/LinearGradientView'
import StatusBar from '@components/StatusBar'
import Wrkt from './Wrkt'

SplashScreen.preventAutoHideAsync().catch(() => null)

/* Providers
 Onyx ( App / Store / Root )
 AssetsProvider
 SafeAreaProvider
 
 -- ??? --
 IosSafeArea 
 PortalProvider
*/

const App = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ComposeProviders
				components={[
					AppProvider,
					AssetsProvider,
					SafeAreaProvider,
					//
				]}
			>
				<LinearGradientBackground name='primary' />
				<StatusBar />
				<Wrkt />
			</ComposeProviders>
		</GestureHandlerRootView>
	)
}

export default App
