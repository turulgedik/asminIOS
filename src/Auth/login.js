import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image, Dimensions , KeyboardAvoidingView,Modal, ScrollView } from 'react-native'
import icons from '../icons'
import { styles } from './style'
import CustomTextInput from '../components/TextInput'
import {login,loadUser,logOut} from '../redux/actions/auth'
import Alert from '../components/Alert'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Social from './social'

WebBrowser.maybeCompleteAuthSession();


const {width,height}=Dimensions.get('window')

export class Login extends Component {
    state = {
        username: '',
        password: '',
        eye:true,

        accessToken:null,
        userInfo:null,
        message:null
    }

    socialLoginSuccess=(token)=>{
        console.log('key',token)
        this.props.loadUser(token)
    }


    onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;
        const {heightChange}=this.props
        if(heightChange!==undefined)
            heightChange(height)
    }
    render() {
        const { username, password,eye } = this.state
        const { goPage,loading,navigation } = this.props
        return (
            <ScrollView style={{width:'100%',flex:1,backgroundColor:'#f1f1f1'}} >
                <Image source={icons.LogoFulllGif} style={{width:'100%',height:height*0.3}} resizeMode='contain'/>
                <Alert ref={node=>(this._alert=node)} />
                <Modal animationType="slide" transparent={true} visible={loading}>
                    <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <Image source={icons.Loading} style={{width:100,height:100}} />
                    </View>
                </Modal>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20, color: 'black' }}>Giriş Yap</Text>
                </View>
                <View style={styles.loginPanel}>
                    <View style={styles.loginItem}>
                        <Text style={{ marginBottom: 5 }}>Kullanıcı Adı</Text>
                        <CustomTextInput color={"#e6e5f3"} left={
                            <Image source={icons.User2} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                        }
                            settings={{
                                value: username,
                                placeholder: 'Kullanıcı Adı', onChangeText: (text) => {
                                    this.setState({ username: text })
                                }
                            }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                    </View>
                    <View style={styles.loginItem}>
                        <Text style={{ marginBottom: 5 }}>Şifre</Text>
                        <CustomTextInput color={"#e6e5f3"} left={
                            <Image source={icons.Password} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                        }
                            settings={{
                                secureTextEntry: eye,
                                value: password,
                                placeholder: 'Şifre', onChangeText: (text) => {
                                    this.setState({ password: text })
                                }
                            }} style={styles.textInput} selectedStyle={styles.textInputSelected}
                            right={
                                <TouchableOpacity onPress={()=>{
                                    const newEye=!eye
                                    this.setState({eye:newEye})
                                }}>
                                    <Image source={icons.EyeClose} style={{ width: 32, height: 32 }} />
                                </TouchableOpacity>
                            } />
                    </View>
                    <View style={[styles.loginItem,{alignItems:'flex-end',marginVertical:10}]}>
                        <TouchableOpacity>
                            <Text>Şifremi Unuttum</Text>
                        </TouchableOpacity>
                    </View>
                    <Social success={this.socialLoginSuccess}/>

                    <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center',marginBottom:20 }}>
                        <TouchableOpacity style={styles.loginButton} onPress={()=>{

                            this.props.login(username,password,(data)=>{
                                if(!data){
                                    setTimeout(()=>{
                                        this._alert.setTitle('Hata')
                                        this._alert.setMessage('Kullanıcı Adı veya Şifre Hatalı!')
                                        this._alert.show()
                                    },1000)
                                }else{
                                    //navigation.goBack()
                                }
                            })
                        }}>
                            <Text style={{color:'white'}}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{flexDirection:'row',marginBottom:20,alignItems:'center',justifyContent:'center'}} onPress={()=>{
                        navigation.navigate('Register')
                    }}>
                        <Text>Bir hesabın yok mu? </Text>
                        <Text style={{fontWeight:'700',fontSize:17,color:'#9b59b6'}}>Kayıt Ol!</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={{position:'absolute',top:10,left:10,backgroundColor:'rgba(0,0,0,0.5)',width:50,height:50,borderRadius:25,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                        this.props.logOut()
                    }}>
                    <Image source={icons.Back} style={{width:32,height:32,tintColor:'white'}}/>
                </TouchableOpacity>


            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({
    loading:state.App.loading
})

const mapDispatchToProps = {
    login,
    loadUser,
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
