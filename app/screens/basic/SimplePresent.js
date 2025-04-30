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

export default function SimplePresent() {
  const navigation = useNavigation();
  const route = useRoute();
  const [animation] = useState(new Animated.Value(0));
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

  // Rules for Simple Present Tense
  const simplePresentRules = [
    {
      rule: "S + V(s/es) + O.",
      example: "She reads books.",
      colors: ["#ffb6c1", "#ff69b4"]
    },
    {
      rule: "S + don't/doesn't + V (base form) + O.",
      example: "He doesn't play soccer.",
      colors: ["#b0e57c", "#56ab2f"]
    },
    {
      rule: "Do/does + S + V(base form) + O?",
      example: "Do you like pizza?",
      colors: ["#8fe0ff", "#38b6ff"]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button and Profile */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Simple Present Tense</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={require("../../../assets/items/profile.jpg")} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
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
          <Text style={styles.explanationTitle}>
            The <Text style={styles.highlightText}>"simple present tense"</Text> is a verb tense used to describe actions or events that happen regularly, are facts, or are unchanging situations
          </Text>
          <View style={styles.cardPandaContainer}>
            <Image 
              source={require("../../../assets/items/panda.png")} 
              style={styles.cardPandaImage} 
              resizeMode="contain"
            />
          </View>
        </Animated.View>
        
        {/* Rules Section - Now Static */}
        <View style={styles.rulesSectionTitle}>
          <Text style={styles.rulesTitle}>Formula</Text>
        </View>
        
        <View style={styles.rulesContainer}>
          {simplePresentRules.map((rule, index) => (
            <Animated.View 
              key={rule.rule}
              style={{
                opacity: animation,
                transform: [
                  { 
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30 * (index + 1), 0]
                    })
                  }
                ]
              }}
            >
              <View style={styles.ruleCard}>
                <LinearGradient
                  colors={rule.colors}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.ruleGradient}
                >
                  <View style={styles.ruleTextContainer}>
                    <Text style={styles.ruleText}>{rule.rule}</Text>
                    <Text style={styles.exampleText}>{rule.example}</Text>
                  </View>
                </LinearGradient>
              </View>
            </Animated.View>
          ))}
        </View>
      </View>
      
      {/* Continue Button */}
      <View style={styles.buttonContainer}>
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
            style={styles.continueButton}
            onPress={() => {
              // Provide haptic feedback
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              
              // Navigate to practice screen
              navigation.navigate("SimplePresentAffirmative");
            }}
          >
            <LinearGradient
              colors={["#6a3de8", "#4421cc"]}
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.035,
    marginTop: height * 0.02,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.01,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: width * 0.06,
    fontWeight: "800",
    color: "#333",
    textAlign: "center",
    fontFamily: "System",
    letterSpacing: 0.8,
    textShadowColor: 'rgba(106, 61, 232, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  profileButton: {
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#6a3de8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  // Explanation Card
  explanationCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: width * 0.05,
    marginBottom: height * 0.025,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#333",
    position: "relative",
  },
  explanationTitle: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
    lineHeight: 26,
    paddingRight: width * 0.2,
  },
  highlightText: {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#6a3de8",
  },
  cardPandaContainer: {
    position: "absolute",
    right: -10,
    bottom: -20,
    width: width * 0.25,
    height: width * 0.25,
  },
  cardPandaImage: {
    width: width * 0.25,
    height: width * 0.25,
  },
  // Rules Section
  rulesSectionTitle: {
    marginBottom: height * 0.015,
  },
  rulesTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  rulesContainer: {
    marginBottom: height * 0.02,
  },
  ruleCard: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: height * 0.015,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ruleGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.05,
    borderRadius: 16,
  },
  ruleTextContainer: {
    flex: 1,
  },
  ruleText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  exampleText: {
    fontSize: width * 0.035,
    color: "#333",
    fontStyle: "italic",
  },
  // Button Container at the bottom
  buttonContainer: {
    width: "100%",
    paddingBottom: height * 0.03,
  },
  // Continue Button
  continueButton: {
    height: height * 0.07,
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
    fontSize: width * 0.05,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  continueIcon: {
    marginLeft: 10,
  }
});