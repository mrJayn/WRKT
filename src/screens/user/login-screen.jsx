import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { colors } from 'twColors';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { save } from '@api/store';
import { BgGradient } from '@components';
import { GH_URL, OBTAIN_TOKEN_PATH } from 'src/config';

import axios from 'axios';
import axiosClient from '@api/axiosClient';

const LoginScreen = ({ setDidLogin }) => {
	const nav = useNavigation();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPW, setShowPW] = useState(false);
	const [errors, setErrors] = useState({ username: false, password: false, invalid: false });

	const handleForgotPw = () => {
		nav.navigate('ForgotPw');
	};
	const handleSignUp = () => {
		nav.navigate('SignUp');
	};
	const goToSite = () => Linking.openURL(GH_URL);
	const removeErrors = () => setErrors({ username: false, password: false, invalid: false });
	//=====================

	const handleLogin = async () => {
		removeErrors();
		if (!username) return setErrors({ ...errors, username: true });
		if (!password) return setErrors({ ...errors, password: true });

		// axiosClient.post(OBTAIN_TOKEN_PATH,{ username: username, password: password })
		// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/

		fetch(OBTAIN_TOKEN_PATH, {
			method: 'POST',
			body: JSON.stringify({ username: username, password: password }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => response.json())
			.then((res) => {
				if (res) {
					console.log('Login \n', res);

					setDidLogin(true);
					//save('USER_TOKEN', res);
					//axios.defaults.headers.common["Authorization"] = res["refresh"]
				} else {
					setErrors({
						...errors,
						invalid: true,
					});
				}
			})
			.catch((err) => console.error(err));
	};
	// ===========

	return (
		<View className='full z-1 bg-black'>
			<BgGradient top={colors.darkgreen[90]} bottom={`${colors.warmblack}80`} />
			{/* Site Link*/}
			<Pressable style={styles.extLink} onPress={goToSite}>
				<MaterialCommunityIcons name='launch' size={24} color={colors['font-light']} />
			</Pressable>
			<ScrollView contentContainerStyle={styles.container} scrollEnabled={false} keyboardShouldPersistTaps='never'>
				{/* Title*/}
				<Text style={styles.title}>SIGN IN</Text>
				{/* Username/Email & Password */}
				<View style={{ borderColor: errors.username ? '#f00' : '#000', ...styles.inputWrap }}>
					<TextInput style={styles.input} value={username} onChangeText={setUsername} onFocus={removeErrors} placeholder='Email / User' placeholderTextColor='#fff8' />
				</View>
				<View style={{ borderColor: errors.password ? '#f00' : '#000', ...styles.inputWrap }}>
					<TextInput value={password} onChangeText={setPassword} onFocus={removeErrors} secureTextEntry={!showPW} style={styles.input} placeholder='Password' placeholderTextColor='#fff8' />
					<Pressable style={[styles.eyeBtn]} onPress={() => setShowPW(!showPW)}>
						<MaterialCommunityIcons name={showPW ? 'eye-off' : 'eye'} size={24} color={showPW ? 'red' : 'white'} />
					</Pressable>
				</View>
				{/*  Login Btn  */}
				<TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
					<Text style={styles.loginText}>LOGIN</Text>
				</TouchableOpacity>
				{/*  ForgotPW / SignUp Options  */}
				<View style={{ alignItems: 'center' }}>
					<TouchableOpacity onPress={handleForgotPw}>
						<Text style={[styles.optionsText]}>Forgot Password?</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={handleSignUp}>
						<Text style={[styles.optionsText]}>Signup</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		rowGap: 20,
		zIndex: 1,
	},
	title: {
		color: colors.slate[40],
		fontSize: 60,
		fontWeight: 'bold',
		lineHeight: 60,
	},
	inputWrap: {
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around ',
		alignItems: 'center',
		backgroundColor: colors.grey.DEFAULT,
		borderRadius: 25,
		height: 50,
		padding: 20,
		borderWidth: 2,
	},
	input: {
		height: 50,
		flex: 1,
		color: 'white',
	},
	eyeBtn: {
		position: 'absolute',
		right: 5,
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginBtn: {
		width: '60%',
		backgroundColor: colors.slate['neon'],
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	loginText: {
		fontSize: 28,
		fontWeight: 500,
		letterSpacing: 2,
	},
	optionsText: {
		padding: 10,
		color: 'white',
	},
	extLink: {
		position: 'absolute',
		top: 50,
		right: 15,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 999,
		height: 48,
		width: 48,
		backgroundColor: colors['btn-bg'],
	},
});

export default LoginScreen;
