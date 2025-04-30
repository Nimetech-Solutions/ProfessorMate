import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, ScrollView, 
  Image, Dimensions, ActivityIndicator, Animated 
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get('window');

export default function OverallProgressScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [alphabetProgress, setAlphabetProgress] = useState({});
  const [overallStats, setOverallStats] = useState({
    completed: 0,
    wrong: 0,
    skipped: 0,
    notAttempted: 0,
    totalPuzzles: 0
  });

  // The alphabet array for iteration
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  useEffect(() => {
    const loadAllProgress = async () => {
      try {
        let progressData = {};
        let totalCompleted = 0;
        let totalWrong = 0;
        let totalSkipped = 0;
        let totalPuzzles = 0;
        let totalNotAttempted = 0;

        // Load data for each alphabet
        for (const alphabet of alphabets) {
          const puzzleStatusKey = `${alphabet.toLowerCase()}PuzzleStatus`;
          const storedStatus = await AsyncStorage.getItem(puzzleStatusKey);
          
          // Default puzzle count per alphabet category (can be adjusted based on your actual data)
          const puzzlesPerAlphabet = 5;
          totalPuzzles += puzzlesPerAlphabet;
          
          if (storedStatus) {
            const parsedStatus = JSON.parse(storedStatus);
            
            // Count statuses
            const completed = Object.values(parsedStatus).filter(status => status === 'completed').length;
            const wrong = Object.values(parsedStatus).filter(status => status === 'wrong').length;
            const skipped = Object.values(parsedStatus).filter(status => status === 'skipped').length;
            const notAttempted = puzzlesPerAlphabet - completed - wrong - skipped;
            
            // Update total counts
            totalCompleted += completed;
            totalWrong += wrong;
            totalSkipped += skipped;
            totalNotAttempted += notAttempted;
            
            // Calculate completion percentage
            const completionPercentage = Math.round((completed / puzzlesPerAlphabet) * 100);
            
            // Add to progressData
            progressData[alphabet] = {
              completed,
              wrong,
              skipped,
              notAttempted,
              completionPercentage,
              totalPuzzles: puzzlesPerAlphabet
            };
          } else {
            // No data found for this alphabet
            totalNotAttempted += puzzlesPerAlphabet;
            
            progressData[alphabet] = {
              completed: 0,
              wrong: 0,
              skipped: 0,
              notAttempted: puzzlesPerAlphabet,
              completionPercentage: 0,
              totalPuzzles: puzzlesPerAlphabet
            };
          }
        }
        
        // Set overall stats
        setOverallStats({
          completed: totalCompleted,
          wrong: totalWrong,
          skipped: totalSkipped,
          notAttempted: totalNotAttempted,
          totalPuzzles
        });
        
        // Set alphabet progress
        setAlphabetProgress(progressData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load overall progress:', error);
        setLoading(false);
      }
    };
    
    loadAllProgress();
  }, []);

  // Calculate overall completion percentage
  const overallCompletionPercentage = Math.round(
    (overallStats.completed / overallStats.totalPuzzles) * 100
  ) || 0;

  // Get status color based on completion percentage
  const getStatusColor = (percentage) => {
    if (percentage === 0) return '#CCCCCC';
    if (percentage < 30) return '#FF5252';
    if (percentage < 70) return '#FFC107';
    return '#00C853';
  };

  // Get icon for alphabet categories
  const getAlphabetIcon = (alphabet, percentage) => {
    if (percentage === 100) {
      return <FontAwesome5 name="star" size={16} color="#FFD700" />;
    } else if (percentage > 0) {
      return <FontAwesome5 name="star-half-alt" size={16} color="#FFD700" />;
    }
    return <FontAwesome5 name="star" size={16} color="#CCCCCC" />;
  };

  // Render individual alphabet category card
  const renderCategoryCard = (alphabet) => {
    const progress = alphabetProgress[alphabet] || { 
      completionPercentage: 0, 
      completed: 0, 
      totalPuzzles: 5 
    };
    
    return (
      <TouchableOpacity 
        key={alphabet}
        style={styles.categoryCard}
        onPress={() => navigation.navigate(`${alphabet}PuzzleProgressScreen`)}
      >
        <View 
          style={[
            styles.categoryLetterContainer, 
            {backgroundColor: getStatusColor(progress.completionPercentage)}
          ]}
        >
          <Text style={styles.categoryLetter}>{alphabet}</Text>
        </View>
        
        <View style={styles.categoryInfo}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryName}>{alphabet} Words</Text>
            {getAlphabetIcon(alphabet, progress.completionPercentage)}
          </View>
          
          <Text style={styles.categorySubtitle}>
            {progress.completed} of {progress.totalPuzzles} puzzles completed
          </Text>
          
          <View style={styles.categoryProgressBarContainer}>
            <View style={styles.categoryProgressBar}>
              <View 
                style={[
                  styles.categoryProgressFill,
                  {
                    width: `${progress.completionPercentage}%`,
                    backgroundColor: getStatusColor(progress.completionPercentage)
                  }
                ]}
              />
            </View>
            <Text style={styles.categoryPercentage}>
              {progress.completionPercentage}%
            </Text>
          </View>
        </View>
        
        <View style={styles.categoryArrow}>
          <Ionicons name="chevron-forward" size={24} color="#5D3FD3" />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5D3FD3" />
        <Text style={styles.loadingText}>Loading progress data...</Text>
      </SafeAreaView>
    );
  }

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
          
          <Text style={styles.headerTitle}>Alphabet Journey</Text>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={require("../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.overallProgressContainer}>
            <Text style={styles.overallProgressTitle}>Overall Progress</Text>
            
            <View style={styles.progressCircleContainer}>
              <Progress.Circle
                size={120}
                progress={overallCompletionPercentage / 100}
                thickness={12}
                color="#5D3FD3"
                unfilledColor="rgba(93, 63, 211, 0.2)"
                borderWidth={0}
                showsText={true}
                formatText={() => `${overallCompletionPercentage}%`}
                textStyle={styles.progressCircleText}
              />
              
              <View style={styles.progressStatsContainer}>
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatNumber}>{overallStats.completed}</Text>
                  <Text style={styles.progressStatLabel}>Completed</Text>
                </View>
                
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatNumber}>{overallStats.totalPuzzles}</Text>
                  <Text style={styles.progressStatLabel}>Total</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={[styles.statItem, styles.completedStat]}>
              <View style={styles.statIconContainer}>
                <FontAwesome5 name="check-circle" size={24} color="#00C853" />
              </View>
              <Text style={styles.statNumber}>{overallStats.completed}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            
            <View style={[styles.statItem, styles.wrongStat]}>
              <View style={styles.statIconContainer}>
                <FontAwesome5 name="times-circle" size={24} color="#FF5252" />
              </View>
              <Text style={styles.statNumber}>{overallStats.wrong}</Text>
              <Text style={styles.statLabel}>Wrong</Text>
            </View>
            
            <View style={[styles.statItem, styles.skippedStat]}>
              <View style={styles.statIconContainer}>
                <FontAwesome5 name="forward" size={24} color="#FF9800" />
              </View>
              <Text style={styles.statNumber}>{overallStats.skipped}</Text>
              <Text style={styles.statLabel}>Skipped</Text>
            </View>
          </View>

          {/* Alphabet Categories Section - Now showing all categories */}
          <View style={styles.categorySectionContainer}>
            <View style={styles.categoryTitleContainer}>
              <Text style={styles.categoryTitle}>Alphabet Categories</Text>
            </View>
            
            {/* Show all alphabet categories */}
            <View style={styles.allCategoriesContainer}>
              {alphabets.map(alphabet => renderCategoryCard(alphabet))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('AlphabetScreen')}
          >
            <Text style={styles.continueButtonText}>Back to All Puzzles</Text>
            <FontAwesome5 name="th-large" size={16} color="white" style={styles.buttonIcon} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f6ff',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#5D3FD3',
    fontWeight: '600',
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
  mainScrollView: {
    flex: 1,
  },
  overallProgressContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  overallProgressTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D3FD3',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  progressCircleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D3FD3',
  },
  progressStatsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  progressStat: {
    alignItems: 'center',
    marginVertical: 5,
  },
  progressStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D3FD3',
  },
  progressStatLabel: {
    fontSize: 14,
    color: '#666',
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
  categorySectionContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  allCategoriesContainer: {
    // Container for all categories
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryLetterContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryLetter: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginRight: 8,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#5D3FD3',
    width: 40,
  },
  categoryArrow: {
    marginLeft: 5,
  },
  buttonContainer: {
    padding: 20,
  },
  continueButton: {
    backgroundColor: '#5D3FD3',
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