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
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function SimpleTenseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [animation] = useState(new Animated.Value(0));
  const [selectedTenseType, setSelectedTenseType] = useState(null);
  
  // Animation references
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1)
  ]).current;
  
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
      Animated.timing(scaleAnims[index], {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        friction: 3,
        tension: 40,
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

  // Define tense options with child-friendly colors and icons
  const tenseTypeOptions = [
    {
      name: "Simple Present Tense",
      colors: ["#8fe0ff", "#38b6ff"],
      icon: "🌞", // Sun for present (today)
      description: "Things happening now"
    },
    {
      name: "Simple Past Tense",
      colors: ["#ffb6c1", "#ff69b4"],
      icon: "🕰️", // Clock for past
      description: "Things that already happened"
    },
    {
      name: "Simple Future Tense",
      colors: ["#b0e57c", "#56ab2f"],
      icon: "🚀", // Rocket for future
      description: "Things that will happen"
    }
  ];

  const handleTenseTypeSelection = (tenseType, index) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animate button
    animateBounce(index);
    
    // Update selected tense type
    setSelectedTenseType(tenseType.name);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header with Back Button and Profile */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Simple Tense</Text>
          
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
                {selectedTenseType ? `Great choice! 👍` : `Pick a tense by tapping it! 👇`}
              </Text>
            </Animated.View>
          </View>
          
          {/* Tense Type Options */}
          <View style={styles.optionsContainer}>
            {tenseTypeOptions.map((tenseType, index) => (
              <Animated.View 
                key={tenseType.name}
                style={{
                  opacity: animation,
                  transform: [
                    { 
                      translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40 * (index + 1), 0]
                      })
                    },
                    { scale: scaleAnims[index] }
                  ]
                }}
              >
                <TouchableOpacity 
                  style={styles.tenseOption}
                  activeOpacity={0.8}
                  onPress={() => handleTenseTypeSelection(tenseType, index)}
                >
                  <LinearGradient
                    colors={tenseType.colors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={[
                      styles.tenseGradient,
                      selectedTenseType === tenseType.name && styles.selectedGradient
                    ]}
                  >
                    <View style={styles.tenseIconContainer}>
                      <Text style={styles.tenseIcon}>{tenseType.icon}</Text>
                    </View>
                    <View style={styles.tenseTextContainer}>
                      <Text style={styles.tenseText}>{tenseType.name}</Text>
                      <Text style={styles.tenseDescription}>{tenseType.description}</Text>
                    </View>
                    {selectedTenseType === tenseType.name && (
                      <View style={styles.checkmarkContainer}>
                        <Ionicons name="checkmark-circle" size={28} color="#fff" />
                      </View>
                    )}
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
                selectedTenseType ? styles.continueButtonActive : styles.continueButtonInactive
              ]}
              disabled={!selectedTenseType}
              onPress={() => {
                // Provide haptic feedback
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                
                // Navigate to the SimplePresent screen instead of TenseDetails
                if (selectedTenseType === "Simple Present Tense") {
                  navigation.navigate("SimplePresent");
                } else if (selectedTenseType === "Simple Past Tense") {
                  navigation.navigate("SimplePast");
                } else if (selectedTenseType === "Simple Future Tense") {
                  navigation.navigate("FutureTense");
                } else {
                  // For other tense types, you might want to navigate to different screens
                  // For now, just show an alert that this is not implemented
                  alert(`${selectedTenseType} screen is not implemented yet`);
                }}}
            >
              <LinearGradient
                colors={selectedTenseType ? ["#6a3de8", "#4421cc"] : ["#a0a0a0", "#808080"]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.continueGradient}
              >
                <Text style={styles.continueText}>Let's Go!</Text>
                {selectedTenseType && <Ionicons name="arrow-forward" size={22} color="#fff" style={styles.continueIcon} />}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: 0.5,
  },
  profileButton: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#333",
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
    marginBottom: 20,
    height: 160,
    position: "relative",
  },
  pandaContainer: {
    alignItems: "center",
    position: "relative",
    width: width * 0.4,
    height: 160,
  },
  pandaImage: {
    width: 160,
    height: 160,
    marginRight: width * 0.1,
  },
  speechBubble: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    maxWidth: width * 0.5,
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
    borderRightColor: "#333",
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
    marginVertical: 20,
  },
  tenseOption: {
    width: "100%",
    height: 80,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  tenseGradient: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  selectedGradient: {
    borderWidth: 3,
    borderColor: "#333",
  },
  tenseIconContainer: {
    marginRight: 15,
  },
  tenseIcon: {
    fontSize: 28,
  },
  tenseTextContainer: {
    flex: 1,
  },
  tenseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tenseDescription: {
    fontSize: 14,
    color: "#333",
    opacity: 0.8,
    marginTop: 2,
  },
  checkmarkContainer: {
    marginLeft: 10,
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
    marginTop: 10,
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
    paddingHorizontal: 20,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  continueIcon: {
    marginLeft: 10,
  }
});