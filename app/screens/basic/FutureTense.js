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
  StatusBar,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function FutureTense() {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  
  // Animation references
  const floatAnim = useRef(new Animated.Value(0)).current;
  const wiggleAnim = useRef(new Animated.Value(0)).current;
  
  // Start floating animation for character
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

  // Start wiggle animation for character
  const startWiggleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wiggleAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(wiggleAnim, {
          toValue: -1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(wiggleAnim, {
          toValue: 0,
          duration: 800,
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
    
    // Start floating and wiggle animations
    startFloatingAnimation();
    startWiggleAnimation();
  }, []);

  // Formula cards data - simplified for children
  const formulaCards = [
    {
      type: "Positive",
      formula: "will + verb",
      example: "I will play tomorrow.",
      color: "#83CAFF",
      textColor: "#333",
      icon: "sunny-outline"
    },
    {
      type: "Question",
      formula: "Will + subject + verb?",
      example: "Will you visit next week?",
      color: "#FFD966",
      textColor: "#333",
      icon: "help-circle-outline"
    },
    {
      type: "Negative",
      formula: "will not (won't) + verb",
      example: "They won't go to the park.",
      color: "#FFB570",
      textColor: "#333",
      icon: "close-circle-outline"
    },
    {
      type: "Going to",
      formula: "am/is/are + going to + verb",
      example: "We are going to travel.",
      color: "#B4F8C8",
      textColor: "#333",
      icon: "airplane-outline"
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      {/* Header with Back Button and Profile */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Future Tense</Text>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <View style={styles.profileCircle}>
            <Image 
              source={require("../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </View>
        </TouchableOpacity>
      </View>
      
      {/* Main Content - Wrapped in ScrollView */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Content wrapper with proper spacing */}
        <View style={styles.contentWrapper}>
          {/* Character and Explanation Card - Owl on RIGHT, Explanation on LEFT */}
          <View style={styles.characterExplanationContainer}>
            {/* Explanation Bubble on LEFT */}
            <Animated.View 
              style={[
                styles.explanationCardContainer,
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
              <View style={styles.explanationBubble}>
                <Text style={styles.explanationTitle}>Future Tense</Text>
                <Text style={styles.explanationText}>
                  The <Text style={styles.highlightText}>future tense</Text> tells us 
                  about things that <Text style={styles.highlightText}>will happen</Text> later.
                </Text>
                <Text style={styles.explanationExamples}>
                  We use <Text style={styles.highlightText}>will</Text> or <Text style={styles.highlightText}>going to</Text> + the main verb.
                </Text>
              </View>
              
              {/* Pointer pointing RIGHT toward the owl */}
              <View style={styles.bubblePointer} />
            </Animated.View>
            
            {/* Character positioned on the RIGHT */}
            <Animated.View 
              style={[
                styles.characterContainer,
                {
                  opacity: animation,
                  transform: [
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -10]
                      })
                    },
                    {
                      rotate: wiggleAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: ['-5deg', '0deg', '5deg']
                      })
                    }
                  ]
                }
              ]}
            >
              <Image
                source={require("../../../assets/items/owl.png")}
                style={styles.characterImage}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          
          {/* Time indicators for future tense */}
          <Animated.View
            style={[
              styles.timeIndicatorsContainer,
              {
                opacity: animation,
                transform: [{ 
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }]
              }
            ]}
          >
            <View style={styles.timelineBar}>
              <View style={styles.timelineDot}>
                <Text style={styles.timeIndicator}>Tomorrow</Text>
              </View>
              <View style={styles.timelineDot}>
                <Text style={styles.timeIndicator}>Next week</Text>
              </View>
              <View style={styles.timelineDot}>
                <Text style={styles.timeIndicator}>In the future</Text>
              </View>
            </View>
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
                <TouchableOpacity
                  activeOpacity={0.95}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  style={[styles.formulaCard, { backgroundColor: card.color }]}
                >
                  <View style={styles.formulaHeader}>
                    <View style={styles.formulaLabelContainer}>
                      <Text style={[styles.formulaLabel, { color: card.textColor }]}>{card.type}</Text>
                    </View>
                    
                    <Ionicons name={card.icon} size={24} color={card.textColor} style={styles.formulaIcon} />
                  </View>
                  
                  <Text style={[styles.formulaText, { color: card.textColor }]}>{card.formula}</Text>
                  <Text style={[styles.exampleText, { color: card.textColor }]}>{card.example}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          
          {/* Tips section */}
          <Animated.View 
            style={[
              styles.tipsContainer,
              {
                opacity: animation,
                transform: [{ 
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                  })
                }]
              }
            ]}
          >
            <View style={styles.tipCard}>
              <View style={styles.tipIconContainer}>
                <Ionicons name="bulb-outline" size={24} color="#FFD700" />
              </View>
              <Text style={styles.tipTitle}>Remember!</Text>
              <Text style={styles.tipText}>
                We use <Text style={styles.boldText}>will</Text> for promises, predictions, and decisions made in the moment.
              </Text>
              <Text style={styles.tipText}>
                We use <Text style={styles.boldText}>going to</Text> for plans and intentions we already have.
              </Text>
            </View>
          </Animated.View>
          
          {/* Extra space at bottom to ensure everything is visible above the button */}
          <View style={styles.bottomSpacing} />
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
              
              // Navigate to practice screen
              navigation.navigate("FutureTensePuzzleScreen1");
            }}
          >
            <LinearGradient
              colors={["#4D31FA", "#2D31FA"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.continueGradient}
            >
              <Text style={styles.continueText}>Continue</Text>
              <Ionicons name="arrow-forward" size={22} color="#fff" style={styles.continueIcon} />
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
    paddingTop: Platform.OS === 'ios' ? 10 : 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: "#fff",
    height: Platform.OS === 'ios' ? 56 : 65,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: Math.min(width * 0.055, 22),
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    fontFamily: Platform.OS === 'ios' ? "System" : "Roboto",
    flex: 1,
    marginLeft: 15,
  },
  profileButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.025,
    paddingBottom: Platform.OS === 'ios' ? height * 0.12 : height * 0.14,
  },
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  characterExplanationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    marginBottom: height * 0.035,
    position: "relative",
    gap: width * 0.01,
    paddingHorizontal: width * 0.02,
  },
  characterContainer: {
    width: width * 0.22,
    height: width * 0.22,
    marginTop: 10,
    alignItems: "center",
    marginLeft: -width * 0.02,
  },
  characterImage: {
    width: "100%",
    height: "100%",
  },
  explanationCardContainer: {
    width: "75%",
    position: "relative",
  },
  explanationBubble: {
    backgroundColor: "#E6F7FF",
    borderRadius: 20,
    padding: width * 0.04,
    borderWidth: 1,
    borderColor: "#BFE3FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: "bold",
    color: "#2D31FA",
    marginBottom: 8,
    textAlign: "center",
  },
  explanationText: {
    fontSize: Math.min(width * 0.04, 16),
    lineHeight: Math.min(width * 0.055, 22),
    color: "#333",
    marginBottom: 8,
  },
  explanationExamples: {
    fontSize: Math.min(width * 0.04, 16),
    lineHeight: Math.min(width * 0.055, 22),
    color: "#333",
  },
  highlightText: {
    fontWeight: "bold",
    color: "#2D31FA",
  },
  bubblePointer: {
    width: 20,
    height: 20,
    backgroundColor: "#E6F7FF",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#BFE3FF",
    transform: [{ rotate: "315deg" }], 
    position: "absolute",
    top: "30%",
    right: -10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  timeIndicatorsContainer: {
    marginVertical: height * 0.02,
    marginTop: 5,
  },
  timelineBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
    borderRadius: 15,
    padding: 12,
    paddingVertical: 14,
    marginHorizontal: width * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timelineDot: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#4D31FA",
    borderRadius: 12,
  },
  timeIndicator: {
    color: "white",
    fontWeight: "600",
    fontSize: Math.min(width * 0.035, 14),
  },
  formulaContainer: {
    width: "100%",
    marginBottom: height * 0.03,
    gap: height * 0.022,
  },
  formulaCardContainer: {
    // Removed marginBottom as we're using gap in the parent container
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
  formulaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  formulaLabelContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  formulaLabel: {
    fontSize: Math.min(width * 0.04, 16),
    fontWeight: "bold",
  },
  formulaIcon: {
    marginRight: 5,
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
  tipsContainer: {
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
  },
  tipCard: {
    backgroundColor: "#FFFBEA",
    borderRadius: 15,
    padding: width * 0.045,
    paddingVertical: height * 0.025,
    borderWidth: 1,
    borderColor: "#FFE7A0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tipIconContainer: {
    alignSelf: "center",
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: "bold",
    color: "#FF9500",
    marginBottom: 8,
    textAlign: "center",
  },
  tipText: {
    fontSize: Math.min(width * 0.038, 15),
    lineHeight: Math.min(width * 0.055, 22),
    color: "#333",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  bottomSpacing: {
    height: height * 0.05,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
    paddingBottom: Platform.OS === 'ios' ? height * 0.035 : height * 0.025,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  continueButton: {
    height: Math.min(height * 0.07, 55),
    borderRadius: 30,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#4D31FA",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
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
    fontSize: Math.min(width * 0.045, 18),
    textAlign: "center",
    letterSpacing: 1,
  },
  continueIcon: {
    marginLeft: 8,
  },
});