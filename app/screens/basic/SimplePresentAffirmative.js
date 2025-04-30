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

export default function SimplePresentAffirmative() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedPronoun, setSelectedPronoun] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  // Animation references
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef({
    singular: new Animated.Value(1),
    plural: new Animated.Value(1),
  }).current;
  
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

  // Bounce animation for rules
  const animateBounce = (type) => {
    Animated.sequence([
      Animated.timing(scaleAnims[type], {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[type], {
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
    
    // Start floating animation for character
    startFloatingAnimation();
  }, []);

  // Subject pronouns
  const subjectPronouns = {
    plural: ["I", "We", "You", "They"],
    singular: ["He", "She", "It"]
  };

  const handlePronounSelection = (pronoun, type) => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Animate rule
    animateBounce(type);
    
    // Update selected pronoun
    setSelectedPronoun(pronoun);
  };

  // Example sentences for each pronoun
  const examples = {
    "I": "I play soccer every weekend.",
    "We": "We study English together.",
    "You": "You drink water after exercise.",
    "They": "They visit their grandparents often.",
    "He": "He watches TV in the evening.",
    "She": "She teaches math at school.",
    "It": "It rains a lot in spring."
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button and Title */}
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

      {/* Affirmative Title */}
      <Animated.View 
        style={[
          styles.affirmativeContainer,
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
        <LinearGradient
          colors={["#8a65ff", "#6a3de8"]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.affirmativeGradient}
        >
          <Text style={styles.affirmativeText}>Affirmative (+)</Text>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* First Rule - Plural Pronouns */}
        <Animated.View 
          style={[
            styles.ruleSection,
            {
              opacity: animation,
              transform: [
                { 
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0]
                  })
                },
                { scale: scaleAnims.plural }
              ]
            }
          ]}
        >
          <View style={styles.pronounsContainer}>
            {subjectPronouns.plural.map((pronoun, index) => (
              <TouchableOpacity
                key={pronoun}
                style={[
                  styles.pronounButton,
                  selectedPronoun === pronoun && styles.selectedPronoun
                ]}
                activeOpacity={0.7}
                onPress={() => handlePronounSelection(pronoun, 'plural')}
              >
                <Text style={[
                  styles.pronounText,
                  selectedPronoun === pronoun && styles.selectedPronounText
                ]}>
                  {pronoun}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.arrowContainer}>
            {subjectPronouns.plural.map((pronoun, index) => (
              <View key={`arrow-${pronoun}`} style={styles.arrow}>
                <View style={styles.arrowLine} />
                <View style={styles.arrowPoint} />
              </View>
            ))}
          </View>
          
          <View style={styles.formulaContainer}>
            <LinearGradient
              colors={["#00d2ff", "#00b4ff"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.formulaGradient}
            >
              <Text style={styles.formulaText}>+ Verb + O</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Second Rule - Singular Pronouns */}
        <Animated.View 
          style={[
            styles.ruleSection,
            {
              opacity: animation,
              transform: [
                { 
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [60, 0]
                  })
                },
                { scale: scaleAnims.singular }
              ]
            }
          ]}
        >
          <View style={styles.pronounsContainer}>
            {subjectPronouns.singular.map((pronoun, index) => (
              <TouchableOpacity
                key={pronoun}
                style={[
                  styles.pronounButton,
                  selectedPronoun === pronoun && styles.selectedPronoun
                ]}
                activeOpacity={0.7}
                onPress={() => handlePronounSelection(pronoun, 'singular')}
              >
                <Text style={[
                  styles.pronounText,
                  selectedPronoun === pronoun && styles.selectedPronounText
                ]}>
                  {pronoun}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.arrowContainer}>
            {subjectPronouns.singular.map((pronoun, index) => (
              <View key={`arrow-${pronoun}`} style={styles.arrow}>
                <View style={styles.arrowLine} />
                <View style={styles.arrowPoint} />
              </View>
            ))}
          </View>

          <View style={styles.formulaContainer}>
            <LinearGradient
              colors={["#00d2ff", "#00b4ff"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.formulaGradient}
            >
              <Text style={styles.formulaText}>+ Verb + s/es + O</Text>
            </LinearGradient>
          </View>
        </Animated.View>
        
        {/* Example Section */}
        {selectedPronoun && (
          <Animated.View 
            style={[
              styles.exampleContainer,
              {
                opacity: animation,
                transform: [
                  { 
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={["#ffb6c1", "#ff69b4"]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.exampleGradient}
            >
              <Text style={styles.exampleTitle}>Example:</Text>
              <Text style={styles.exampleText}>{examples[selectedPronoun]}</Text>
              <Image 
                source={require("../../../assets/items/panda.png")} 
                style={styles.exampleImage} 
                resizeMode="contain"
              />
            </LinearGradient>
          </Animated.View>
        )}
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
              
              // Navigate to first puzzle screen
              navigation.navigate("SentencePuzzleScreen1");
            }}
          >
            <LinearGradient
              colors={["#3e4ef4", "#001aff"]}
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
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: height * 0.025,
    marginTop: height * 0.02,
    paddingTop: height * 0.01,
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
    letterSpacing: 0.5,
    textShadowColor: 'rgba(106, 61, 232, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  profileButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6a3de8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  affirmativeContainer: {
    marginBottom: height * 0.025,
    alignItems: 'center',
  },
  affirmativeGradient: {
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  affirmativeText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  ruleSection: {
    marginBottom: height * 0.04,
  },
  pronounsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: height * 0.01,
  },
  pronounButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    minWidth: width * 0.15,
    margin: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedPronoun: {
    backgroundColor: "#6a3de8",
  },
  pronounText: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
  },
  selectedPronounText: {
    color: "#fff",
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: height * 0.01,
  },
  arrow: {
    alignItems: "center",
    minWidth: width * 0.15,
  },
  arrowLine: {
    width: 1,
    height: 20,
    backgroundColor: "#333",
  },
  arrowPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderStyle: "solid",
    backgroundColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#333",
    transform: [{ rotate: "180deg" }],
  },
  formulaContainer: {
    alignItems: "center",
  },
  formulaGradient: {
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  formulaText: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#fff",
  },
  exampleContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    alignItems: "center",
  },
  exampleGradient: {
    width: "90%",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exampleTitle: {
    fontSize: width * 0.045,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  exampleText: {
    fontSize: width * 0.04,
    color: "#fff",
    fontStyle: "italic",
  },
  exampleImage: {
    position: "absolute",
    right: 10,
    bottom: 5,
    width: 60,
    height: 60,
    opacity: 0.9,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: height * 0.03,
  },
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
});