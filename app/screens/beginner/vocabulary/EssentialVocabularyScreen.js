import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EssentialVocabularyScreen() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [buttonScale] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  
  const categories = [
    {
      id: 1,
      title: 'Numbers',
      screen: 'NumbersScreen',
      icon: 'sort-numeric-up'
    },
    {
      id: 2,
      title: 'Colors',
      screen: 'AlphabetScreen', // Change to appropriate screen
      icon: 'palette'
    },
    {
      id: 3,
      title: 'Days of the week',
      screen: 'AlphabetScreen', // Change to appropriate screen
      icon: 'calendar-week'
    },
    {
      id: 4,
      title: 'Months',
      screen: 'AlphabetScreen', // Change to appropriate screen
      icon: 'calendar-alt'
    },
    {
      id: 5,
      title: 'Common objects (household items, foods, etc.)',
      screen: 'AlphabetScreen', // Change to appropriate screen
      icon: 'home'
    }
  ];

  useEffect(() => {
    // Animate cards when screen loads
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
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
      if (selectedCategory) {
        navigation.navigate(selectedCategory.screen);
      } else {
        // Default to first category if none selected
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
        <Text style={styles.headerTitle}>Essential Vocabulary</Text>
        <View style={styles.divider} />
      </View>

      <Text style={styles.selectText}>Select a category to start learning:</Text>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => (
          <Animated.View 
            key={category.id}
            style={{
              opacity: fadeAnim,
              transform: [{ 
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }}
          >
            <TouchableOpacity 
              style={[
                styles.categoryButton,
                selectedCategory?.id === category.id && styles.selectedCategoryButton
              ]}
              onPress={() => handleCategorySelect(category)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedCategory?.id === category.id 
                  ? ['#bbdefb', '#90caf9'] 
                  : ['#f5f9ff', '#e3f2fd']}
                style={styles.gradientCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.categoryContent}>
                  <View style={[
                    styles.iconContainer,
                    selectedCategory?.id === category.id && styles.selectedIconContainer
                  ]}>
                    <FontAwesome5 
                      name={category.icon} 
                      size={20} 
                      color={selectedCategory?.id === category.id ? "#0051cb" : "#0072ff"} 
                    />
                  </View>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory?.id === category.id && styles.selectedCategoryText
                  ]}>
                    {category.title}
                  </Text>
                  {selectedCategory?.id === category.id && (
                    <View style={styles.selectedIndicator} />
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Animated.View style={{ transform: [{ scale: buttonScale }], width: '100%' }}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedCategory && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedCategory}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={!selectedCategory ? ['#90caf9', '#64b5f6'] : ['#0044ff', '#0072ff']}
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
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0072ff',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#00c6ff',
    borderRadius: 10,
  },
  selectText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  categoryButton: {
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  selectedCategoryButton: {
    shadowColor: '#0072ff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  gradientCard: {
    borderRadius: 20,
    padding: 2,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    position: 'relative',
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(224, 242, 254, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedIconContainer: {
    backgroundColor: '#bbdefb',
  },
  categoryText: {
    fontSize: 16,
    color: '#0072ff',
    fontWeight: '600',
    flex: 1,
  },
  selectedCategoryText: {
    color: '#0051cb',
    fontWeight: '700',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00c6ff',
    position: 'absolute',
    right: 16,
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