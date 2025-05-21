import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ModuleOneTopicsScreen() {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [buttonScale] = useState(new Animated.Value(1));

  const topics = [
    {
      id: 1,
      title: 'Alphabet and Phonetics',
      icon: 'font',
      description: 'Learn letters and sounds',
      screen: 'AlphabetScreen'
    },
    {
      id: 2,
      title: 'Essential Vocabulary',
      icon: 'book',
      description: 'Build your word bank',
      screen: 'EssentialVocabularyScreen'
    }
  ];

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };

  const handleContinue = () => {
    // Button animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start(() => {
      if (selectedTopic) {
        navigation.navigate(selectedTopic.screen);
      } else {
        // Default to first topic if none selected
        navigation.navigate('AlphabetScreen');
      }
    });
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#f0f8ff', '#e6f2ff']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-circle" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Module 1: Foundations</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.characterContainer}>
        <Image 
          source={require('../../../assets/items/character.png')} 
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.selectText}>Select a topic to begin:</Text>

      <View style={styles.topicsContainer}>
        {topics.map(topic => (
          <TouchableOpacity 
            key={topic.id} 
            style={[
              styles.topicButton,
              selectedTopic?.id === topic.id && styles.selectedTopicButton
            ]}
            onPress={() => handleTopicSelect(topic)}
          >
            <View style={styles.topicContent}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name={topic.icon} size={22} color="#0072ff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={[
                  styles.topicText,
                  selectedTopic?.id === topic.id && styles.selectedTopicText
                ]}>
                  {topic.title}
                </Text>
                <Text style={styles.topicDescription}>{topic.description}</Text>
              </View>
              {selectedTopic?.id === topic.id && (
                <MaterialIcons name="check-circle" size={24} color="#00c6ff" style={styles.checkIcon} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedTopic && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedTopic}
          >
            <LinearGradient
              colors={!selectedTopic ? ['#90caf9', '#64b5f6'] : ['#00c6ff', '#0072ff']}
              style={styles.gradientButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <FontAwesome5 name="arrow-right" size={16} color="white" style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0072ff',
    marginBottom: 5,
    textAlign: 'center',
  },
  divider: {
    width: 50,
    height: 3,
    backgroundColor: '#00c6ff',
    borderRadius: 10,
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  characterImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#e1f5fe',
  },
  selectText: {
    fontSize: 18,
    color: '#444',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  topicsContainer: {
    width: '100%',
    marginVertical: 10,
  },
  topicButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e1f5fe',
  },
  selectedTopicButton: {
    backgroundColor: '#e3f2fd',
    borderColor: '#00c6ff',
    borderWidth: 2,
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#e1f5fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  topicText: {
    fontSize: 18,
    color: '#0072ff',
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedTopicText: {
    color: '#0051cb',
  },
  topicDescription: {
    fontSize: 14,
    color: '#666',
  },
  checkIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  continueButton: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabledButton: {
    opacity: 0.8,
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