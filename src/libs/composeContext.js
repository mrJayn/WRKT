import React, { useReducer, createContext, useContext } from 'react'

const composeContext = (reducer, action, defaultValue) => {
	const Context = createContext()

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, defaultValue)

		const boundActions = {}

		for (let key in action) {
			boundActions[key] = action[key](dispatch)
		}

		return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
	}

	const useProviderContext = () => {
		const value = useContext(Context)
		if (value === null) {
			const providerName = value.name || 'Provider'
			throw new Error(`use${providerName}Context must be used within a ${providerName} Provider.`)
		}
		return value
	}

	return [Context, Provider, useProviderContext]
}

export default composeContext
// https://github.com/Cerwyn/react-native-authentication-with-context/blob/master/src/context/createDataContext.js
