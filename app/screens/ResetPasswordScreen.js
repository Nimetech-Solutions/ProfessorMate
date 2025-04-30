// import React, { useState } from "react";

// import Background from "../components/Background";
// import BackButton from "../components/BackButton";
// import Logo from "../components/Logo";
// import Header from "../components/Header";
// import TextInput from "../components/TextInput";
// import Button from "../components/Button";
// import { emailValidator } from "../helpers/emailValidator";

// export default function ResetPasswordScreen({ navigation }) {
//   const [email, setEmail] = useState({ value: "", error: "" });

//   const sendResetPasswordEmail = () => {
//     const emailError = emailValidator(email.value);
//     if (emailError) {
//       setEmail({ ...email, error: emailError });
//       return;
//     }
//     navigation.navigate("LoginScreen");
//   };

//   return (
//     <Background>
//       <BackButton goBack={navigation.goBack} />
//       <Logo />
//       <Header>Reset your password.</Header>
//       <TextInput
//         label="Email"
//         returnKeyType="done"
//         value={email.value}
//         onChangeText={(text) => setEmail({ value: text, error: "" })}
//         error={!!email.error}
//         errorText={email.error}
//         autoCapitalize="none"
//         autoCompleteType="email"
//         textContentType="emailAddress"
//         keyboardType="email-address"
//         description="You will receive an email with the reset link."
//       />
//       <Button
//         mode="contained"
//         onPress={sendResetPasswordEmail}
//         style={{ marginTop: 16 }}
//       >
//         Continue
//       </Button>
//     </Background>
//   );
// }
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Optional: For adding a back button or icon

export default function ResetPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        placeholder="Enter new password"
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm new password"
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow effect
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
