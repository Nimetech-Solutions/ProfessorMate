import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back button
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background

export default function QuestionScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValue] = useState(new Animated.Value(1)); // For scaling animation

  const options = [
    "Basic Level",
    "Intermediate Level",
    "Advanced Level",
  ];

  const handlePressIn = () => {
    Animated.timing(animationValue, {
      toValue: 0.98,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleContinue = () => {
    if (selectedOption === "Basic Level") {
      navigation.navigate('BasicLevelInfoScreen');
    } 
    else if (selectedOption === "Intermediate Level") {
      navigation.navigate('PronounsScreen');
    }
    else if (selectedOption === "Advanced Level") {
      navigation.navigate('Qs');
    }
    else {
      // Default navigation if somehow no option is selected
      navigation.navigate('AlphabetScreen');
    }
  };

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]} // Gradient background
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.questionText}>How much do you know English?</Text>
      
      {/* Options List */}
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => {
            setSelectedOption(option);
          }}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Continue Button */}
      <Animated.View style={{ transform: [{ scale: animationValue }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            !selectedOption && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedOption}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent background for the button
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White text for contrast on the gradient background
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  selectedOption: {
    backgroundColor: '#cce7ff',
    borderColor: '#007AFF',
    borderWidth: 1.5,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 70,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8, // For Android shadow
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#80bdff', // Lighter blue for disabled state
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});