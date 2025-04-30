import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const Home2 = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container} // Applying gradient background
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <Image
        source={require("../../assets/items/6086909316855611244-removebg-preview.png")}
        style={styles.mascot}
      />

      <Text style={styles.welcomeText}>
        Hi there! I’m <Text style={styles.name}>Name</Text>
      </Text>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate("Home3")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Transparent background for the button
  },
  mascot: {
    width: "100%", // Make the image take full width
    height: "50%", // Adjust height to fit the screen or adjust as necessary
    resizeMode: "contain", // Maintain aspect ratio without cropping
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "600", // Slightly lighter weight for a modern look
    textAlign: "center",
    marginBottom: 40,
    color: "#fff", // Light text for contrast on dark background
    letterSpacing: 1.2,
    lineHeight: 32, // Adding line height for better readability
  },
  name: {
    fontWeight: "bold", // Make the name bold
    fontSize: 30, // Increase the font size for emphasis
    color: "#ffeb3b", // Yellow color for the name to make it stand out
  },
  continueButton: {
    backgroundColor: "#007bff", // Modern blue color
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30, // Rounded button edges
    elevation: 5, // Shadow effect for a raised button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home2;
