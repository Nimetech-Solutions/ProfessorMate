import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Animated, 
  Image,
  FlatList,
  Dimensions,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const SPACING = width * 0.05;

export default function NumbersScreen() {
  const navigation = useNavigation();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [sound, setSound] = useState();
  const [showPractice, setShowPractice] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));

  // Numbers data with visual representation and real-world examples
  const numbers = [
    { id: 1, number: '1', word: 'One', example: 'One apple', image: require('../../../../assets/items/apple.png'), color: '#E3F2FD' },
    { id: 2, number: '2', word: 'Two', example: 'Two eyes', image: require('../../../../assets/items/eye2.png'), color: '#BBDEFB' },
    { id: 3, number: '3', word: 'Three', example: 'Three stars', image: require('../../../../assets/items/3star.png'), color: '#90CAF9' },
    { id: 4, number: '4', word: 'Four', example: 'Four wheels', image: require('../../../../assets/items/4wheels.png'), color: '#64B5F6' },
    { id: 5, number: '5', word: 'Five', example: 'Five fingers', image: require('../../../../assets/items/hand.png'), color: '#42A5F5' },
    { id: 6, number: '6', word: 'Six', example: 'Six eggs', image: require('../../../../assets/items/eggs.png'), color: '#2196F3' },
    { id: 7, number: '7', word: 'Seven', example: 'Seven days', image: require('../../../../assets/items/days.png'), color: '#1E88E5' },
    { id: 8, number: '8', word: 'Eight', example: 'Eight planets', image: require('../../../../assets/items/plannet.png'), color: '#1976D2' },
    { id: 9, number: '9', word: 'Nine', example: 'Nine players', image: require('../../../../assets/items/players.png'), color: '#1565C0' },
    { id: 10, number: '10', word: 'Ten', example: 'Ten fingers', image: require('../../../../assets/items/10finger.png'), color: '#0D47A1' },
  ];

  // Update practice questions with more visual elements
  const practiceQuestions = [
    { 
      id: 1, 
      question: "How many fingers?", 
      options: ["One", "Two", "Three"], 
      answer: "Two", 
      image: require('../../../../assets/items/hand.png'),
      description: "Count how many fingers are showing"
    },
    { 
      id: 2, 
      question: "Which number is this?", 
      options: ["2", "5", "8"], 
      answer: "5", 
      image: require('../../../../assets/items/hand.png'),
      description: "Select the correct numeral"
    },
    { 
      id: 3, 
      question: "Match the number", 
      options: ["3", "6", "9"], 
      answer: "3", 
      image: require('../../../../assets/items/star.png'),
      description: "How many stars do you see?"
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  
  useEffect(() => {
    // Animate entry
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Listen to scroll position to update activeIndex
  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      const index = Math.round(value / (CARD_WIDTH + SPACING));
      setActiveIndex(index);
    });

    return () => {
      scrollX.removeListener(listener);
    };
  }, []);
  
  const playNumberSound = async (number) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      // Play sound logic would go here
      console.log(`Playing sound for number ${number}`);
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };

  const handleNumberSelect = (item) => {
    setSelectedNumber(item);
    playNumberSound(item.word);
  };

  const handleNextCard = () => {
    if (activeIndex < numbers.length - 1) {
      flatListRef.current.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  const handlePreviousCard = () => {
    if (activeIndex > 0) {
      flatListRef.current.scrollToIndex({
        index: activeIndex - 1,
        animated: true,
      });
    }
  };

  const handleStartPractice = () => {
    setShowPractice(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setPracticeCompleted(false);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === practiceQuestions[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    // Delay before showing next question
    setTimeout(() => {
      if (currentQuestion < practiceQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        // Practice completed
        setPracticeCompleted(true);
        setPracticeScore(score + (correct ? 1 : 0));
      }
    }, 1500);
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setPracticeCompleted(false);
  };

  const handleProfilePress = () => {
    // Navigate to profile or user settings
    Alert.alert(
      "Profile",
      "Would you like to view your profile or settings?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Profile",
          onPress: () => {
            // Navigate to profile screen when it's available
            console.log("Navigate to profile");
            // When you have a profile screen, uncomment below:
            // navigation.navigate('ProfileScreen');
          }
        },
        {
          text: "Settings",
          onPress: () => {
            // Navigate to settings
            console.log("Navigate to settings");
            // When you have a settings screen, uncomment below:
            // navigation.navigate('SettingsScreen');
          }
        }
      ]
    );
  };

  const renderNumberCard = ({ item, index }) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH + SPACING),
      index * (CARD_WIDTH + SPACING),
      (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
      >
        <LinearGradient
          colors={[item.color, '#ffffff']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleNumberSelect(item)}
            style={styles.cardContent}
          >
            <Text style={styles.cardNumber}>{item.number}</Text>
            <Text style={styles.cardWord}>{item.word}</Text>
            
            <View style={styles.cardImageContainer}>
              <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
            </View>
            
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleLabel}>Example:</Text>
              <Text style={styles.cardExample}>{item.example}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.listenButton}
              onPress={() => playNumberSound(item.word)}
            >
              <FontAwesome5 name="volume-up" size={18} color="#ffffff" />
              <Text style={styles.listenText}>Listen</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={['#f0f8ff', '#e6f2ff', '#d6e8ff']}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (showPractice) {
              setShowPractice(false);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Ionicons name="arrow-back-circle" size={32} color="#007AFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Numbers 1-10</Text>

        <TouchableOpacity 
          style={styles.profileContainer}
          onPress={handleProfilePress}
          activeOpacity={0.8}
        >
          <Image 
            source={require('../../../../assets/items/profile.jpg')} 
            style={styles.profileImage} 
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      {!showPractice ? (
        <Animated.View 
          style={[
            styles.contentContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.carouselContainer}>
            <FlatList
              ref={flatListRef}
              data={numbers}
              renderItem={renderNumberCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + SPACING}
              decelerationRate="fast"
              contentContainerStyle={styles.flatListContent}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            />
          </View>

          <View style={styles.navigationControls}>
            <TouchableOpacity 
              style={[styles.navButton, activeIndex === 0 && styles.disabledNavButton]}
              onPress={handlePreviousCard}
              disabled={activeIndex === 0}
            >
              <Ionicons name="chevron-back" size={24} color={activeIndex === 0 ? "#bbb" : "#007AFF"} />
            </TouchableOpacity>
            
            <View style={styles.pagination}>
              {numbers.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeIndex === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.navButton, activeIndex === numbers.length - 1 && styles.disabledNavButton]}
              onPress={handleNextCard}
              disabled={activeIndex === numbers.length - 1}
            >
              <Ionicons name="chevron-forward" size={24} color={activeIndex === numbers.length - 1 ? "#bbb" : "#007AFF"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.practiceButtonContainer}
            onPress={handleStartPractice}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#0044ff', '#0072ff']}
              style={styles.practiceButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <FontAwesome5 name="pencil-alt" size={18} color="#ffffff" style={styles.practiceIcon} />
              <Text style={styles.practiceButtonText}>Practice Numbers</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View 
          style={[
            styles.practiceContainer,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {!practiceCompleted ? (
            <>
              <LinearGradient
                colors={['#ffffff', '#f5f9ff']}
                style={styles.questionCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <View style={styles.questionNumberBadge}>
                  <Text style={styles.questionNumberText}>
                    {currentQuestion + 1}/{practiceQuestions.length}
                  </Text>
                </View>
                
                <Text style={styles.questionText}>
                  {practiceQuestions[currentQuestion].question}
                </Text>
                
                <Text style={styles.questionDescription}>
                  {practiceQuestions[currentQuestion].description}
                </Text>
                
                <View style={styles.questionImageContainer}>
                  <Image 
                    source={practiceQuestions[currentQuestion].image} 
                    style={styles.questionImage} 
                    resizeMode="contain"
                  />
                </View>
                
                <View style={styles.optionsContainer}>
                  {practiceQuestions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedAnswer === option && 
                          (isCorrect === true 
                            ? styles.correctOption 
                            : isCorrect === false 
                              ? styles.wrongOption 
                              : styles.selectedOption)
                      ]}
                      onPress={() => handleAnswerSelect(option)}
                      disabled={selectedAnswer !== null}
                      activeOpacity={0.8}
                    >
                      <Text 
                        style={[
                          styles.optionText,
                          selectedAnswer === option && 
                            (isCorrect === true 
                              ? styles.correctOptionText 
                              : isCorrect === false 
                                ? styles.wrongOptionText 
                                : styles.selectedOptionText)
                        ]}
                      >
                        {option}
                      </Text>
                      
                      {selectedAnswer === option && isCorrect === true && (
                        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" style={styles.resultIcon} />
                      )}
                      
                      {selectedAnswer === option && isCorrect === false && (
                        <Ionicons name="close-circle" size={24} color="#F44336" style={styles.resultIcon} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </LinearGradient>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${((currentQuestion + 1) / practiceQuestions.length) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            </>
          ) : (
            <View style={styles.resultContainer}>
              <LinearGradient
                colors={['#e6f2ff', '#ffffff']}
                style={styles.resultCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <View style={styles.resultIconContainer}>
                  {practiceScore === practiceQuestions.length ? (
                    <View style={styles.perfectScoreCircle}>
                      <FontAwesome5 name="trophy" size={40} color="#FFD700" />
                    </View>
                  ) : (
                    <View style={[styles.scoreCircle, {
                      backgroundColor: practiceScore >= practiceQuestions.length / 2 ? '#4CAF50' : '#FF9800'
                    }]}>
                      <Text style={styles.scoreText}>{practiceScore}/{practiceQuestions.length}</Text>
                    </View>
                  )}
                </View>
                
                <Text style={styles.resultTitle}>
                  {practiceScore === practiceQuestions.length ? 'Perfect Score!' : 
                   practiceScore >= practiceQuestions.length / 2 ? 'Good Job!' : 'Keep Practicing!'}
                </Text>
                
                <Text style={styles.resultDescription}>
                  {practiceScore === practiceQuestions.length ? 
                    'You answered all questions correctly!' : 
                    `You got ${practiceScore} out of ${practiceQuestions.length} questions right.`}
                </Text>
                
                <View style={styles.resultButtonsContainer}>
                  <TouchableOpacity
                    style={styles.tryAgainButton}
                    onPress={handleTryAgain}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#64B5F6', '#2196F3']}
                      style={styles.tryAgainGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <FontAwesome5 name="redo" size={16} color="white" style={{marginRight: 8}} />
                      <Text style={styles.tryAgainText}>Try Again</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => setShowPractice(false)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['#0044ff', '#0072ff']}
                      style={styles.continueGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                    >
                      <Text style={styles.continueText}>Continue Learning</Text>
                      <FontAwesome5 name="arrow-right" size={16} color="white" style={{marginLeft: 8}} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}
        </Animated.View>
      )}
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
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0072ff',
    textAlign: 'center',
  },
  profileContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#0072ff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  carouselContainer: {
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContent: {
    paddingHorizontal: SPACING / 2,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: 420,
    marginHorizontal: SPACING / 2,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  card: {
    flex: 1,
    borderRadius: 20,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  cardNumber: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#0072ff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 114, 255, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardWord: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  cardImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 114, 255, 0.3)',
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  exampleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  exampleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardExample: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0072ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  listenText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  navigationControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  disabledNavButton: {
    opacity: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bbb',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: '#0072ff',
    width: 20,
  },
  practiceButtonContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
  },
  practiceIcon: {
    marginRight: 10,
  },
  practiceButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Practice styles
  practiceContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  questionCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  questionNumberBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#0072ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    zIndex: 1,
  },
  questionNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 8,
  },
  questionDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  questionImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 114, 255, 0.05)',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 114, 255, 0.2)',
  },
  questionImage: {
    width: 120,
    height: 120,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: 'rgba(0, 114, 255, 0.1)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 114, 255, 0.15)',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  wrongOption: {
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.15)',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '700',
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: '700',
  },
  wrongOptionText: {
    color: '#F44336',
    fontWeight: '700',
  },
  resultIcon: {
    marginLeft: 10,
  },
  progressContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0, 114, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0072ff',
    borderRadius: 4,
  },
  
  // Result screen styles
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultIconContainer: {
    marginBottom: 25,
  },
  perfectScoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultButtonsContainer: {
    width: '100%',
  },
  tryAgainButton: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
  },
  tryAgainGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tryAgainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  continueGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 