import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity,
  Dimensions, SafeAreaView, Platform, StatusBar
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const TILE_SIZE = Math.min(width / 8, 45);

export default function WordPuzzleScreenY1({ navigation, route }) {
  const { word = "YACHT", image = require("../../../../assets/items/yacht.png") } = route?.params || {};
  
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [placedTiles, setPlacedTiles] = useState(Array(word.length).fill(null));
  
  const createPuzzleLetters = () => {
    const extraLettersCount = Math.min(8 - word.length, 5);
    const extraLetters = 'ABCDEFGIJKLMNOPQRSTVUWXZ'
      .split('')
      .filter(l => !word.includes(l))
      .sort(() => Math.random() - 0.5)
      .slice(0, extraLettersCount);
    
    return [...word.split(''), ...extraLetters]
      .map(letter => ({ 
        letter, 
        id: Math.random().toString(),
        isPlaced: false
      }))
      .sort(() => Math.random() - 0.5);
  };
  
  const [allTiles, setAllTiles] = useState(createPuzzleLetters());
  const availableTiles = allTiles.filter(tile => !tile.isPlaced);
  
  const placeTile = (tile, index) => {
    if (placedTiles[index] !== null) return;

    const newPlacedTiles = [...placedTiles];
    newPlacedTiles[index] = tile;
    setPlacedTiles(newPlacedTiles);
    
    setAllTiles(prev => 
      prev.map(t => t.id === tile.id ? { ...t, isPlaced: true } : t)
    );
  };
  
  const removePlacedTile = (index) => {
    if (!placedTiles[index]) return;
    
    const tileToRemove = placedTiles[index];
    const newPlacedTiles = [...placedTiles];
    newPlacedTiles[index] = null;
    setPlacedTiles(newPlacedTiles);
    
    setAllTiles(prev => 
      prev.map(t => t.id === tileToRemove.id ? { ...t, isPlaced: false } : t)
    );
  };
  
  const savePuzzleStatus = async (status) => {
    try {
      const storedStatusJson = await AsyncStorage.getItem('yPuzzleStatus');
      let puzzleStatus = storedStatusJson ? JSON.parse(storedStatusJson) : {};
      
      puzzleStatus[1] = status;
      
      await AsyncStorage.setItem('yPuzzleStatus', JSON.stringify(puzzleStatus));
    } catch (error) {
      console.error('Failed to save puzzle status:', error);
    }
  };
  
  const checkAnswer = () => {
    const allSlotsFilled = !placedTiles.includes(null);
    if (!allSlotsFilled) return;
    
    const submittedWord = placedTiles
      .map(tile => tile.letter)
      .join('');
    
    const correct = submittedWord === word;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    savePuzzleStatus(correct ? 'completed' : 'wrong');
  };
  
  const resetPuzzle = () => {
    setAllTiles(createPuzzleLetters());
    setPlacedTiles(Array(word.length).fill(null));
    setShowFeedback(false);
    setIsCorrect(null);
  };
  
  const moveToNextPuzzle = () => {
    if (!isCorrect) {
      savePuzzleStatus('skipped');
    }
    navigation.navigate('WordPuzzleScreenY2');
  };
  
  const screenHeight = height - 200;
  const availableContentHeight = showFeedback ? screenHeight * 0.7 : screenHeight * 0.85;
  const maxImageSize = Math.min(width * 0.4, availableContentHeight * 0.3, 160);
  const imageSize = maxImageSize;
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={38} color="#5D3FD3" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Word Puzzle</Text>
        </View>
        
        <View style={styles.mainContent}>
          <View style={[styles.imageContainer, { 
            width: imageSize, 
            height: imageSize, 
            borderRadius: imageSize / 2,
            overflow: 'hidden'
          }]}>
            <Image 
              source={image} 
              style={[styles.image, { 
                width: imageSize * 0.7, 
                height: imageSize * 0.7,
                resizeMode: 'contain'
              }]} 
            />
          </View>
          
          <View style={styles.placementAreaContainer}>
            <View style={styles.placementBackground} />
            <View style={styles.placementArea}>
              {placedTiles.map((tile, index) => (
                <TouchableOpacity 
                  key={`drop-${index}`}
                  style={styles.dropZone}
                  onPress={() => removePlacedTile(index)}
                >
                  {tile && (
                    <View style={styles.placedTile}>
                      <Text style={styles.tileText}>{tile.letter}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <Text style={styles.helpText}>
            {placedTiles.includes(null) ? 
              "Tap a letter to place it" : 
              "Tap a placed letter to remove it"
            }
          </Text>
          
          <View style={styles.tilesContainer}>
            {availableTiles.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                style={styles.tile}
                onPress={() => {
                  const emptyIndex = placedTiles.findIndex(t => t === null);
                  if (emptyIndex !== -1) placeTile(tile, emptyIndex);
                }}
              >
                <Text style={styles.tileText}>{tile.letter}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity 
            style={styles.checkButton} 
            onPress={checkAnswer} 
            activeOpacity={0.7}
          >
            <FontAwesome5 name="check-circle" size={22} color="white" style={styles.buttonIcon} />
            <Text style={styles.checkButtonText}>Check</Text>
          </TouchableOpacity>
        </View>
          
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
                  <Text style={[styles.correctWordText, { color: "#8B0000" }]}>
                    {"\nCorrect Word: " + word}
                  </Text>
                )}
              </Text>
            </View>
            
            <View style={styles.actionButtonsContainer}>
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
                <Text style={styles.actionButtonText}>Next</Text>
              </TouchableOpacity>
              
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
    justifyContent: 'flex-start',
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    height: 50,
  },
  backButton: { position: 'absolute', left: 20, zIndex: 10 },
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
    borderWidth: 4,
    borderColor: '#FFD700',
  },
  image: { 
    alignSelf: 'center',
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
    padding: 10,
  },
  dropZone: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    margin: 4,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#5D3FD3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  helpText: {
    fontSize: 14,
    color: '#5D3FD3',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderWidth: 2,
    borderColor: '#5D3FD3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  placedTile: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#5D3FD3',
  },
  tileText: {
    fontSize: Math.min(TILE_SIZE * 0.5, 22),
    fontWeight: 'bold',
    color: '#5D3FD3',
  },
  checkButton: {
    backgroundColor: '#00E676',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
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
    fontSize: 18,
  },
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
  correctWordText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackIcon: { marginRight: 5 },
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