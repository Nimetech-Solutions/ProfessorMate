import React, { useState, useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function SimpleTense() {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  
  // Animation references
  const floatAnim = useRef(new Animated.Value(0)).current;
  
  // Start floating animation for panda
  const startFloatingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    ).start();
  };

  useEffect(() => {
    // Animate in the elements when component mounts
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Start floating animation for panda
    startFloatingAnimation();
  }, []);

  // Formula cards data - simplified for children
  const formulaCards = [
    {
      type: "Positive",
      formula: "I/You/We/They + verb + ed",
      example: "I walked to school.",
      color: "#8fe0ff",
      textColor: "#333"
    },
    {
      type: "Question",
      formula: "Did + I/you/we/they + verb?",
      example: "Did you play yesterday?",
      color: "#FFD966",
      textColor: "#333"
    },
    {
      type: "Negative",
      formula: "I/You/We/They + didn't + verb",
      example: "They didn't go to the park.",
      color: "#FFB570",
      textColor: "#333"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header with Back Button and Profile */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Simple Past Tense</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileCircle}>
            <Image 
              source={require("../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Main Content - Wrapped in ScrollView for small screens */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content wrapper with proper spacing */}
        <View style={styles.contentWrapper}>
          {/* Explanation Card */}
          <Animated.View 
            style={[
              styles.explanationCard,
              {
                opacity: animation,
                transform: [
                  { scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <View style={styles.speechBubble}>
              <Text style={styles.explanationText}>
                The <Text style={styles.boldItalicText}>simple past tense</Text> tells us what happened before now. 
                We add <Text style={styles.boldText}>-ed</Text> to regular verbs.
              </Text>
              <Text style={styles.explanationExample}>
                walk → walked • play → played
              </Text>
            </View>
            
            <View style={styles.speechPointer} />
          </Animated.View>
          
          {/* Panda positioned properly relative to the speech bubble */}
          <Animated.View 
            style={[
              styles.pandaContainer,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: floatAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -8]
                    })
                  }
                ]
              }
            ]}
          >
            <Image
              source={require("../../../assets/items/panda.png")}
              style={styles.pandaImage}
              resizeMode="contain"
            />
          </Animated.View>
          
          {/* Formula Cards with proper spacing */}
          <View style={styles.formulaContainer}>
            {formulaCards.map((card, index) => (
              <Animated.View 
                key={card.type}
                style={[
                  styles.formulaCardContainer,
                  {
                    opacity: animation,
                    transform: [
                      { 
                        translateY: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20 * (index + 1), 0]
                        })
                      }
                    ]
                  }
                ]}
              >
                <View style={[styles.formulaCard, { backgroundColor: card.color }]}>
                  <View style={styles.formulaLabelContainer}>
                    <Text style={[styles.formulaLabel, { color: card.textColor }]}>{card.type}</Text>
                  </View>
                  <Text style={[styles.formulaText, { color: card.textColor }]}>{card.formula}</Text>
                  <Text style={[styles.exampleText, { color: card.textColor }]}>{card.example}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Continue Button - Fixed at bottom */}
      <View style={styles.buttonContainer}>
        <Animated.View 
          style={{
            opacity: animation,
            width: '100%',
            transform: [{ 
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }]
          }}
        >
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => {
              // Provide haptic feedback
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              
              // Navigate to SimplePastTenseAffirmative screen
              navigation.navigate("SimplePastTenseAffirmative");
            }}
          >
            <LinearGradient
              colors={["#ff1493", "#ff69b4"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.04,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: "#fff",
    height: 56, // Match the header height in image
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    flex: 1, // Take up available space
    marginLeft: 15, // Align center properly
  },
  profileButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1a73e8", // Blue circle background from image 2
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.03,
    paddingTop: height * 0.02,
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  explanationCard: {
    width: "100%",
    alignItems: "center",
    marginBottom: height * 0.05,
    position: "relative",
    zIndex: 1,
  },
  speechBubble: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: width * 0.05,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  explanationText: {
    fontSize: Math.min(width * 0.045, 18),
    lineHeight: Math.min(width * 0.06, 24),
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  explanationExample: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "500",
    color: "#2D31FA",
    textAlign: "center",
  },
  boldItalicText: {
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#2D31FA",
  },
  boldText: {
    fontWeight: "bold",
    color: "#2D31FA",
  },
  speechPointer: {
    width: 20,
    height: 20,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    bottom: -10,
    left: "20%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  pandaContainer: {
    width: width * 0.22,
    height: width * 0.22,
    position: "absolute",
    top: height * 0.09,
    left: width * 0.08,
    zIndex: 10,
  },
  pandaImage: {
    width: "100%",
    height: "100%",
  },
  formulaContainer: {
    width: "100%",
    marginTop: height * 0.02,
  },
  formulaCardContainer: {
    marginBottom: height * 0.025,
  },
  formulaCard: {
    width: "100%",
    borderRadius: 15,
    padding: width * 0.045,
    paddingVertical: height * 0.022,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  formulaLabelContainer: {
    alignSelf: "flex-start",
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  formulaLabel: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "bold",
  },
  formulaText: {
    fontSize: Math.min(width * 0.042, 17),
    fontWeight: "600",
    marginBottom: 8,
  },
  exampleText: {
    fontSize: Math.min(width * 0.038, 15),
    fontStyle: "italic",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.035,
    paddingTop: height * 0.02,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    height: Math.min(height * 0.07, 55),
    borderRadius: 30,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    overflow: "hidden",
  },
  continueGradient: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: width * 0.05,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: Math.min(width * 0.05, 18),
    textAlign: "center",
    letterSpacing: 1,
  },
});