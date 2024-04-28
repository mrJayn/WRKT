import { useState, useEffect, createContext, useContext } from 'react'
import { getAPI } from '@api/api-services'

const ContentContext = createContext(null)
const ContentProvider = ({ children }) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		async function loadUser() {
			const user = await getAPI({ route: 'user' })
			const profile = await getAPI({ route: 'profile' })
			setData({ user, profile })
		}
		loadUser()
	}, [])

	if (data == null) {
		return null
	}

	return <ContentContext.Provider value={data}>{children}</ContentContext.Provider>
}

function useContent() {
	const value = useContext(ContentContext)
	if (!value || value === undefined) {
		throw new Error('useContent must be used within a ContentProvider.')
	}
	return value
}

export default ContentProvider
export { useContent }
