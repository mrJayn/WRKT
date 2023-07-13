import { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import P from '../styled/p-tag';

const EditableExercise = ({ i, ...data }) => {
	const [name, setName] = useState(data.name);
	const [set1, setSet1] = useState(data.set1);
	const [set2, setSet2] = useState(data.set2);
	const [set3, setSet3] = useState(data.set3);
	const [weight1, setWeight1] = useState(data.weight1);
	const [weight2, setWeight2] = useState(data.weight2);
	const [weight3, setWeight3] = useState(data.weight3);

	const inputStyles = 'text-[17px] border-[1px] p-[3px] my-[1px]';

	/*
    // Create an endpoint that supports receiving multiple items, instead of just one

    const hasChanged = name !== data.name || set1 !== data.set1 || set2 !== data.set2 || set3 !== data.set3 || weight1 !== data.weight1 || weight2 !== data.weight2 || weight3 !== data.weight3;

	const handleSubmit = async () => {
		fetch(`${BACKEND_URL}/api/exercises/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
				set1: set1,
				set2: set2,
				set3: set3,
				weight1: weight1,
				weight2: weight2,
				weight3: weight3,
			}),
		})
			.then((response) => response.json())
			.then((res) => {
				if (res.status === 200) {
					console.log('Success-------');
					nav.goBack();
				} else {
					console.log('Err-------');
				}
			})
			.catch((err) => console.log('--ERROR', err));
	};
    */

	return (
		<View className='flex-row p-1 gap-x-1 '>
			<P>{`${i}. `}</P>
			<View className='flex-[0.45]'>
				<TextInput className={inputStyles} value={name} onChangeText={setName} placeholder='New Exercise' />
			</View>
			<View className='flex-[0.35]'>
				<TextInput className={inputStyles} value={set1} onChangeText={setSet1} />
				<TextInput className={inputStyles} value={set2} onChangeText={setSet2} />
				<TextInput className={inputStyles} value={set3} onChangeText={setSet3} />
			</View>
			<View className='flex-[0.2]'>
				<TextInput className={inputStyles} value={weight1} onChangeText={setWeight1} />
				<TextInput className={inputStyles} value={weight2} onChangeText={setWeight2} />
				<TextInput className={inputStyles} value={weight3} onChangeText={setWeight3} />
			</View>
		</View>
	);
};

export default EditableExercise;
