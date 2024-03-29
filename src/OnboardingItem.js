import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	useWindowDimensions,
} from 'react-native';

export default function OnboardingItem({ item }) {
	const { width } = useWindowDimensions();

	return (
		<View style={[styles.container, { width }]}>
			<Image
				source={item.image}
				style={[styles.image, { width, resizeMode: 'contain' }]}
			/>
			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 28,
		marginTop: 10,
		color: '#FF7500',
		textAlign: 'center',
	},
	description: {
		fontWeight: '500',
		fontSize: 22,
		color: '#000000',
		maxWidth: 380,
		textAlign: 'center',
		paddingTop: 10,
	},
});
