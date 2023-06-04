import React from "react";
import LottieView from 'lottie-react-native';
import { Text,View } from "react-native";
import { useNavigation } from "@react-navigation/native";


export function splash(){
    const navigation = useNavigation()
    return(
    <View style={{flex:1, justifyContent:'center'}}>
        <LottieView 
          source={require('../assets/splash.json')}
          autoPlay
          loop= {false}
          speed={0.9}
          onAnimationFinish={()=>navigation.navigate('Login')}

        />
        
    </View>
    )
}