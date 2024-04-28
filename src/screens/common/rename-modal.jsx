import { View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { ModalScreen, H, P } from 'src/components/base'

const RenameModal = ({ title, save, cancel, inputVal, setInputVal }) => {
	return (
		<ModalScreen>
			{/* 
				<View 
					className='absolute inset-0 items-center z-5 bg-black/40'
					entering={overlayEnter}
					exiting={overlayExit}
				/> 
			*/}
			<Animated.View
				className='centered absolute top-1/4 w-[85%] p-3 pb-12 bg-grey-5 rounded-xl shadow-sm shadow-black/50'
				// entering={modalEnter}
				// exiting={modalExit}
			>
				<H className='text-black text-2xl font-inter-semibold'>{`Rename ${
					title.endsWith('s') ? title.slice(0, -1) : title
				}`}</H>

				<View className='w-full justify-center my-4 p-1 border-[1px] border-grey-20 bg-white rounded'>
					<TextInput
						value={inputVal}
						onChangeText={setInputVal}
						className='font-inter text-lg'
						autoFocus={true}
					/>
					<TouchableOpacity
						containerStyle={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 25 }}
						className='absolute h-full min-w-full centered'
						onPress={() => setInputVal('')}
					>
						<Ionicons {...{ name: 'close-circle', size: 20, color: '#333' }} />
					</TouchableOpacity>
				</View>

				<View className='h-10 absolute inset-x-0 bottom-0 flex-row bg-grey-15 rounded-b-xl overflow-hidden'>
					{Object.entries({ cancel, save }).map(([text, onPress], idx) => (
						<TouchableOpacity
							key={text}
							containerStyle={{ flex: 1, margin: 1 }}
							onPress={onPress}
						>
							<View className='centered h-full min-w-full bg-grey-5'>
								<P className={`text-xl ${{ 0: 'text-red', 1: ' text-darkgreen-neon' }[idx]}`}>{text}</P>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</Animated.View>
		</ModalScreen>
	)
}

export default RenameModal
