import { RootStackParamList } from '@navigation/types'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

export default function useRootNavigation() {
	const navigation = useNavigation()

	let root: NavigationProp<ParamListBase> = navigation
	let current: NavigationProp<ParamListBase> | undefined

	while ((current = root.getParent())) {
		root = current
	}

	return root as NavigationProp<RootStackParamList>
}
