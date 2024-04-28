import ForeignKey from '../utils/ForeignKey'

type Week = {
	id: number
	program: ForeignKey
	week_id: number
}

export default Week
