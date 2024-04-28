import { ForeignKey } from '../utils'

type Workout = {
	id: number
	profile: ForeignKey
	name: string
	is_active: boolean
	order: number
}

export default Workout
