import { ForeignKey, WeekdayIndex } from '../utils'

type WeightUnits = 'lbs' | 'kgs'

type Profile = {
	id: number
	user: ForeignKey
	notifications: boolean
	day_one_wkday: WeekdayIndex
	units: WeightUnits
}

export default Profile

export type { Profile, WeightUnits }
