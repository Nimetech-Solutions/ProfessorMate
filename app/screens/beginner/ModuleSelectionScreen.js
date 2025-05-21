import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ModuleSelectionScreen() {
  const navigation = useNavigation();
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      id: 1,
      title: 'Module 1: Foundations',
      screen: 'ModuleOneTopicsScreen',
      description: 'Learn alphabets, basic words, and simple expressions'
    },
    {
      id: 2,
      title: 'Module 2: Communication Basics',
      screen: 'AlphabetScreen', // You can change this to the appropriate screen
      description: 'Build basic conversation skills and vocabulary'
    },
    {
      id: 3,
      title: 'Module 3: Grammar Fundamentals',
      screen: 'AlphabetScreen', // You can change this to the appropriate screen
      description: 'Learn essential grammar rules and sentence structure'
    }
  ];

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const handleContinue = () => {
    if (selectedModule) {
      navigation.navigate(selectedModule.screen);
    } else {
      // Default to first module if none selected
      navigation.navigate('AlphabetScreen');
    }
  };

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
      </View>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.characterContainer}>
          <Image 
            source={require('../../../assets/items/character.png')} 
            style={styles.characterImage}
            resizeMode="contain"
          />
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Select Your Module</Text>
          </View>
        </View>

        <View style={styles.moduleContainer}>
          {modules.map(module => (
            <TouchableOpacity 
              key={module.id} 
              style={[
                styles.moduleButton,
                selectedModule?.id === module.id && styles.selectedModuleButton
              ]}
              onPress={() => handleModuleSelect(module)}
            >
              <Text style={[
                styles.moduleText,
                selectedModule?.id === module.id && styles.selectedModuleText
              ]}>
                {module.title}
              </Text>
              <Text style={[
                styles.moduleDescription,
                selectedModule?.id === module.id && styles.selectedModuleDescription
              ]}>
                {module.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedModule && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedModule}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  characterContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f8ff',
    borderWidth: 3,
    borderColor: '#fff',
  },
  speechBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  speechText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  moduleContainer: {
    width: '100%',
    marginTop: 10,
  },
  moduleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  selectedModuleButton: {
    backgroundColor: '#cce7ff',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  moduleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 8,
  },
  selectedModuleText: {
    color: '#005ac2',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  selectedModuleDescription: {
    color: '#444',
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
  disabledButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.6)',
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