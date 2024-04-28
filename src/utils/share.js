import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import { workout_template, program_template, app_template } from './templates'

export const shareWorkout = async (name, exercises) => {
	const html = workout_template(name, exercises)
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}

export const shareProgram = async (name, data) => {
	const html = program_template(name, data)
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}

export const share_app = async () => {
	const html = app_template()
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}
