import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'

const getPrevRouteName = () => {
	const { getState } = useNavigation()
	const { routes } = getState()
	const prevRouteName = routes[routes.length - 2]
	return _.isString(prevRouteName) && prevRouteName
}

export default getPrevRouteName
