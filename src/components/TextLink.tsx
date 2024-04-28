import React from 'react'
import { Link } from '@react-navigation/native'

function TextLink({ to, action, children, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
	return (
		<Link
			to={to}
			action={action}
			suppressHighlighting
			{...props}
		>
			{children}
		</Link>
	)
}

TextLink.displayName = 'TextLink'

export default TextLink
