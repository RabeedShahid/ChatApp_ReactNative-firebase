import React, { useState } from "react";
import { StyleSheet, Text, View,BackHandler, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useEffect } from "react";
const backImage = require("../assets/background1.jpg");

export default function Login({navigation}){
   useEffect(()=>{
    BackHandler.addEventListener('hardwareBackPress',()=>{
      return true})

   },[]) 
  
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }

  }
  const resetpassword = () =>{
    if(email!=null){
       sendPasswordResetEmail(auth,email)
       .then( () =>{
           alert("email sent successfully");
       })
       .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
       })
    }else{
      alert("Please enter a valid email");
    }
  }
  return(
          <View style={styles.container}>
            <Image source={backImage} style={styles.backImage}/>
            <View style={styles.whiteSheet}/>
            <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => resetpassword() }><Text style={{fontWeight: 'bold', color: 'rgb(0,206,209)', textAlign:'center', marginTop:10, fontSize: 18}} >
        Forget Password</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{color: 'rgb(0,206,209)', fontWeight: '600', fontSize: 17}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    
          </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      color: "rgb(0,206,209)",
      alignSelf: "center",
      paddingBottom: 24,
    },
    input: {
      backgroundColor: "#F6F7FB",
      height: 58,
      marginBottom: 20,
      fontSize: 16,
      borderRadius: 10,
      padding: 12,
    },
    backImage: {
      width: "100%",
      height: 340,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
    },
    whiteSheet: {
      width: '100%',
      height: '75%',
      position: "absolute",
      bottom: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 60,
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 30,
    },
    button: {
      backgroundColor: 'rgb(0,46,99)',
      height: 58,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
  });