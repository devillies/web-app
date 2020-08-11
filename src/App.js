import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const row = [
	'q',
	'w',
	'e',
	'r',
	't',
	'y',
	'u',
	'i',
	'o',
	'p',
	'a',
	's',
	'd',
	'f',
	'g',
	'h',
	'j',
	'k',
	'l',
	'z',
	'x',
	'c',
	'v',
	'b',
	'n',
	'm',
];
function App() {
	let [text, setText] = useState('');
	let [keyValue, setKeyValue] = useState(null);
	let [bigText, setBigText] = useState('');
	let [isUpperCase, setIsUppercase] = useState(false);

	let renderedRow = isUpperCase ? row.join('').toUpperCase().split('') : row;

	//function to filter curseword base on curse word list
	// _filterbadWords = (words) => {
	// 	badWords
	// 	let wordsList = words.split(" ");

	// 	return wordsList
	// 	  .map(word => {
	// 		if (badWords.includes(word.toLocaleLowerCase())) {
	// 		  return word
	// 			.split("")
	// 			.map(w => "*")
	// 			.join("");
	// 		}
	// 		return word;
	// 	  })
	// 	  .join(" ");
	//   };

	const _keyDown = ({ key }) => {
		switch (key) {
			case 'Backspace': {
				setText(text.slice(0, -1));
				return;
			}
			case 'Control': {
				return;
			}
			case 'Alt': {
				return;
			}
			case 'Shift': {
				setIsUppercase(true);
				return;
			}
			case 'CapsLock': {
				setIsUppercase(!isUpperCase);
				return;
			}
			case 'NumLock': {
				return;
			}
			case 'Enter': {
				setBigText(text);
				return;
			}
			default: {
				setText(text + key);
				setKeyValue(key);
				return;
			}
		}
	};
	const _keyUp = ({ key }) => {
		switch (key) {
			case 'Shift': {
				setIsUppercase(false);
				return;
			}
			default: {
				setKeyValue(null);
				return;
			}
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', _keyDown);
		document.addEventListener('keyup', _keyUp);

		return () => {
			document.removeEventListener('keydown', _keyDown);
			document.removeEventListener('keyup', _keyUp);
		};
	}, [text, isUpperCase]);
	const _renderKey = (key) => {
		let isTouched = String(keyValue).toLowerCase() === key;

		return (
			<TouchableOpacity key={key}>
				<View
					style={[
						styles.keyStyle,
						isTouched ? styles.redBackground : styles.blackBackground,
					]}>
					<Text style={styles.textColor}>{key}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: 'bold' }}>
				{bigText}
			</Text>
			<View style={styles.textContainer}>
				<Text style={styles.textStyle}> {text}</Text>
			</View>
			<View style={styles.keyboardStyle}>
				{renderedRow.map((key) => _renderKey(key))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		borderWidth: 1,
		alignSelf: 'stretch',
	},
	textStyle: {
		alignSelf: 'center',
	},

	textColor: {
		color: '#ffff',
	},
	keyboardStyle: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		maxWidth: 610,
	},
	keyStyle: {
		borderWidth: 1,
		height: 40,
		width: 60,
		margin: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
	blackBackground: {
		backgroundColor: 'black',
	},
	redBackground: {
		backgroundColor: 'red',
	},
	buttonContainer: {
		flexDirection: 'row',
		paddingHorizontal: 20,
	},
});
export default App;
