import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Purpose4Screen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Your Goals to Achieve in 2 Months:</Text>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.listItem}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFD700" />
          <Text style={styles.listText}>Converse with confidence</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="book-outline" size={24} color="#00FF7F" />
          <Text style={styles.listText}>Build your vocabulary</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="time-outline" size={24} color="#FF6347" />
          <Text style={styles.listText}>Develop a learning habit</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="star-outline" size={24} color="#1E90FF" />
          <Text style={styles.listText}>Track your daily progress</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="thumbs-up-outline" size={24} color="#FF4500" />
          <Text style={styles.listText}>Boost your self-confidence</Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    paddingHorizontal: 20,
    paddingTop: 150,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  listText: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 15,
    fontWeight: '500',
  },
  button: {
    padding: 15,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
