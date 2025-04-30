import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Make sure to install expo-linear-gradient
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

const HomeScreen = ({ navigation }) => {
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

      <Text style={styles.title}>Welcome to Language Hub</Text>
      <Text style={styles.subtitle}>
        Learn Languages Free, Fun, and Effectively
      </Text>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("Home2")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Already Have an Account?</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "40%", // Full width
    height: "30%", // Adjust height as needed for full screen
    marginBottom: 30,
    resizeMode: "cover", // Ensure the image scales to fit the screen
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 24,
    opacity: 0.8,
  },
  getStartedButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#0072ff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginButton: {
    paddingVertical: 10,
  },
  loginText: {
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default HomeScreen;
