import API from '@features/API'

const networkAPI = API.injectEndpoints({
	endpoints: (builder) => ({
		/** Method to test the connection between the frontend and backend. */
		// checkNetworkConnection: builder.query<{ isOffline: boolean }, void>({
		// 	queryFn: async () => {
		// 		const isOffline = await NetworkConnection.getCurrentOfflineStatus()
		// 		return { data: { isOffline } }
		// 	},
		// }),

		/** Method to test the connection between the frontend and backend. */
		getBackendReachability: builder.query<boolean, void>({
			query: () => 'ping',
			providesTags: () => ['Network'],
			transformResponse: () => true,
			transformErrorResponse: () => false,
			extraOptions: {
				maxRetries: 5,
				validateStatus: (status) => status === 200,
			},
		}),
	}),
})

export const { useGetBackendReachabilityQuery } = networkAPI
export default networkAPI
