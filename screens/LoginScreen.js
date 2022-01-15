import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase from "../database/firebaseDB";

const db = firebase.firestore();
const auth = firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");			// !IMPT
  const [password, setPassword] = useState("");		// !IMPT
  
  const login = () => {
	Keyboard.dismiss()
	auth
		.signInWithEmailAndPassword(email, password)
		.then(({userCredential}) => {
			console.log('signed in!');
			//navigation.navigate("Chat", { email });
		})
		.catch((error) => {
			console.log('ERROR')
			//setErrorText(error.message)
		})
}


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Chat App</Text>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          value={email}                                 // !IMPT
          onChangeText={(input) => setEmail(input)}     // !IMPT
        />
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          value={password} 								// !IMPT
          onChangeText={(input) => setPassword(input)}  // !IMPT
        />
        <TouchableOpacity onPress={null} style={styles.loginButton} onPress={login}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "lightyellow",
  },
  loginButton: {
    backgroundColor: "green",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    height: 40,
  },
});