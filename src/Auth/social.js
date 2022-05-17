import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import axios from 'axios'
import { MAIN_URL } from '../redux/actions/host';
import icons from '../icons'
import {styles} from './style'
import { ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function Social(props) {
    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState();

    const [request, response, googlePromptAsync] = Google.useAuthRequest({
        androidClientId: "263792435513-0l5gb58v9vfe42ceqecs1uocd10rj8an.apps.googleusercontent.com",
        iosClientId: "263792435513-5l1qnqvsj6jsnhcfvgrcm42qrulpril7.apps.googleusercontent.com",
        expoClientId: "263792435513-5g6jdf3nunnsq1n96sv62pl9ka62atp5.apps.googleusercontent.com"
    });

    const [frequest, fresponse, facebookPromptAsync] = Facebook.useAuthRequest({
        clientId: '7500730446636225',
        //responseType: ResponseType.Code,
      });

    React.useEffect(() => {

        setMessage(JSON.stringify(response));
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            console.log('res', response.authentication.accessToken)
            
            axios.post(
                MAIN_URL+"/rest-auth/google/",
                {
                    access_token: response.authentication.accessToken,
                }
            )
                .then(res => {
                    console.log('resultBack', res.data)
                    props.success(res.data.key)
                })
            
        }

        if (fresponse?.type === "success") {
            setAccessToken(fresponse);
            console.log('res', fresponse)
            
            axios.post(
                MAIN_URL+"/rest-auth/facebook/",
                {
                    access_token: fresponse.authentication.accessToken,
                }
            )
                .then(res => {
                    console.log('resultBack', res.data)
                    props.success(res.data.key)
                })
                
            
        }

    }, [response,fresponse]);


    return (
        <View style={[styles.loginItem,{flexDirection:'row',marginVertical:10}]}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{width:50,height:50,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    googlePromptAsync()
                }}>
                    <Image source={icons.Google} style={{width:'100%',height:'100%'}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{width:50,height:50,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    facebookPromptAsync()
                }}>
                    <Image source={icons.Facebook} style={{width:32,height:32}} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
