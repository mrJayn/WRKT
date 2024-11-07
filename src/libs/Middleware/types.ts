import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { ListenerMiddlewareInstance, CreateListenerMiddlewareOptions } from '@reduxjs/toolkit'
import type { RootState } from '@features/Store'

type Middleware = typeof createListenerMiddleware

export default Middleware
