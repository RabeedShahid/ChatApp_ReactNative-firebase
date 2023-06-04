import React, { useEffect ,useState} from "react";
import { View, Text, Image,SafeAreaView,ScrollView, StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { AntDesign } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';

import { auth, database } from '../config/firebase';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens/Profile";
import { TouchableOpacity  } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { collection,setDoc,doc,getDoc } from "firebase/firestore";


const Home = () => {
   
    const navigation = useNavigation();
    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
      };
    useEffect(() => {
        navigation.setOptions({
            
            headerRight: () => (
                <TouchableOpacity
                  style={{
                    marginRight: 10
                  }}
                  onPress={onSignOut}
                >
                  <AntDesign name="logout" size={28} color='rgb(0,46,99)' style={{marginRight: 10}}/>
                </TouchableOpacity>
              )

                    
                    
                
              

        });
    }, [navigation]);
    const [fullname,setfullname]=useState(null);
    const [phone,setphone]=useState(null);
    const [address,setaddress]=useState(null);
    const [email,setemail]=useState(null);
    useEffect(()=>{
       const ReadData = async () => {
        const DocRef = doc(database,"users",auth.currentUser.uid);
        const docSnap = await getDoc(DocRef);

        if(docSnap.exists()){
           setfullname(docSnap.data().fullname);
           setphone(docSnap.data().phone);
           setaddress(docSnap.data().address);
           
        }
       }
       ReadData();

        
    },[]);
    const saveData =async ()=>{
            await setDoc(doc(database,"users",auth.currentUser.uid),{
                fullname:fullname,
                phone:phone,
                address:address
            })

        .then(()=>{
            alert("Saved Successfully");
        });

    }

    return (
    
        
        <SafeAreaView style={styles.container}>

        
        <View style={styles.profileImage}>
        <Image source={require("../assets/profile-pic.png")} style={styles.image} resizeMode="center"></Image>
        </View>
        <View>
        <Text style={{
            color:'rgb(0,206,209)',
            fontWeight:'bold',
            textAlign: 'center',
            fontSize:25,
            marginVertical:20,
            marginTop:40,
        }}>Profile Information</Text>

        <View>
            <TextInput label="Full Name" 
            onChangeText={(text) => setfullname(text)} 
            style={{
                width:300,
                margin: 5,
                marginVertical:10,
                marginBottom:10,
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
                backgroundColor:'rgb(0,46,99)',
                height:50,
                margin:20,
                justifyContent:'center',
                alignItems:'center',  }}
                    onPress={()=>saveData()}>
                    <Text style={{
                        color:'white'
                    }}>Save</Text>

            </TouchableOpacity>
           
        </View>
        
    
        <View style={styles.container}>
        <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color='rgb(0,46,99)' />
            </TouchableOpacity>
        </View>

    </SafeAreaView>

    );
    };

    export default Home;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: 'rgb(0,206,209)',
            height: 60,
            width: 70,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        },
        text: {
           
            color: "#52575D"
        },
        image: {
            flex: 1,
            height: undefined,
            width: undefined
        },
        titleBar: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 24,
            marginHorizontal: 16
        },
        subText: {
            fontSize: 12,
            color: "#AEB5BC",
            textTransform: "uppercase",
            fontWeight: "500"
        },
        profileImage: {
            width: 200,
            height: 200,
            borderRadius: 100,
            overflow: "hidden"
        },
        dm: {
            backgroundColor: "#41444B",
            position: "absolute",
            top: 20,
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
        },
        active: {
            backgroundColor: "#34FFB9",
            position: "absolute",
            bottom: 28,
            left: 10,
            padding: 4,
            height: 20,
            width: 20,
            borderRadius: 10
        },
        add: {
            backgroundColor: "#41444B",
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center"
        },
        infoContainer: {
            alignSelf: "center",
            alignItems: "center",
            marginTop: 16
        },
        statsContainer: {
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 32
        },
        statsBox: {
            alignItems: "center",
            flex: 1
        },
        mediaImageContainer: {
            width: 180,
            height: 200,
            borderRadius: 12,
            overflow: "hidden",
            marginHorizontal: 10
        },
        mediaCount: {
            backgroundColor: "#41444B",
            position: "absolute",
            top: "50%",
            marginTop: -50,
            marginLeft: 30,
            width: 100,
            height: 100,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            shadowColor: "rgba(0, 0, 0, 0.38)",
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
            shadowOpacity: 1
        },
        recent: {
            marginLeft: 78,
            marginTop: 32,
            marginBottom: 6,
            fontSize: 10
        },
        recentItem: {
            flexDirection: "row",
            alignItems: "flex-start",
            marginBottom: 16
        },
        activityIndicator: {
            backgroundColor: "#CABFAB",
            padding: 4,
            height: 12,
            width: 12,
            borderRadius: 6,
            marginTop: 3,
            marginRight: 20
        }
    });