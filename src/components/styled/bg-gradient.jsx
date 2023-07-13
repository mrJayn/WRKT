import { LinearGradient } from 'expo-linear-gradient';
import { colors } from 'twColors';

const BgGradient = ({ top = colors.darkgreen[60], bottom = colors.warmblack }) => {
	return <LinearGradient colors={[top, bottom]} className='absolute top-0 left-0 h-full w-full z-0' />;
};
export default BgGradient;
