import { useAuthenticateQuery } from '@features/auth/authApi'

type AuthProviderProps = { children: React.ReactNode }

function AuthProvider({ children }: AuthProviderProps) {
	const { isUninitialized, isLoading } = useAuthenticateQuery()

	/*
	const { isLoading } = useGetBackendReachabilityQuery(undefined, {
		pollingInterval: 60 * 1000, // 60s
		skipPollingIfUnfocused: true,
		// refetchOnReconnect: true,
		// refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	})
	*/

	if (isUninitialized || isLoading) {
		return null
	}

	return children
}

AuthProvider.displayName = 'AuthProvider'

export default AuthProvider
