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
  Easing
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function TensesScreen() {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));
  const [selectedTense, setSelectedTense] = useState(null);
  
  // Animation references
  const bounceAnim = useRef(new Animated.Value(0)).current;
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

  // Bounce animation for buttons
  const animateBounce = (index) => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
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

  // Define tense options with colors and icons
  const tenseOptions = [
    {
      name: "Simple Tense",
      colors: ["#8fe0ff", "#38b6ff"],
      icon: "🕒"
    },
    {
      name: "Continuous Tense",
      colors: ["#ffcc99", "#ff9966"],
      icon: "⏳"
    },
    {
      name: "Perfect Tense",
      colors: ["#b8e986", "#5ed357"],
      icon: "✓"
    },
    {
      name: "Perfect Continuous Tense",
      colors: ["#c29ffc", "#9b6dff"],
      icon: "🔄"
    }
  ];

  const handleTenseSelection = (tense, index) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animate button
    animateBounce(index);
    
    // Update selected tense
    setSelectedTense(tense.name);
  };

  return (
    <LinearGradient
      colors={["#f0f9ff", "#e6f7ff"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Button and Profile */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-circle" size={32} color="#0072ff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Tenses</Text>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={require("../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Character and Speech Section */}
          <View style={styles.characterSection}>
            {/* Panda Image */}
            <Animated.View 
              style={[
                styles.pandaContainer,
                {
                  opacity: animation,
                  transform: [
                    { scale: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1]
                      })
                    },
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -10]
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
            
            {/* Speech Bubble */}
            <Animated.View 
              style={[
                styles.speechBubble,
                {
                  opacity: animation,
                  transform: [
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -5]
                      })
                    }
                  ]
                }
              ]}
            >
              <View style={styles.speechBubbleTail} />
              <Text style={styles.speechText}>
                {selectedTense ? `You selected: ${selectedTense}` : "Select the Tense!"}
              </Text>
            </Animated.View>
          </View>
          
          {/* Tense Options */}
          <View style={styles.optionsContainer}>
            {tenseOptions.map((tense, index) => (
              <Animated.View 
                key={tense.name}
                style={{
                  opacity: animation,
                  transform: [{ 
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [40 * (index + 1), 0]
                    })
                  }]
                }}
              >
                <TouchableOpacity 
                  style={[
                    styles.tenseOption,
                    selectedTense === tense.name && styles.selectedOption
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleTenseSelection(tense, index)}
                >
                  <LinearGradient
                    colors={tense.colors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.tenseGradient}
                  >
                    <View style={styles.iconContainer}>
                      <Text style={styles.tenseIcon}>{tense.icon}</Text>
                    </View>
                    <Text style={styles.tenseText}>{tense.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          
          {/* Continue Button */}
          <Animated.View 
            style={{
              opacity: animation,
              transform: [{ 
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0]
                })
              }]
            }}
          >
            <TouchableOpacity 
              style={[
                styles.continueButton,
                selectedTense ? styles.continueButtonActive : styles.continueButtonInactive
              ]}
              disabled={!selectedTense}
              onPress={() => {
                // Provide haptic feedback
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                
                // Navigate based on the selected tense
                if (selectedTense === "Simple Tense") {
                  navigation.navigate("SimpleTenseScreen");
                } else {
                  navigation.navigate("TenseDetails", { tense: selectedTense });
                }
              }}
            >
              <LinearGradient
                colors={selectedTense ? ["#4776E6", "#0024cb"] : ["#8498c7", "#5a6c9b"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.continueGradient}
              >
                <Text style={styles.continueText}>Continue</Text>
                <Ionicons name="arrow-forward-outline" size={24} color="#fff" style={styles.continueIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: 1,
  },
  profileButton: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#0072ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  // Character and speech bubble section
  characterSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 15,
    height: 140,
    position: "relative",
  },
  pandaContainer: {
    alignItems: "center",
    position: "relative",
    width: width * 0.4,
    height: 140,
  },
  pandaImage: {
    width: 130,
    height: 130,
    marginRight: width * 0.1,
  },
  speechBubble: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#0072ff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    maxWidth: width * 0.55,
    minWidth: width * 0.45,
  },
  speechBubbleTail: {
    position: "absolute",
    bottom: 15,
    left: -15,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 15,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#0072ff",
  },
  speechText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  tenseOption: {
    width: "100%",
    height: 65,  // Consistent height for all buttons
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 20, // Equal spacing between buttons
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  selectedOption: {
    transform: [{scale: 1.03}],
    borderWidth: 3,
    borderColor: "#ffd700",
  },
  tenseGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    height: "100%",
    borderRadius: 25,
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  tenseIcon: {
    fontSize: 24,
  },
  tenseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textShadowColor: 'rgba(255, 255, 255, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  continueButton: {
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
    overflow: "hidden",
    marginTop: 15,
  },
  continueButtonActive: {
    opacity: 1,
  },
  continueButtonInactive: {
    opacity: 0.7,
  },
  continueGradient: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 0.5,
    marginRight: 10,
  },
  continueIcon: {
    marginLeft: 5,
  }
});