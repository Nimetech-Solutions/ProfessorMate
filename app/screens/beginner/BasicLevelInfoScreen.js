import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BasicLevelInfoScreen() {
  const navigation = useNavigation();

  const sections = [
    {
      id: 1,
      title: 'English Alphabet',
      description: 'Learn all 26 letters (A-Z) with pronunciation and common words for each letter.',
      icon: 'font',
    },
    {
      id: 2,
      title: 'Basic Vocabulary',
      description: 'Common everyday objects, animals, colors, numbers, and food items.',
      icon: 'book',
    },
    {
      id: 3,
      title: 'Simple Sentences',
      description: 'Learn how to form basic sentences and questions for everyday communication.',
      icon: 'comment-alt',
    },
    {
      id: 4,
      title: 'Interactive Puzzles',
      description: 'Fun word puzzles to practice what you\'ve learned and build your confidence.',
      icon: 'puzzle-piece',
    },
  ];

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={38} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Basic Level</Text>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image 
            source={require('../../../assets/items/profile.jpg')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/items/character.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.welcomeText}>
          Welcome to the Basic Level!
        </Text>
        
        <Text style={styles.descriptionText}>
          This level is perfect for beginners who are just starting to learn English. You'll build a strong foundation with these core topics:
        </Text>

        {sections.map(section => (
          <View key={section.id} style={styles.sectionCard}>
            <View style={styles.sectionIconContainer}>
              <FontAwesome5 name={section.icon} size={24} color="#0072ff" />
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionDescription}>{section.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Your Goal</Text>
          <Text style={styles.goalText}>
            By completing this level, you'll be able to recognize all English letters, understand basic vocabulary, and communicate simple needs in English.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('ModuleSelectionScreen')}
        >
          <Text style={styles.continueButtonText}>Start Learning</Text>
          <FontAwesome5 name="arrow-right" size={16} color="white" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descriptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  goalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  goalText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
}); 