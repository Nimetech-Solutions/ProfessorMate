import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
  Dimensions,
  Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get('window');

export default function PronounsScreen() {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate in the elements when component mounts
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate positions for clouds in a circular pattern
  const getCircularPosition = (index, total, radius, centerOffset = { x: 0, y: 0 }) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * radius + centerOffset.x;
    const y = Math.sin(angle) * radius + centerOffset.y;
    return { x, y };
  };

  // Define pronouns and their animations
  const pronouns = [
    { text: 'I', delay: 100 },
    { text: 'We', delay: 200 },
    { text: 'You', delay: 300 },
    { text: 'They', delay: 400 },
    { text: 'He', delay: 500 },
    { text: 'She', delay: 600 },
    { text: 'It', delay: 700 }
  ];

  // Cloud SVG component
  const CloudShape = ({ color }) => (
    <Svg height="100%" width="100%" viewBox="0 0 100 70">
      <Path
        d="M85,40c0,13.8-11.2,25-25,25H25C11.2,65,0,53.8,0,40c0-13.8,11.2-20,25-20c1.7,0,3.4,0.2,5,0.5C34.1,10.5,43.7,5,55,5c16.6,0,30,12.5,30,27.5C85,35.2,85,37.6,85,40z"
        fill="#30d4ff"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1"
      />
    </Svg>
  );

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container}
    >
      {/* Header with Back Button and Profile */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Pronouns</Text>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image 
              source={require("../../../assets/items/profile.jpg")} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Subject Pronouns Section */}
        <View style={styles.pronounsContainer}>
          {/* Center subject circle with animation */}
          <Animated.View 
            style={[
              styles.subjectCircle,
              {
                opacity: animation,
                transform: [
                  { scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1]
                    })
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={['#FFB347', '#FF8C42']}
              style={styles.subjectGradient}
            >
              <Text style={styles.subjectText}>Subject</Text>
            </LinearGradient>
          </Animated.View>

          {/* Pronouns Clouds arranged in a circle - now static, not clickable */}
          {pronouns.map((pronoun, index) => {
            const position = getCircularPosition(
              index, 
              pronouns.length, 
              Math.min(width, height) * 0.38, // Increased radius for more space
              { x: 0, y: 0 } // Center offset if needed
            );
            
            // Animation for each cloud
            const cloudAnimation = animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            });
            
            return (
              <Animated.View
                key={pronoun.text}
                style={[
                  styles.cloudContainer,
                  {
                    left: '50%',
                    top: '50%',
                    marginLeft: position.x - 55, // Half of cloud width
                    marginTop: position.y - 40,  // Half of cloud height
                    opacity: cloudAnimation,
                    transform: [
                      { scale: cloudAnimation },
                      { translateY: cloudAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0]
                        })
                      }
                    ]
                  }
                ]}
              >
                <View style={styles.cloudContent}>
                  <CloudShape />
                  <Text style={styles.pronounText}>
                    {pronoun.text}
                  </Text>
                </View>
              </Animated.View>
            );
          })}
        </View>
        
        {/* Continue Button - now always active */}
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
            style={styles.continueButtonActive}
            onPress={() => {
              // Navigate directly to the Pronoun2 screen
              navigation.navigate("Pronoun2");
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
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
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  pronounsContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectCircle: {
    position: 'absolute',
    width: 140, // Increased size for more space
    height: 140, // Increased size for more space
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  subjectGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: '#333',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cloudContainer: {
    position: 'absolute',
    width: 110, // Slightly wider for the cloud shape
    height: 80, // Slightly taller for the cloud shape
    zIndex: 1,
  },
  cloudContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pronounText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
    zIndex: 3,
  },
  continueButtonActive: {
    backgroundColor: "#0024cb",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 20,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  }
});