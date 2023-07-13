import { useEffect, useState } from 'react';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';
import { ExercisesList } from '@components';
import { EXERCISES_PATH } from '@config';
import { DUMMY_DATA } from '@data/dummy';
import axios from 'axios';
import axiosClient from '@api/axiosClient';

const fadeIn = FadeIn.delay(500).duration(750).easing(Easing.in(Easing.ease));

const MainScreen = () => {
	const [data, setData] = useState(DUMMY_DATA['api.exercises']);
	const [refresh, setRefresh] = useState(false);
	const currWeekday = String(new Date().getDay());

	async function get_exs() {
		fetch(EXERCISES_PATH)
			.then((res) => res.json())
			.then((json) => {
				let today = json.filter(({ day }) => day === currWeekday);
				setData(today);
			})
			.catch((err) => null);
	}

	useEffect(() => {
		async function get_todays_exercises() {
			axiosClient
				.get(EXERCISES_PATH)
				.then(({ data }) => setData(data.filter(({ day }) => day === currWeekday)))
				.catch((err) => console.log('main-screen ==>', err));
		}

		get_todays_exercises();
	}, [refresh]);

	return (
		<Animated.View enter={fadeIn} className='min-h-full'>
			<ExercisesList data={data} onRefresh={() => setRefresh(!refresh)} editable={false} />
		</Animated.View>
	);
};

export default MainScreen;
