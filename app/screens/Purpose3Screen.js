import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StartScreenL from './StartScreenL';

export default function Purpose3Screen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        Achieve your goals while blending fun and learning seamlessly!
      </Text>

      {/* Image */}
    {/* <Image
           source={require("../../assets/items/6086909316855611244-removebg-preview.png")}
           style={styles.mascot}
         /> */}

      {/* Goals List */}
      <View style={styles.listContainer}>
        <View style={styles.listItem}>
          <Ionicons name="rocket-outline" size={24} color="#FFD700" />
          <Text style={styles.listText}>Reach new heights</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="book-outline" size={24} color="#00FF7F" />
          <Text style={styles.listText}>Master new skills</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="happy-outline" size={24} color="#FF6347" />
          <Text style={styles.listText}>Enjoy every step</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Purpose4')}>
  <Text style={styles.buttonText}>Start</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    paddingHorizontal: 20,
    paddingTop: 190,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  listContainer: {
    width: '100%',
    marginBottom: 30,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
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
