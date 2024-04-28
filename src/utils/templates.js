export const workout_template = (name, exercises) => `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
<h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
  ${name}
</h1>
${exercises.map(({ name, sets_data }) => {
	return `<div>
    <p style="font-size: 18px; font-weight: semibold;">
    ${name}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets_data.s1.sets} x ${sets_data.s1.reps}  |  ${sets_data.s1.weight}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets_data.s2.sets} x ${sets_data.s2.reps}  |  ${sets_data.s2.weight}
      </p>
      <p style="font-size: 16px; font-weight: normal;">
      ${sets_data.s3.sets} x ${sets_data.s3.reps}  |  ${sets_data.s3.weight}
      </p>
  </div>`
})}
</body>
</html>
`

export const program_template = (name, data) => `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
</head>
<body style="text-align: center;">
<h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
  ${name}
</h1>
${data.map(({ name }) => {
	return `<div>
    <p style="font-size: 18px; font-weight: semibold;">
    ${name}
      </p>
  </div>`
})}
</body>
</html>
`

export const app_template = () => `
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
