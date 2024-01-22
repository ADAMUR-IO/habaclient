import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function SocialButtons() {
	// Set an initializing state whilst Firebase connects
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();

	GoogleSignin.configure({
		webClientId:
			'1016305559462-j9se7u3e2us8ja7imputu2kfbj69246a.apps.googleusercontent.com',
	});

	// Handle user state changes
	function onAuthStateChanged(user) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const onGoogleButtonPress = async () => {
		// Check if your device supports Google Play
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		const user_sign_in = auth().signInWithCredential(googleCredential);
		user_sign_in
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const signOut = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await auth().signOut();
		} catch (error) {
			console.log(error);
		}
	};

	if (initializing) return null;

	const loginWithFacebook = () => {
		console.log('Facebook');
	};

	if (!user) {
		return (
			<View style={styles.container}>
				<>
					<GoogleSigninButton
						name="Google"
						style={{
							width: 150,
							height: 55,
							marginRight: 20,
						}}
						onPress={onGoogleButtonPress}
					/>

					<TouchableOpacity onPress={loginWithFacebook}>
						<View style={[styles.socialButton, styles.fbButton]}>
							<FontAwesome
								name="facebook"
								color="white"
								size={21}
							/>
							<Text
								style={{
									color: 'white',
									fontSize: 22,
									fontWeight: 'bold',
									paddingLeft: 5,
								}}
							>
								Facebook
							</Text>
						</View>
					</TouchableOpacity>
				</>
			</View>
		);
	}
	return (
		<View style={{ flex: 1, borderColor: '#fff', alignItems: 'center' }}>
			<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
				Welcome, {user.displayName}
			</Text>
			<Image
				source={{ uri: user.photoURL }}
				style={{
					height: 100,
					width: 100,
					borderRadius: 50,
					margin: 10,
				}}
			/>
			<Button
				title="Sign Out"
				onPress={signOut}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.3,
		flexDirection: 'row',
	},
	socialButton: {
		width: 150,
		height: 55,
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 20,
		alignItems: 'center',
		fontSize: 30,
		paddingLeft: 20,
	},
	gButton: {
		marginRight: 20,
	},
	fbButton: {
		backgroundColor: '#4368C7',
		marginLeft: 20,
	},
});
