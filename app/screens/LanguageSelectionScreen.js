import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back button
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { id: 1, label: "English", flag: "🇺🇸" },
    { id: 2, label: "Sinhala", flag: "🇱🇰" },
    { id: 3, label: "Tamil", flag: "🇮🇳" },
    { id: 4, label: "Japan", flag: "🇯🇵" },
    { id: 5, label: "Korean", flag: "🇰🇷" },
    { id: 6, label: "Russian", flag: "🇷🇺" },
  ];

  const handleContinue = () => {
    if (selectedLanguage) {
      navigation.navigate("StartScreenL"); // Navigate to StartScreenL
    } else {
      alert("Please select a language.");
    }
  };

  // Animating the language selection button when clicked
  const scaleValue = new Animated.Value(1);
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

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

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Language App</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar} />

      {/* Chat Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://example.com/avatar.png" }} // Replace with your actual avatar image URL
          style={styles.avatar}
        />
        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>What would you like to learn?</Text>
        </View>
      </View>

      {/* Language Selection */}
      <ScrollView contentContainerStyle={styles.languageList}>
        {languages.map((language) => (
          <Animated.View
            key={language.id}
            style={[
              styles.languageItem,
              selectedLanguage === language.id && styles.languageItemSelected,
              { transform: [{ scale: selectedLanguage === language.id ? 1.05 : 1 }] }, // Scale effect for selected item
            ]}
          >
            <TouchableOpacity
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => setSelectedLanguage(language.id)}
              style={styles.languageItemTouchable}
            >
              <Text style={styles.flag}>{language.flag}</Text>
              <Text style={styles.languageText}>{language.label}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
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
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff", // White text for visibility on gradient background
    letterSpacing: 1.5,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    marginVertical: 15,
    width: "40%",
    alignSelf: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
    alignSelf: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  chatBubble: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  chatText: {
    fontSize: 18,
    color: "#333",
  },
  languageList: {
    marginTop: 15,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 18,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  languageItemSelected: {
    backgroundColor: "#DCEBFF",
    borderColor: "#007AFF",
  },
  languageItemTouchable: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageText: {
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: "#007AFF", // Ensures it stands out with a solid color
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: '100%', // Ensure the button stretches fully
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  continueButtonText: {
    color: "#fff", // White text on the button
    fontSize: 16, // Larger font size for visibility
    fontWeight: "bold",
  },
});


export default LanguageSelectionScreen;
