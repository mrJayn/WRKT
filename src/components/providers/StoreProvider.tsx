import React from 'react'
import { Provider } from 'react-redux'
import Store from '@features/Store'

type StoreProviderProps = { children: React.ReactNode }

function StoreProvider({ children }: StoreProviderProps) {
	return <Provider store={Store}>{children}</Provider>
}

StoreProvider.displayName = 'StoreProvider'

export default StoreProvider
