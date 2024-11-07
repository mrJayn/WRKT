import { retry } from '@reduxjs/toolkit/query'
import axiosBaseQuery from './axiosBaseQuery'

/**
 * The main `baseQuery` for RTK Query.
 */
const baseQuery = retry(axiosBaseQuery(), { maxRetries: 3 })

export default baseQuery
