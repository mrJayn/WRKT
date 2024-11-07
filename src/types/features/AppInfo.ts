type AppInfo = {
	/** Whether the application is a beta build. */
	isInBeta: boolean

	/** Whether a new update is available and ready to install. */
	isUpdateAvailable: boolean

	/** True when the user must update to the latest minimum version of the app */
	updateRequired: boolean

	/** Last visited path in the app */
	lastVisitedPath?: string | undefined
}

export type { AppInfo }
