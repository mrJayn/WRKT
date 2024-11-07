import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedStopListening, TypedAddListener } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '@features/Store'

const { middleware, ...methods } = createListenerMiddleware()

// Type the listener instance methods.
const startStoreListening = methods.startListening as TypedStartListening<RootState, AppDispatch>
const stopStoreListening = methods.stopListening as TypedStopListening<RootState, AppDispatch>
const clearStoreListeners = methods.clearListeners

const addStoreListener = addListener as TypedAddListener<RootState, AppDispatch>

export default middleware
export { startStoreListening, stopStoreListening, clearStoreListeners, addStoreListener }
