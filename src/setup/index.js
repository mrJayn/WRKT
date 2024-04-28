export default function () {
	/*
	 * Initialize the Redux store when the app loads for the first time.
	 *
	 * Note: This initialization has been very intentionally placed completely outside of the React lifecycle of the main App component.
	 *
	 * To understand why we must do this, you must first understand that a typical React Native Android application consists of an Application and an Activity.
	 * The project root's index.js runs in the Application, but the main RN `App` component + UI runs in a separate Activity, spawned when you call AppRegistry.registerComponent.
	 * When an application launches in a headless JS context (i.e: when woken from a killed state by a push notification), only the Application is available, but not the UI Activity.
	 * This means that in a headless context NO REACT CODE IS EXECUTED, and none of your components will mount.
	 *
	 * However, we still need to use Onyx to update the underlying app data from the headless JS context.
	 * Therefore it must be initialized completely outside the React component lifecycle.
	 */
	//
	//
	//console.log('App setup complete.')
}
