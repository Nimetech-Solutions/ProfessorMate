import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Animated, 
  Easing 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function AlphabetScreen() {
  const navigation = useNavigation();
  const [animationValue] = useState(new Animated.Value(1));
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Animation handlers
  const handlePressIn = () => {
    Animated.timing(animationValue, {
      toValue: 0.98,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Function to handle letter click
  const handleLetterPress = (letter) => {
    // Set the selected letter
    setSelectedLetter(letter);
    
    // Navigate directly to LetterDetailScreen if "Aa" is clicked
    if (letter === "Aa") {
      navigation.navigate("LetterDetail");
    } else if (letter === "Bb") {
      navigation.navigate("LetterDetailScreenB")
    } else if (letter === "Cc") {
      navigation.navigate("LetterDetailScreenC");
    } else if (letter === "Dd") {
      navigation.navigate("LetterDetailScreenD");
    } else if (letter === "Ee") {
      navigation.navigate("LetterDetailScreenE");
    } else if (letter === "Ff") {
      navigation.navigate("LetterDetailScreenF");
    } else if (letter === "Gg") {
      navigation.navigate("LetterDetailScreenG");
    } else if (letter === "Hh") {
      navigation.navigate("LetterDetailScreenH");
    } else if (letter === "Ii") {
      navigation.navigate("LetterDetailScreenI");
    } else if (letter === "Jj") {
      navigation.navigate("LetterDetailScreenJ");
    } else if (letter === "Kk") {
      navigation.navigate("LetterDetailScreenK");
    } else if (letter === "Ll") {
      navigation.navigate("LetterDetailScreenL");
    } else if (letter === "Mm") {
      navigation.navigate("LetterDetailScreenM");
    } else if (letter === "Nn") {
      navigation.navigate("LetterDetailScreenN");
    } else if (letter === "Oo") {
      navigation.navigate("LetterDetailScreenO");
    } else if (letter === "Pp") {
      navigation.navigate("LetterDetailScreenP");
    } else if (letter === "Qq") {
      navigation.navigate("LetterDetailScreenQ");
      } else if (letter === "Rr") {
      navigation.navigate("LetterDetailScreenR");
    } else if (letter === "Ss") {
      navigation.navigate("LetterDetailScreenS");
    } else if (letter === "Tt") {
      navigation.navigate("LetterDetailScreenT");
      } else if (letter === "Uu") {
      navigation.navigate("LetterDetailScreenU");
      } else if (letter === "Vv") {
      navigation.navigate("LetterDetailScreenV");
      } else if (letter === "Ww") {
      navigation.navigate("LetterDetailScreenW");
      } else if (letter === "Xx") {
      navigation.navigate("LetterDetailScreenX");
      } else if (letter === "Yy") {
      navigation.navigate("LetterDetailScreenY");
      } else if (letter === "Zz") {
      navigation.navigate("LetterDetailScreenZ");
      // You can add navigation for Xx here if needed
      } else {
      alert("Currently, only letter 'Aa' is available for learning.");
    }
  };

  // Function to handle "Learn Words" button press
  const handleLearnWords = () => {
    // Navigate to the Words Screen directly when Learn Words is pressed
    navigation.navigate("AlphabetLearningScreen");
  };

  // Array of alphabet letters (uppercase and lowercase pairs)
  const alphabetLetters = [
    "Aa", "Bb", "Cc", "Dd", 
    "Ee", "Ff", "Gg", "Hh", 
    "Ii", "Jj", "Kk", "Ll", 
    "Mm", "Nn", "Oo", "Pp", 
    "Qq", "Rr", "Ss", "Tt", 
    "Uu", "Vv", "Ww", "Xx", 
    "Yy", "Zz"
  ];

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Profile Image */}
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image 
          source={require("../../../assets/items/profile.jpg")} 
          style={styles.profileImage} 
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>English Alphabet</Text>

      {/* Instruction Text */}
      <Text style={styles.instruction}>Click the letter you want to learn first</Text>

      {/* Alphabet Grid */}
      <ScrollView contentContainerStyle={styles.alphabetContainer}>
        {alphabetLetters.map((letter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.letterButton,
              selectedLetter === letter && styles.selectedLetterButton
            ]}
            onPress={() => handleLetterPress(letter)}
          >
            <Text 
              style={[
                styles.letterText,
                selectedLetter === letter && styles.selectedLetterText
              ]}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Learn Words Button */}
      <Animated.View style={{ transform: [{ scale: animationValue }] }}>
        <TouchableOpacity 
          style={styles.learnWordsButton} 
          onPress={handleLearnWords}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.learnWordsText}>Learn Words</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  profileButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  instruction: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.9,
  },
  alphabetContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingBottom: 20,
  },
  letterButton: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    margin: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  selectedLetterButton: {
    backgroundColor: "#FFC107", // Highlight selected letter with a different color
    borderWidth: 2,
    borderColor: "#FF9800",
  },
  letterText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  selectedLetterText: {
    color: "#000", // Change text color for selected letter
  },
  learnWordsButton: {
    backgroundColor: "#007AFF",
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
  learnWordsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});