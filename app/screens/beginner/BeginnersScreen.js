import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function BeginnersScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#E8F0FE", "#C7D9F9"]}
      style={styles.container}
    >
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-circle" size={38} color="#2196F3" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.speechBubble}>
          <Text style={styles.speechText}>Let's Start Learning!</Text>
          <Text style={styles.subText}>Begin your journey with the basics</Text>
        </View>

        <Image 
          source={require("../../../assets/items/character.png")} 
          style={styles.character} 
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("AlphabetScreen")}
      >
        <LinearGradient
          colors={["#2196F3", "#1976D2"]}
          style={styles.gradientButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image 
          source={require("../../../assets/items/profile.jpg")} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  speechBubble: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    width: "85%",
    alignItems: "center",
    marginBottom: 30,
  },
  speechText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(33, 150, 243, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
  character: {
    width: 240,
    height: 240,
    transform: [{ scale: 1.1 }],
  },
  button: {
    width: "80%",
    marginBottom: 40,
    borderRadius: 30,
    alignSelf: "center",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 5,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#2196F3",
  },
});