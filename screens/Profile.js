import React, { useEffect,useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity  } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { collection,setDoc,doc } from "firebase/firestore";
import { auth, database } from '../config/firebase';

const Profile=()=>{
    const [fullname,setfullname]=useState(null);
    const [phone,setphone]=useState(null);
    const [address,setaddress]=useState(null);
    const [email,setemail]=useState(null);
    useEffect(()=>{
       const ReadData = async () => {
        const DocRef = doc(database,"users",auth.currentUser.uid)
        const docSnap = await getDoc(DocRef);

        if(docSnap.exists()){
           setfullname(docSnap.data().fullname);
           setphone(docSnap.data().phone);
           setaddress(docSnap.data().address);
           
        }
       }
       ReadData();

        
    },[])
    const saveData =async ()=>{
            await setDoc(doc(database,"users",auth.currentUser.uid),{
                fullname:fullname,
                phone:phone,
                address:address
            })

        .then(()=>{
            alert("your profile is updated");
        });

    }
    return(
       <View>
        <Text style={{
            fontWeight:'bold',
            textAlign: 'center',
            fontSize:25,
            marginVertical:20,
        }}>Profile</Text>

        <View>
            <TextInput label="Full Name" 
            onChangeText={(text) => setfullname(text)} 
            style={{
                margin: 5,
                marginVertical:10,
            }} value={fullname}/></View>
            <View>
            <TextInput label="Phone" 
            onChangeText={(text) => setphone(text)} 
            style={{
                margin: 5,
                marginVertical:10,
            }} value={phone} /></View>
            <View>
            <TextInput label="Address" 
            onChangeText={(text) => setaddress(text)} 
            style={{
                margin: 5,
                marginVertical:10,
            }} value={address}/></View>
            <TouchableOpacity
            style={{
                backgroundColor:'blue',
                height:50,
                margin:20,
                justifyContent:'center',
                alignItems:'center',  }}>
                    <Text style={{
                        color:'white'
                    }}>save data</Text>

            </TouchableOpacity>
            <View style={styles.container}>
        <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
        </View>
        
    
        
        

    );
    
}