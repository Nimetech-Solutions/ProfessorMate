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

export default function Pronoun2() {
  const navigation = useNavigation();
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Function to position elements in a circular pattern
  const getCircularPosition = (index, total, radius) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  // Object Pronouns Data
  const pronouns = [
    { text: 'Me' },
    { text: 'Us' },
    { text: 'You' },
    { text: 'Them' },
    { text: 'Him' },
    { text: 'Her' },
    { text: 'It' }
  ];

  // Cloud SVG component
  const CloudShape = () => (
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
      {/* Header */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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

        {/* Pronouns Section */}
        <View style={styles.pronounsContainer}>
          {/* Center object circle with animation */}
          <Animated.View 
            style={[
              styles.objectCircle,
              {
                opacity: animation,
                transform: [{ scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }]
              }
            ]}
          >
            <LinearGradient colors={['#FFB347', '#FF8C42']} style={styles.objectGradient}>
              <Text style={styles.objectText}>Object</Text>
            </LinearGradient>
          </Animated.View>

          {/* Pronouns Clouds in Circular Layout */}
          {pronouns.map((pronoun, index) => {
            const position = getCircularPosition(index, pronouns.length, Math.min(width, height) * 0.38);

            return (
              <Animated.View
                key={pronoun.text}
                style={[
                  styles.cloudContainer,
                  {
                    left: '50%',
                    top: '50%',
                    marginLeft: position.x - 55, // Adjust cloud width
                    marginTop: position.y - 40,  // Adjust cloud height
                    opacity: animation,
                    transform: [
                      { scale: animation },
                      { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }
                    ]
                  }
                ]}
              >
                <View style={styles.cloudContent}>
                  <CloudShape />
                  <Text style={styles.pronounText}>{pronoun.text}</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>

        {/* Continue Button */}
        <Animated.View 
          style={{
            opacity: animation,
            transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }]
          }}
        >
          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate("TensesScreen")}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Styles
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
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTitle: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
  },
  profileButton: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  pronounsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  objectGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cloudContainer: {
    position: 'absolute',
    width: 110,
    height: 70,
  },
  cloudContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  pronounText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    position: 'absolute',
  },
  continueButton: {
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
  },
});

