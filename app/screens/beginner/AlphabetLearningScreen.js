import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get('window');

export default function AlphabetLearningScreen() {
  const navigation = useNavigation();
  const [shuffledItems, setShuffledItems] = useState([]);
  
  // All words data with images
  const allWords = [
    { id: "a1", word: "Airplane", letter: "A", image: require("../../../assets/items/airplane.png") },
    { id: "a2", word: "Ant", letter: "A", image: require("../../../assets/items/ant.png") },
    { id: "b1", word: "Ball", letter: "B", image: require("../../../assets/items/ball.png") },
    { id: "b2", word: "Banana", letter: "B", image: require("../../../assets/items/banana.png") },
    { id: "c1", word: "Car", letter: "C", image: require("../../../assets/items/car.png") },
    { id: "c2", word: "Cat", letter: "C", image: require("../../../assets/items/cat.png") },
    { id: "d1", word: "Dog", letter: "D", image: require("../../../assets/items/dog.png") },
    { id: "d2", word: "Duck", letter: "D", image: require("../../../assets/items/duck.png") },
    { id: "e1", word: "Ear", letter: "E", image: require("../../../assets/items/ear.png") },
    { id: "e2", word: "Egg", letter: "E", image: require("../../../assets/items/egg.png") },
    { id: "f1", word: "Fish", letter: "F", image: require("../../../assets/items/fish.png") },
    { id: "f2", word: "Flower", letter: "F", image: require("../../../assets/items/flower.png") },
    { id: "g1", word: "Goat", letter: "G", image: require("../../../assets/items/goat.png") },
    { id: "g2", word: "Grapes", letter: "G", image: require("../../../assets/items/grapes.png") },
    { id: "h1", word: "Hat", letter: "H", image: require("../../../assets/items/hat.png") },
    { id: "h2", word: "Heart", letter: "H", image: require("../../../assets/items/heart.png") },
    { id: "i1", word: "Ice", letter: "I", image: require("../../../assets/items/ice.png") },
    { id: "i2", word: "Igloo", letter: "I", image: require("../../../assets/items/igloo.png") },
    { id: "j1", word: "Jacket", letter: "J", image: require("../../../assets/items/jacket.png") },
    { id: "j2", word: "Jelly", letter: "J", image: require("../../../assets/items/jelly.png") },
    { id: "k1", word: "Kangaroo", letter: "K", image: require("../../../assets/items/kangaroo.png") },
    { id: "k2", word: "Key", letter: "K", image: require("../../../assets/items/key.png") },
    { id: "l1", word: "Lamp", letter: "L", image: require("../../../assets/items/lamp.png") },
    { id: "l2", word: "Leaf", letter: "L", image: require("../../../assets/items/leaf.png") },
    { id: "m1", word: "Map", letter: "M", image: require("../../../assets/items/map.png") },
    { id: "m2", word: "Monkey", letter: "M", image: require("../../../assets/items/monkey.png") },
    { id: "n1", word: "Nose", letter: "N", image: require("../../../assets/items/nose.png") },
    { id: "n2", word: "Nail", letter: "N", image: require("../../../assets/items/nail.png") },
    { id: "o1", word: "Owl", letter: "O", image: require("../../../assets/items/owl.png") },
    { id: "o2", word: "Orange", letter: "O", image: require("../../../assets/items/orange.png") },
    { id: "p1", word: "Pencil", letter: "P", image: require("../../../assets/items/pencil.png") },
    { id: "p2", word: "Parrot", letter: "P", image: require("../../../assets/items/parrot.png") },
    { id: "q1", word: "Queen", letter: "Q", image: require("../../../assets/items/queen.png") },
    { id: "q2", word: "Quail", letter: "Q", image: require("../../../assets/items/quail.png") },
    { id: "r1", word: "Rabbit", letter: "R", image: require("../../../assets/items/rabbit.png") },
    { id: "r2", word: "Rocket", letter: "R", image: require("../../../assets/items/rocket.png") },
    { id: "s1", word: "Sun", letter: "S", image: require("../../../assets/items/sun.png") },
    { id: "s2", word: "Snake", letter: "S", image: require("../../../assets/items/snake.png") },
    { id: "t1", word: "Tiger", letter: "T", image: require("../../../assets/items/tiger.png") },
    { id: "t2", word: "Train", letter: "T", image: require("../../../assets/items/train.png") },
    { id: "u1", word: "Umbrella", letter: "U", image: require("../../../assets/items/umbrella.png") },
    { id: "u2", word: "Unicorn", letter: "U", image: require("../../../assets/items/unicorn.png") },
    { id: "v1", word: "Van", letter: "V", image: require("../../../assets/items/van.png") },
    { id: "v2", word: "Vase", letter: "V", image: require("../../../assets/items/vase.png") },
    { id: "w1", word: "Whale", letter: "W", image: require("../../../assets/items/whale.png") },
    { id: "w2", word: "Watch", letter: "W", image: require("../../../assets/items/watch.png") },
    { id: "x1", word: "Xylophone", letter: "X", image: require("../../../assets/items/xylophone.png") },
    { id: "x2", word: "X-ray", letter: "X", image: require("../../../assets/items/xray.png") },
    { id: "y1", word: "Yak", letter: "Y", image: require("../../../assets/items/yak.png") },
    { id: "y2", word: "Yogurt", letter: "Y", image: require("../../../assets/items/yogurt.png") },
    { id: "z1", word: "Zebra", letter: "Z", image: require("../../../assets/items/zebra.png") },
    { id: "z2", word: "Zoo", letter: "Z", image: require("../../../assets/items/zoo.png") }
  ];
  
  // Shuffle all words on component mount
  useEffect(() => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    
    setShuffledItems(shuffleArray(allWords));
  }, []);

  // Function to play audio for the word
  const playAudio = (word) => {
    // Audio playing functionality would be implemented here
    console.log(`Playing audio for ${word}`);
  };

  // Render each word item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.letterBadge}>
        <Text style={styles.letterBadgeText}>{item.letter}</Text>
      </View>
      
      <View style={styles.imageWrapper}>
        <Image 
          source={item.image} 
          style={styles.itemImage}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.wordContainer}>
        <Text style={styles.wordText}>{item.word}</Text>
        
        <TouchableOpacity 
          style={styles.audioButton}
          onPress={() => playAudio(item.word)}
        >
          <FontAwesome5 name="volume-up" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#0072ff", "#00c6ff"]} 
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Alphabet Words</Text>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image 
            source={require("../../../assets/items/profile.jpg")} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Grid of all shuffled words */}
      <FlatList
        data={shuffledItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
      />
      
      {/* Bottom finish button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={() => navigation.navigate("OverallProgressScreen")}
        >
          <Text style={styles.finishButtonText}>Finish Learning</Text>
          <FontAwesome5 name="check-circle" size={18} color="#fff" style={{marginLeft: 8}} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  gridContainer: {
    padding: 8,
    paddingBottom: 80,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: (width - 24) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    position: "relative",
  },
  letterBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0039CB",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  letterBadgeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  imageWrapper: {
    height: width * 0.25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    borderBottomWidth: 3,
    borderBottomColor: "rgba(0, 114, 255, 0.2)",
  },
  itemImage: {
    width: "70%",
    height: "70%",
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  wordText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#003366",
    flex: 1,
  },
  audioButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#5D3FD3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  finishButton: {
    backgroundColor: "#0039CB",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  finishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  }
});