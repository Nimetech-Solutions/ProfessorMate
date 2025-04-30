import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import icon library
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the back button
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const Home4 = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "News/article/blog", icon: "article", color: "#FF5722" },
    { label: "YouTube", icon: "video-library", color: "#FF0000" },
    { label: "TV", icon: "tv", color: "#607D8B" },
    { label: "Friends/family", icon: "people", color: "#8BC34A" },
    { label: "TikTok", icon: "music-video", color: "#69F0AE" },
    { label: "Google Search", icon: "search", color: "#4CAF50" },
    { label: "App store", icon: "store", color: "#2196F3" },
    { label: "Facebook/Instagram", icon: "facebook", color: "#3b5998" },
    { label: "Other", icon: "more-horiz", color: "#9E9E9E" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      console.log("Selected Option:", selectedOption);
      // Navigate to the next screen or handle the selection
      navigation.navigate("LanguageSelectionScreen"); // Navigating to the next screen
    } else {
      alert("Please select an option.");
    }
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.optionContainer,
        selectedOption === item && styles.selectedOption,
      ]}
      onPress={() => handleOptionSelect(item)}
    >
      <Icon
        name={item.icon}
        size={24}
        color={item.color} // Colored icon
        style={styles.icon}
      />
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
  );

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
        <Ionicons name="arrow-back" size={30} color="#007bff" />
      </TouchableOpacity>

      <Text style={styles.title}>How did you know Name?</Text>
      <FlatList
        data={options}
        renderItem={renderOption}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.optionsList}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff", // Light text color for contrast with the gradient background
  },
  optionsList: {
    flexGrow: 0,
    marginVertical: 10,
  },
  optionContainer: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center items vertically
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
    backgroundColor: "#fff", // White background for each option
    elevation: 3, // Shadow effect for each option
  },
  selectedOption: {
    backgroundColor: "#e0f7fa", // Light blue for selected option
    borderColor: "#00bcd4",
  },
  optionText: {
    fontSize: 18,
    color: "#333", // Dark text color for better readability
    marginLeft: 10, // Space between icon and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  continueButton: {
    backgroundColor: "#007bff", // Modern blue color for the button
    paddingVertical: 16,
    borderRadius: 30, // Rounded button edges
    alignItems: "center",
    marginTop: 20,
    elevation: 5, // Shadow for the button
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home4;
