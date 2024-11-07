import { I18nManager } from 'react-native'
import * as Device from '@libs/Device'

export default function () {
	Device.setDeviceID()

	// Force device layout to be in `ltr` mode. The current design does not support `rtl`.
	I18nManager.allowRTL(false)
	I18nManager.forceRTL(false)

	// console.log(`[AppSetup] done.`)
}
