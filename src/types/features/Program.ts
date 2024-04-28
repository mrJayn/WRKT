import ForeignKey from '../utils/ForeignKey'

type Program = {
	profile: ForeignKey
	id: number
	name: string
	startdate: string
	duration: number
	active: boolean
	order: number
}

export default Program
