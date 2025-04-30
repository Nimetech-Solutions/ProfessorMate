import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function VerbsScreenJ() {
  const navigation = useNavigation();
  const [selectedVerb, setSelectedVerb] = useState(null);
  const [animationValue] = useState(new Animated.Value(1));

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

  const verbs = [
    { id: 1, word: 'Jab', meaning: 'To poke or thrust abruptly with a quick, sharp movement' },
    { id: 2, word: 'Jabber', meaning: 'To talk rapidly and excitedly with indistinct pronunciation' },
    { id: 3, word: 'Jack', meaning: 'To raise or lift something using a jack (a mechanical device)' },
    { id: 4, word: 'Jam', meaning: 'To force something into a space that is too small or crowded' },
    { id: 5, word: 'Jangle', meaning: 'To make or cause to make a harsh, metallic sound' },
    { id: 6, word: 'Jar', meaning: 'To shake or vibrate with a sudden, sharp shock' },
    { id: 7, word: 'Jaunt', meaning: 'To go on a short journey or excursion, usually for pleasure' },
    { id: 8, word: 'Jaywalk', meaning: 'To cross a street at a place other than a designated crossing point' },
    { id: 9, word: 'Jeer', meaning: 'To mock or scoff at someone or something' },
    { id: 10, word: 'Jell', meaning: 'To take shape or become clear; to solidify' },
    { id: 11, word: 'Jeopardize', meaning: 'To put something at risk of loss, harm, or failure' },
    { id: 12, word: 'Jest', meaning: 'To speak or act in a playful or joking manner' },
    { id: 13, word: 'Jet', meaning: 'To travel by jet aircraft or to move quickly' },
    { id: 14, word: 'Jiggle', meaning: 'To move up and down or side to side with small, rapid movements' },
    { id: 15, word: 'Jilt', meaning: 'To suddenly reject or abandon someone, especially a lover' },
    { id: 16, word: 'Jingle', meaning: 'To make a light, clear ringing sound like that of small bells' },
    { id: 17, word: 'Jitter', meaning: 'To move nervously or restlessly' },
    { id: 18, word: 'Jog', meaning: 'To run at a steady, gentle pace, especially as a form of exercise' },
    { id: 19, word: 'Join', meaning: 'To connect or link things together; to become a member of something' },
    { id: 20, word: 'Joke', meaning: 'To say or do something amusing or funny' },
  ];

  const handleVerbPress = (verb) => {
    setSelectedVerb(verb.id === selectedVerb?.id ? null : verb);
  };

  return (
    <LinearGradient
      colors={["#00c6ff", "#0072ff"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>English Alphabet</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image 
            source={require("../../../../assets/items/profile.jpg")}
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.verbsTitle}>Verbs</Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {verbs.map((verb) => (
          <View key={verb.id} style={styles.verbContainer}>
            <TouchableOpacity 
              style={[
                styles.verbButton,
                selectedVerb?.id === verb.id && styles.selectedVerbButton
              ]}
              onPress={() => handleVerbPress(verb)}
              activeOpacity={0.8}
            >
              <Text style={styles.verbText}>{verb.word}</Text>
              <View style={styles.meaningContainer}>
                <Ionicons name="volume-medium" size={22} color="#3B82F6" />
                <Text style={styles.meaningText}>Meaning</Text>
              </View>
            </TouchableOpacity>
            
            {selectedVerb?.id === verb.id && (
              <View style={styles.meaningBox}>
                <Text style={styles.meaningDefinition}>{verb.meaning}</Text>
              </View>
            )}
          </View>
        ))}
        
        <Animated.View 
          style={[
            { transform: [{ scale: animationValue }] },
            styles.continueButtonContainer
          ]}
        >
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate("JPuzzleProgressScreen")}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingTop: 10,
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    padding: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#fff",
  },
  verbsTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  verbContainer: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  verbButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedVerbButton: {
    backgroundColor: '#F8FAFC',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  verbText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    letterSpacing: 0.5,
  },
  meaningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meaningText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },
  meaningBox: {
    backgroundColor: '#F8FAFC',
    padding: 18,
    paddingTop: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  meaningDefinition: {
    fontSize: 16,
    lineHeight: 22,
    color: '#334155',
  },
  continueButtonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: "#0039CB",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  continueText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    letterSpacing: 0.5,
  },
});