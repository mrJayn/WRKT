import React, { createContext } from 'react'
import type { NavigationPartialRoute, TabsNavigatorParamList } from '@navigation/types'

type ActiveRouteContextType = NavigationPartialRoute<keyof TabsNavigatorParamList> | undefined

const ActiveRouteContext = createContext<ActiveRouteContextType>(undefined)

export default ActiveRouteContext
