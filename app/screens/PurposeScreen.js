import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { LinearGradient } from 'expo-linear-gradient'; // Gradient background

// Purpose list with icons and colors
const purposes = [
  { id: '1', name: 'Just for fun', icon: 'happy-outline', color: '#FFD700' }, // Gold
  { id: '2', name: 'Spend time productively', icon: 'time-outline', color: '#FF4500' }, // Orange Red
  { id: '3', name: 'Boost my career', icon: 'briefcase-outline', color: '#00FF7F' }, // Spring Green
  { id: '4', name: 'Connect with people', icon: 'people-outline', color: '#1E90FF' }, // Dodger Blue
  { id: '5', name: 'Prepare for travel', icon: 'airplane-outline', color: '#FF69B4' }, // Hot Pink
  { id: '6', name: 'Support my education', icon: 'school-outline', color: '#8A2BE2' }, // Blue Violet
  { id: '7', name: 'Other', icon: 'ellipsis-horizontal-circle-outline', color: '#D3D3D3' }, // Light Gray
];

export default function PurposeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']} // Gradient background
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>
      
      {/* Title */}
      <Text style={styles.title}>Why are you learning English?</Text>
      
      {/* Purposes List */}
      <FlatList
        data={purposes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.optionContainer}>
            {/* Colored Icon */}
            <Ionicons name={item.icon} size={24} color={item.color} style={styles.icon} />
            <Text style={styles.option}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      
      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Continue Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Purpose1')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        {/* Goals Button */}
        <TouchableOpacity
          style={[styles.button, styles.goalsButton]}
          onPress={() => navigation.navigate('Goals')}
        >
          <Text style={styles.buttonText}>Go to Goals</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background for back button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  option: {
    fontSize: 18,
    color: '#fff',
  },
  buttonsContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    padding: 15,
    backgroundColor: '#00c6ff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    width: '60%',
  },
  goalsButton: {
    backgroundColor: '#32CD32', // Different color for the Goals button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});