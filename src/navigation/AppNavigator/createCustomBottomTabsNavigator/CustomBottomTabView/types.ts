import type { ParamListBase, TabNavigationState } from '@react-navigation/native'
import type {
	BottomTabDescriptorMap,
	BottomTabNavigationConfig,
	BottomTabNavigationHelpers,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'

type CustomBottomTabViewProps = BottomTabNavigationConfig & {
	state: TabNavigationState<ParamListBase>
	navigation: BottomTabNavigationHelpers
	descriptors: BottomTabDescriptorMap
}

export type { CustomBottomTabViewProps }
