import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@features/Store'

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
