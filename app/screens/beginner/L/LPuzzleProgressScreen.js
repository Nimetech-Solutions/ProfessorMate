import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, ScrollView, Image, Dimensions 
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function LPuzzleProgressScreen({ navigation }) {
  const [puzzleStatus, setPuzzleStatus] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });

  const puzzles = [
    { id: 1, name: 'LION', image: require('../../../../assets/items/lion.png') },
    { id: 2, name: 'LAMP', image: require('../../../../assets/items/lamp.png') },
    { id: 3, name: 'LEAF', image: require('../../../../assets/items/leaf.png') },
    { id: 4, name: 'LEMON', image: require('../../../../assets/items/lemon.png') },
    { id: 5, name: 'LOCK', image: require('../../../../assets/items/lock.png') },
  ];

  useEffect(() => {
    const loadPuzzleStatus = async () => {
      try {
        const storedStatus = await AsyncStorage.getItem('lPuzzleStatus');
        if (storedStatus) {
          setPuzzleStatus(JSON.parse(storedStatus));
        }
      } catch (error) {
        console.error('Failed to load puzzle status:', error);
      }
    };
    
    loadPuzzleStatus();
  }, []);

  const stats = {
    completed: Object.values(puzzleStatus).filter(status => status === 'completed').length,
    wrong: Object.values(puzzleStatus).filter(status => status === 'wrong').length,
    skipped: Object.values(puzzleStatus).filter(status => status === 'skipped').length,
    notAttempted: puzzles.length - Object.values(puzzleStatus).filter(status => status !== null).length
  };

  const completionPercentage = Math.round((stats.completed / puzzles.length) * 100);

  const getStatusBadge = (puzzleId) => {
    const status = puzzleStatus[puzzleId];
    
    if (status === 'completed') {
      return (
        <View style={[styles.statusBadge, styles.completedBadge]}>
          <FontAwesome5 name="check" size={12} color="white" />
        </View>
      );
    } else if (status === 'wrong') {
      return (
        <View style={[styles.statusBadge, styles.wrongBadge]}>
          <FontAwesome5 name="times" size={12} color="white" />
        </View>
      );
    } else if (status === 'skipped') {
      return (
        <View style={[styles.statusBadge, styles.skippedBadge]}>
          <FontAwesome5 name="forward" size={12} color="white" />
        </View>
      );
    }
    return null;
  };

  const getStatusText = (puzzleId) => {
    const status = puzzleStatus[puzzleId];
    
    if (status === 'completed') {
      return "Completed";
    } else if (status === 'wrong') {
      return "Incorrect";
    } else if (status === 'skipped') {
      return "Skipped";
    }
    return "Not Attempted";
  };

  const getStatusColor = (puzzleId) => {
    const status = puzzleStatus[puzzleId];
    
    if (status === 'completed') {
      return "#00C853";
    } else if (status === 'wrong') {
      return "#FF5252";
    } else if (status === 'skipped') {
      return "#FF9800";
    }
    return "#666";
  };

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
          
          <Text style={styles.headerTitle}>L Words Progress</Text>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={require("../../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${completionPercentage}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {stats.completed} of {puzzles.length} puzzles completed ({completionPercentage}%)
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={[styles.statItem, styles.completedStat]}>
            <View style={styles.statIconContainer}>
              <FontAwesome5 name="check-circle" size={24} color="#00C853" />
            </View>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          
          <View style={[styles.statItem, styles.wrongStat]}>
            <View style={styles.statIconContainer}>
              <FontAwesome5 name="times-circle" size={24} color="#FF5252" />
            </View>
            <Text style={styles.statNumber}>{stats.wrong}</Text>
            <Text style={styles.statLabel}>Wrong</Text>
          </View>
          
          <View style={[styles.statItem, styles.skippedStat]}>
            <View style={styles.statIconContainer}>
              <FontAwesome5 name="forward" size={24} color="#FF9800" />
            </View>
            <Text style={styles.statNumber}>{stats.skipped}</Text>
            <Text style={styles.statLabel}>Skipped</Text>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.puzzlesGrid}>
            {puzzles.map((puzzle) => (
              <TouchableOpacity 
                key={puzzle.id}
                style={styles.puzzleCard}
                onPress={() => navigation.navigate(`WordPuzzleScreenL${puzzle.id}`, {
                  word: puzzle.name,
                  image: puzzle.image
                })}
              >
                <View style={styles.puzzleImageContainer}>
                  <Image source={puzzle.image} style={styles.puzzleImage} />
                  {getStatusBadge(puzzle.id)}
                </View>
                <Text style={styles.puzzleName}>{puzzle.name}</Text>
                <Text style={[
                  styles.puzzleStatus, 
                  {color: getStatusColor(puzzle.id)}
                ]}>
                  {getStatusText(puzzle.id)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('AlphabetScreen')}
          >
            <Text style={styles.continueButtonText}>Back to Alphabet</Text>
            <FontAwesome5 name="arrow-right" size={16} color="white" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
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
  backButton: { 
    position: 'absolute', 
    left: 20, 
    zIndex: 10 
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5D3FD3',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#5D3FD3',
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: 'rgba(93, 63, 211, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#5D3FD3',
    borderRadius: 10,
  },
  progressText: {
    textAlign: 'center',
    color: '#5D3FD3',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.28,
    paddingVertical: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    backgroundColor: 'white',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  completedStat: {
    borderLeftWidth: 5,
    borderLeftColor: '#00C853',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
    borderBottomColor: '#e0e0e0',
  },
  wrongStat: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF5252',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
    borderBottomColor: '#e0e0e0',
  },
  skippedStat: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#e0e0e0',
    borderRightColor: '#e0e0e0',
    borderBottomColor: '#e0e0e0',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D3FD3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  puzzlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  puzzleCard: {
    width: width * 0.43,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  puzzleImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  puzzleImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  statusBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  completedBadge: {
    backgroundColor: '#00C853',
  },
  wrongBadge: {
    backgroundColor: '#FF5252',
  },
  skippedBadge: {
    backgroundColor: '#FF9800',
  },
  puzzleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D3FD3',
    marginBottom: 5,
  },
  puzzleStatus: {
    fontSize: 14,
    fontWeight: '500',
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