import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import type { Exercise, Week } from '@src/types/features'

const shareWorkout = async (name: string, exercises: readonly Exercise[]) => {
	const html = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
<h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
  ${name}
</h1>
${exercises.map(({ name, sets }) => {
	return `<div>
    <p style="font-size: 18px; font-weight: semibold;">
    ${name}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets?.[0].sets} x ${sets?.[0].reps}  |  ${sets?.[0].weight}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets?.[1].sets} x ${sets?.[1].reps}  |  ${sets?.[1].weight}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets?.[2].sets} x ${sets?.[2].reps}  |  ${sets?.[2].weight}
      </p>
  </div>`
})}
</body>
</html>
`
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}

const shareProgram = async (name: string, weeks: readonly Week[]) => {
	const html = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
<h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
  ${name}
</h1>
${weeks.map(({ week_id }) => {
	return `<div>
    <p style="font-size: 18px; font-weight: semibold;">
    Week ${week_id}
      </p>
  </div>`
})}
</body>
</html>
`
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}

const share_app = async () => {
	const html = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
<h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
WRKT
</h1>

</body>
</html>
`
	const { uri } = await Print.printToFileAsync({ html })
	await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}

export { shareWorkout, shareProgram, share_app }
