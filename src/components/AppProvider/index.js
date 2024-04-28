import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import Store from '@features/Store'
import { getVerifiedTokens } from '@api/auth'
import { updateAuthToken } from '@features/auth'

/*
** MiddleWare **
These features allow us to extend the functionality of Redux in our application. 
Middleware sits between the dispatch action and the reducer. 
This means we can perform a different function before the dispatch reaches the reducer.
*/

function AppProvider(props) {
	const [storeReady, setStoreReady] = useState(false)

	useEffect(() => {
		const checkAuthorization = async () => {
			const tokenPair = await getVerifiedTokens()

			if (tokenPair) {
				Store.dispatch(updateAuthToken({ token: tokenPair.access }))
			}

			setStoreReady(true)
		}

		checkAuthorization()
	}, [])

	if (!storeReady) {
		return null
	}

	return <Provider store={Store}>{props.children}</Provider>
}

export default AppProvider
