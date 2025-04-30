import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity,
  Dimensions, SafeAreaView, Platform, StatusBar
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
const TILE_SIZE = Math.min(width / 8, 45);

export default function SentencePuzzleScreen({ navigation, route }) {
  const { 
    image = require("../../../assets/items/girl-reading.png"),
    correctSentence = "She reads a book", 
    words = ["She", "He", "reads", "read", "a", "an", "book", "newspaper"]
  } = route?.params || {};
  
  // Split correct sentence into individual words
  const correctWords = correctSentence.split(' ');
  
  // State management
  const [placedWords, setPlacedWords] = useState(Array(correctWords.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Create puzzle words
  const createPuzzleWords = () => {
    return words.map(word => ({ 
      word, 
      id: Math.random().toString(),
      isPlaced: false
    })).sort(() => Math.random() - 0.5);
  };
  
  const [allWords, setAllWords] = useState(createPuzzleWords());
  const availableWords = allWords.filter(word => !word.isPlaced);
  
  // Place a word in an empty slot
  const placeWord = (wordObj, index) => {
    if (placedWords[index] !== null) return;

    const newPlacedWords = [...placedWords];
    newPlacedWords[index] = wordObj;
    setPlacedWords(newPlacedWords);
    
    setAllWords(prev => 
      prev.map(w => w.id === wordObj.id ? { ...w, isPlaced: true } : w)
    );
  };
  
  // Remove a placed word
  const removePlacedWord = (index) => {
    if (!placedWords[index]) return;
    
    const wordToRemove = placedWords[index];
    const newPlacedWords = [...placedWords];
    newPlacedWords[index] = null;
    setPlacedWords(newPlacedWords);
    
    setAllWords(prev => 
      prev.map(w => w.id === wordToRemove.id ? { ...w, isPlaced: false } : w)
    );
  };
  
  // Check if the answer is correct
  const checkAnswer = () => {
    const allSlotsFilled = !placedWords.includes(null);
    if (!allSlotsFilled) return;
    
    const submittedSentence = placedWords
      .map(wordObj => wordObj.word)
      .join(' ');
    
    setIsCorrect(submittedSentence === correctSentence);
    setShowFeedback(true);
  };
  
  // Reset the puzzle
  const resetPuzzle = () => {
    setAllWords(createPuzzleWords());
    setPlacedWords(Array(correctWords.length).fill(null));
    setShowFeedback(false);
    setIsCorrect(null);
  };
  
  // Move to next puzzle
  const moveToNextPuzzle = () => {
    navigation.navigate('SentencePuzzleScreen2');
  };
  
  // Calculate adaptive sizes
  const screenHeight = height - 230;
  const availableContentHeight = showFeedback ? screenHeight * 0.7 : screenHeight * 0.85;
  const maxImageSize = Math.min(width * 0.5, availableContentHeight * 0.3, 200);
  const imageSize = maxImageSize;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={38} color="#5D3FD3" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sentence Puzzle</Text>
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={require("../../../assets/items/profile.jpg")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.mainContent}>
          {/* Image Container */}
          <View style={[styles.imageContainer, { width: imageSize, height: imageSize }]}>
            <Image 
              source={typeof image === 'number' ? image : require("../../../assets/items/girl-reading.png")} 
              style={[styles.image, { width: imageSize * 0.9, height: imageSize * 0.9 }]} 
            />
          </View>
          
          {/* Word Placement Area */}
          <View style={styles.placementAreaContainer}>
            <View style={styles.placementBackground} />
            <View style={styles.placementArea}>
              {placedWords.map((wordObj, index) => (
                <TouchableOpacity 
                  key={`drop-${index}`}
                  style={styles.dropZone}
                  onPress={() => removePlacedWord(index)}
                >
                  {wordObj && (
                    <View style={styles.placedWord}>
                      <Text style={styles.wordText}>{wordObj.word}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Help text */}
          <Text style={styles.helpText}>
            {placedWords.includes(null) ? 
              "Tap a word to place it" : 
              "Tap a placed word to remove it"
            }
          </Text>
          
          {/* Word Tiles to Select */}
          <View style={styles.wordsContainer}>
            {availableWords.map((wordObj) => (
              <TouchableOpacity
                key={wordObj.id}
                style={styles.wordTile}
                onPress={() => {
                  const emptyIndex = placedWords.findIndex(w => w === null);
                  if (emptyIndex !== -1) placeWord(wordObj, emptyIndex);
                }}
              >
                <Text style={styles.wordText}>{wordObj.word}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Check Button */}
          <TouchableOpacity 
            style={styles.checkButton} 
            onPress={checkAnswer} 
            activeOpacity={0.7}
          >
            <FontAwesome5 name="check-circle" size={22} color="white" style={styles.buttonIcon} />
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>
          
        {/* Feedback and Navigation */}
        {showFeedback && (
          <View style={styles.feedbackContainer}>
            <View style={[styles.feedbackBox, isCorrect ? styles.correctFeedback : styles.wrongFeedback]}>
              <FontAwesome5 
                name={isCorrect ? "smile-beam" : "sad-tear"} 
                size={24} 
                color={isCorrect ? "#006400" : "#8B0000"} 
                style={styles.feedbackIcon}
              />
              <Text style={[styles.feedbackText, { color: isCorrect ? "#006400" : "#8B0000" }]}>
                {isCorrect ? "Great Job!" : "Try Again!"}
                {!isCorrect && (
                  <Text style={[styles.correctSentenceText, { color: "#8B0000" }]}>
                    {"\nCorrect Sentence: " + correctSentence}
                  </Text>
                )}
              </Text>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              {/* Next Button */}
              <TouchableOpacity 
                style={[styles.actionButton, styles.nextButton]}
                onPress={moveToNextPuzzle}
                activeOpacity={0.7}
              >
                <FontAwesome5 
                  name="arrow-circle-right" 
                  size={22} 
                  color="white" 
                  style={styles.buttonIcon} 
                />
                <Text style={styles.actionButtonText}>Next Puzzle</Text>
              </TouchableOpacity>
              
              {/* Try Again Button - Only shows when answer is incorrect */}
              {!isCorrect && (
                <TouchableOpacity 
                  style={[styles.actionButton, styles.retryButton]}
                  onPress={resetPuzzle}
                  activeOpacity={0.7}
                >
                  <FontAwesome5 
                    name="redo-alt" 
                    size={22} 
                    color="white" 
                    style={styles.buttonIcon} 
                  />
                  <Text style={styles.actionButtonText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f6ff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { 
    flex: 1, 
    width: '100%', 
    height: '100%',
    position: 'relative',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between', // Changed from flex-start to better distribute space
    paddingBottom: 25, // Increased padding to ensure button isn't too close to bottom
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    height: 50,
    position: 'relative',
  },
  backButton: { position: 'absolute', left: 20, zIndex: 10 },
  profileButton: { 
    position: 'absolute', 
    right: 20, 
    zIndex: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#5D3FD3',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5D3FD3',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#5D3FD3',
  },
  image: { 
    resizeMode: 'contain' 
  },
  placementAreaContainer: {
    position: 'relative',
    width: '100%',
    minHeight: 80,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placementBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(93, 63, 211, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#5D3FD3',
    borderStyle: 'dashed',
  },
  placementArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 15,
  },
  dropZone: {
    minWidth: 80,
    height: 45,
    margin: 6,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#5D3FD3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#5D3FD3',
    marginVertical: 10,
    fontStyle: 'italic',
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  wordTile: {
    minWidth: 80,
    height: 45,
    borderWidth: 2,
    borderColor: '#5D3FD3',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    margin: 8,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  placedWord: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5D3FD3',
    paddingHorizontal: 10,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D3FD3',
  },
  checkButton: {
    backgroundColor: '#00E676',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: -5, // Changed from 10 to -5 to move it up
    marginBottom: 20, // Added margin bottom for spacing
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonIcon: { marginRight: 8 },
  checkButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
  // Feedback container
  feedbackContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(248, 246, 255, 0.95)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  feedbackBox: {
    width: '90%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 15,
  },
  correctFeedback: {
    backgroundColor: '#CEFFCE',
    borderWidth: 2,
    borderColor: '#00C853',
  },
  wrongFeedback: {
    backgroundColor: '#FFECEC',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  correctSentenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackIcon: { marginRight: 5 },
  
  // Container for action buttons with row layout
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    flex: 1,
    maxWidth: '45%',
    marginHorizontal: 5,
  },
  nextButton: { backgroundColor: '#2196F3' },
  retryButton: { backgroundColor: '#FF9800' },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});