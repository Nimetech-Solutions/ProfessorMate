import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function GoalsScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Your Goals to Achieve in 2 Months:</Text>
      <Text style={styles.subtitle}>
        Consistency and dedication are the keys to success!
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: 60%</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* Mascot and Speech Bubble */}
      <View style={styles.mascotContainer}>
        <Image 
          source={require('../../assets/items/character.png')} 
          style={styles.mascot} 
        />
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>These are goals you can achieve in 2 months</Text>
        </View>
      </View>

      {/* Goals List */}
      <ScrollView style={styles.listContainer}>
        <View style={styles.listItem}>
          <MaterialIcons name="record-voice-over" size={24} color="#FFD700" />
          <View>
            <Text style={styles.listText}>Converse with confidence</Text>
            <Text style={styles.listDescription}>
              Stress-free speaking and listening exercises.
            </Text>
          </View>
        </View>
        <View style={styles.listItem}>
          <FontAwesome5 name="book-open" size={24} color="#00FF7F" />
          <View>
            <Text style={styles.listText}>Build your vocabulary</Text>
            <Text style={styles.listDescription}>
              Common words and practical phrases.
            </Text>
          </View>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="time" size={24} color="#FF6347" />
          <View>
            <Text style={styles.listText}>Develop a learning habit</Text>
            <Text style={styles.listDescription}>
              Smart reminders, fun challenges, and more exercises.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MainApp')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Motivational Quote */}
      <Text style={styles.quote}>
        "The secret of getting ahead is getting started."
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D1D1',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    width: '60%', // Simulated progress percentage
    backgroundColor: '#FFD700',
    borderRadius: 5,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  mascot: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  speechBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
    flex: 1,
  },
  speechText: {
    fontSize: 14,
    color: '#fff',
  },
  listContainer: {
    width: '100%',
    marginBottom: 15,
    maxHeight: 300,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  listText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 15,
  },
  listDescription: {
    fontSize: 14,
    color: '#D1D1D1',
    marginLeft: 15,
    marginTop: 5,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quote: {
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#D1D1D1',
    textAlign: 'center',
    marginBottom: 30,
  },
});