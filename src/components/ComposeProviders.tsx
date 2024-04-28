import React, { ComponentType, ReactNode } from 'react'
import ChildrenProps from '@src/types/utils/ChildrenProps'

type ComposeProvidersProps = ChildrenProps & {
	components: Array<ComponentType<ChildrenProps>>
}

function ComposeProviders(props: ComposeProvidersProps): ReactNode {
	return props.components.reduceRight(
		(AccProviders, CurrentProvider) => <CurrentProvider>{AccProviders}</CurrentProvider>,
		props.children
	)
}

ComposeProviders.displayName = 'ComposeProviders'

export default ComposeProviders
