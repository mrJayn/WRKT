import { Descriptor, NavigationHelpers, RouteProp, TabNavigationState } from '@react-navigation/native'
import type {
	BottomTabBarProps,
	BottomTabNavigationEventMap,
	BottomTabNavigationOptions,
	BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { TabsNavigatorParamList } from '@navigation/types'

type TabDescriptor<RouteName extends keyof TabsNavigatorParamList> = Descriptor<
	BottomTabNavigationOptions,
	BottomTabNavigationProp<TabsNavigatorParamList, RouteName>,
	RouteProp<TabsNavigatorParamList, RouteName>
>

type TabDescriptorsMap = {
	[RouteName in keyof TabsNavigatorParamList]: TabDescriptor<RouteName>
}

type TabBarProps = Pick<BottomTabBarProps, 'insets'> & {
	state: TabNavigationState<TabsNavigatorParamList>
	navigation: NavigationHelpers<TabsNavigatorParamList, BottomTabNavigationEventMap>
	descriptors: TabDescriptorsMap
}

export type { TabBarProps }
