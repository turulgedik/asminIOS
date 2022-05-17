import React, { Component } from 'react'
import { ScrollView, TouchableOpacity, Text } from 'react-native'
import {StatusBar} from 'expo-status-bar'

export default class components extends Component {
    render() {
        const {navigation}=this.props
        return (
            <ScrollView style={{flex:1,width:'100%'}}>
                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('CustomerHome')
                }}>
                    <Text>Müşteri Anasayfa</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('StaffList')
                }}>
                    <Text>Yorumcu Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('Form')
                }}>
                    <Text>Form Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('StaffCart')
                }}>
                    <Text>Yorumcu Profil Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('CustomerProfile')
                }}>
                    <Text>Müşteri Profil Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('Market')
                }}>
                    <Text>Market Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('StaffHistory')
                }}>
                    <Text>Geçmiş Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('StaffHome')
                }}>
                    <Text>Yorumcu Anasayfa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('Payment')
                }}>
                    <Text>Muhasebe Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('Login')
                }}>
                    <Text>Giriş Sayfası</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{width:'100%',height:50,borderBottomWidth:0.5,borderBottomColor:'#e1e1e1',alignItems:'center',justifyContent:'center'}} onPress={()=>{
                    navigation.navigate('Register')
                }}>
                    <Text>Kayıtol Sayfası</Text>
                </TouchableOpacity>

                <StatusBar hidden={true}/>
            </ScrollView>
        )
    }
}
