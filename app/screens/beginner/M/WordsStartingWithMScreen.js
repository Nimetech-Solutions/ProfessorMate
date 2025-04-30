import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView,
  SafeAreaView,
  Animated,
  Dimensions,
  Platform,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isLargeDevice = width > 414;

export default function WordsStartingWithMScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(width);
  const [selectedWord, setSelectedWord] = useState(null);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Function to play audio for the word
  const playAudio = (word) => {
    setSelectedWord(word);
    // Audio playing functionality would be implemented here
    console.log(`Playing audio for ${word}`);
  };

  // Words starting with M
  const mWords = [
    {
      word: "Monkey",
      image: require("../../../../assets/items/monkey.png")
    },
    {
      word: "Moon",
      image: require("../../../../assets/items/moon.png")
    },
    {
      word: "Mouse",
      image: require("../../../../assets/items/mouse.png")
    },
    {
      word: "Mango",
      image: require("../../../../assets/items/mango.png")
    },
    {
      word: "Map",
      image: require("../../../../assets/items/map.png")
    }
  ];

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={isSmallDevice ? 24 : 30} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>English Alphabet</Text>
        
        <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
          <Image 
            source={require("../../../../assets/items/profile.jpg")} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.Text 
        style={[
          styles.sectionTitle,
          { 
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            })}]
          }
        ]}
      >
        Words Starting With M
      </Animated.Text>
      
      <ScrollView 
        style={styles.wordList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wordListContent}
      >
        {mWords.map((item, index) => (
          <Animated.View 
            key={index} 
            style={[
              styles.wordItem,
              {
                opacity: fadeAnim,
                transform: [{ 
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width]
                  })
                }]
              }
            ]}
          >
            <LinearGradient
              colors={['#FFFFFF', '#F0F8FF']}
              style={styles.imageContainer}
            >
              <Image source={item.image} style={styles.wordImage} />
            </LinearGradient>
            <View style={styles.wordDetails}>
              <Text style={styles.wordText}>{item.word}</Text>
              <TouchableOpacity 
                style={[
                  styles.audioButton,
                  selectedWord === item.word && styles.audioButtonActive
                ]}
                onPress={() => playAudio(item.word)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={selectedWord === item.word ? ['#0056b3', '#007AFF'] : ['#007AFF', '#0056b3']}
                  style={styles.audioButtonGradient}
                >
                  <Ionicons 
                    name={selectedWord === item.word ? "volume-high" : "volume-medium"} 
                    size={isSmallDevice ? 24 : 28} 
                    color="#fff" 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
      
      <Animated.View
        style={[
          styles.continueButtonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })}]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => {
            navigation.navigate('WordPuzzleScreenM1', {
              word: mWords[0].word.toUpperCase(),
              image: mWords[0].image,
            });
          }}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#007AFF', '#0056b3']}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueText}>Continue</Text>
            <Ionicons name="arrow-forward" size={isSmallDevice ? 20 : 24} color="#fff" style={styles.continueIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallDevice ? 15 : 20,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: isSmallDevice ? 20 : 30,
    paddingTop: 10,
  },
  backButton: {
    padding: isSmallDevice ? 8 : 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: isSmallDevice ? 22 : isLargeDevice ? 32 : 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  profileButton: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: isSmallDevice ? 40 : 44,
    height: isSmallDevice ? 40 : 44,
    borderRadius: 22,
  },
  sectionTitle: {
    fontSize: isSmallDevice ? 20 : isLargeDevice ? 28 : 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: isSmallDevice ? 20 : 25,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wordList: {
    flex: 1,
  },
  wordListContent: {
    paddingBottom: 20,
  },
  wordItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: isSmallDevice ? 12 : 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: isSmallDevice ? 12 : 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  imageContainer: {
    width: isSmallDevice ? 80 : 100,
    height: isSmallDevice ? 80 : 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: isSmallDevice ? 12 : 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wordImage: {
    width: isSmallDevice ? 60 : 80,
    height: isSmallDevice ? 60 : 80,
    resizeMode: "contain",
  },
  wordDetails: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  wordText: {
    fontSize: isSmallDevice ? 18 : isLargeDevice ? 26 : 22,
    fontWeight: "bold",
    color: "#333",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  audioButton: {
    width: isSmallDevice ? 40 : 50,
    height: isSmallDevice ? 40 : 50,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  audioButtonActive: {
    transform: [{ scale: 1.1 }],
  },
  audioButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  continueButton: {
    width: isSmallDevice ? "70%" : "80%",
    height: isSmallDevice ? 50 : 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  continueButtonGradient: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: isSmallDevice ? 16 : 18,
    textAlign: "center",
    marginRight: 10,
  },
  continueIcon: {
    marginLeft: 5,
  }
});