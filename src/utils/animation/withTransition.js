import CONST from '@src/CONST'

const { TIMING_CONFIG, SPRING_CONFIG } = CONST.ANIMATION

function withTransition(layoutAnimation) {
	if (String(layoutAnimation.name).includes('Out')) {
		return layoutAnimation.duration(TIMING_CONFIG.duration).easing(TIMING_CONFIG.easing)
	}

	return layoutAnimation
		.springify()
		.damping(SPRING_CONFIG.damping)
		.stiffness(SPRING_CONFIG.stiffness)
		.mass(SPRING_CONFIG.mass)
		.overshootClamping(SPRING_CONFIG.overshootClamping)
		.restDisplacementThreshold(SPRING_CONFIG.restDisplacementThreshold)
		.restSpeedThreshold(SPRING_CONFIG.restSpeedThreshold)
}

export default withTransition
