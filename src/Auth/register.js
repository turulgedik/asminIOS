import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Modal, Dimensions } from 'react-native'
import icons from '../icons'
import { styles } from './style'
import CustomTextInput from '../components/TextInput'
import Dot from '../components/Dots'
import * as ImagePicker from 'expo-image-picker';
import Alert from '../components/Alert'
import { register } from '../redux/actions/auth'
import axios from 'axios'

const { width, height } = Dimensions.get('window')

export class Register extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        userType: 2,
        pageIndex: 0,
        first_name: '',
        last_name: '',
        image: null,
        email: '',
        pageHeight: -1,
    }

    nullControl = () => {
        const { username, password, first_name, last_name, email } = this.state
        let text = username === '' ? 'Kullanıcı Adı Boş Bırakılamaz!' : ''
        text += username.length < 5 ? '\nKullanıcı Adı en az 5 karakter olmalıdır!' : ''
        text += password === '' ? '\nŞifre Boş Bırakılamaz!' : ''
        text += password.length < 5 ? '\nŞifre minimum 5 karakter olmalıdır!' : ''
        text += first_name === '' ? '\nİsim Boş Bırakılamaz!' : ''
        text += last_name === '' ? '\nSoyisim Boş Bırakılamaz!' : ''
        text += email === '' ? '\nMail Adresi Boş Bırakılamaz!' : ''
        text += email.length < 5 ? '\nMail Adresi minimum 5 karakter olmalıdır!' : ''

        if (text.length > 5) {
            this._alert.setTitle('Hata')
            this._alert.setMessage(text)
            this._alert.show()

            return
        }

        this.register()
    }

    register = () => {


        //this._info.onShow()
        const { username, password, first_name, last_name, image, email, userType } = this.state

        let data = new FormData();
        data.append("image", (image === null? '' : {
            uri:image.uri,
            type:'image/jpeg',
            name:`image.jpg`
        }) );
        data.append("username", username);
        data.append("password", password);
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("email", email);
        data.append("user_type", userType)
        console.log('form',data)
        /*
        const data={
            username,
            password,
            first_name,
            last_name,
            email,
            user_type:userType,
            image
        }
        */
        this.props.register(data, (state) => {
            setTimeout(() => {
                if (!state) {
                    console.log('state', state)
                    this._alert.setTitle('Hata')
                    this._alert.setMessage('Kullanıcı Adı Kullanımda!')
                    this._alert.show()
                }else{
                    this.props.navigation.navigate('Home')
                }
            }, 1000)


        })

    }

    pickImage = async () => {

        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Fotoğraf Seçmek İçin Uygulamanın Fotoğraflara Erişimini Etkinleştirmeniz Gerekmektedir!');
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                    base64: true,
                });
                if (!result.cancelled) {
                    let localUri = result.uri;
                    let filename = localUri.split('/').pop();
                    result.name = filename
                    this.setState({ image: result })
                }
            }
        }


    };

    TriangleCorner = (sty) => {
        return <View style={[styles.triangleCorner, sty]} />;
    };

    onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        const { heightChange } = this.props
        this.setState({ pageHeight: height })
        if (heightChange !== undefined)
            heightChange(height)
    }

    render() {
        const { username, password, password2, userType, pageIndex, image, first_name, last_name, email, pageHeight } = this.state
        const { goPage, loading, navigation } = this.props
        console.log('media', loading)
        return (
            <ScrollView style={{ width: '100%', flex: 1, backgroundColor: '#f1f1f1' }}>
                <Image source={icons.LogoFulllGif} style={{ width: '100%', height: height * 0.3 }} resizeMode='contain' />
                <Alert ref={node => (this._alert = node)} />
                <Modal animationType="slide" transparent={true} visible={loading}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Image source={icons.Loading} style={{ width: 100, height: 100 }} />
                    </View>
                </Modal>
                <View >
                    <View>
                        <View style={{ position: 'absolute', right: 20, top: 15 }}>
                            <Dot size={12} count={3} index={pageIndex} color='#9b59b6' />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <Text style={{ fontWeight: '700', fontSize: 20, color: 'black' }}>Kayıt Ol</Text>
                        </View>
                    </View>
                    <View style={styles.loginPanel} >
                        {
                            pageIndex === 0 ?
                                <View style={styles.page}>
                                    <View style={styles.loginItem}>
                                        <Text style={{ marginBottom: 5 }}>Kullanıcı Adı</Text>
                                        <CustomTextInput color={"black"} left={
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
                                        <CustomTextInput color={"black"} left={
                                            <Image source={icons.Password} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                        }
                                            settings={{
                                                secureTextEntry: true,
                                                value: password,
                                                placeholder: 'Şifre', onChangeText: (text) => {
                                                    this.setState({ password: text })
                                                }
                                            }} style={styles.textInput} selectedStyle={styles.textInputSelected}
                                        />
                                    </View>
                                    <View style={styles.loginItem}>
                                        <Text style={{ marginBottom: 5 }}>Şifre Onayı</Text>
                                        <CustomTextInput color={"black"} left={
                                            <Image source={icons.Password} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                        }
                                            settings={{
                                                secureTextEntry: true,
                                                value: password2,
                                                placeholder: 'Şifre Onayı', onChangeText: (text) => {
                                                    this.setState({ password2: text })
                                                }
                                            }} style={styles.textInput} selectedStyle={styles.textInputSelected}
                                        />
                                    </View>
                                </View> : pageIndex === 1 ?
                                    <View style={styles.page}>
                                        <View style={[styles.loginItem, { flexDirection: 'row' }]}>
                                            <View style={{ width: '48%' }}>
                                                <Text style={{ marginBottom: 5 }}>İsim</Text>
                                                <CustomTextInput color={"black"} left={
                                                    <Image source={icons.Identity2} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                                }
                                                    settings={{
                                                        value: first_name,
                                                        placeholder: 'İsim', onChangeText: (text) => {
                                                            this.setState({ first_name: text })
                                                        }
                                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                                            </View>
                                            <View style={{ width: '48%', position: 'absolute', right: 0 }}>
                                                <Text style={{ marginBottom: 5 }}>Soyisim</Text>
                                                <CustomTextInput color={"black"} left={
                                                    <Image source={icons.Identity2} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                                }
                                                    settings={{
                                                        value: last_name,
                                                        placeholder: 'Soyisim', onChangeText: (text) => {
                                                            this.setState({ last_name: text })
                                                        }
                                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                                            </View>
                                        </View>
                                        <View style={styles.loginItem}>
                                            <Text style={{ marginBottom: 5 }}>Mail Adres</Text>
                                            <CustomTextInput color={"black"} left={
                                                <Image source={icons.Mail} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                            }
                                                settings={{
                                                    value: email,
                                                    placeholder: 'Mail Adres', onChangeText: (text) => {
                                                        this.setState({ email: text })
                                                    }
                                                }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                                        </View>
                                    </View> :
                                    <View style={styles.page}>
                                        <View style={styles.loginItem}>
                                            <Text style={{ marginBottom: 5 }}>Profil Resmi</Text>
                                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity style={styles.imageButton} onPress={() => {
                                                    this.pickImage()
                                                }}>
                                                    <Image source={image !== null ? { uri: image.uri } : null} style={styles.imageButton} resizeMode='contain' />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                        }


                    </View>

                    <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 20, flexDirection: 'row', }}>
                        {
                            pageIndex > 0 ?
                                <TouchableOpacity style={[styles.nextButton, { marginRight: 20 }]} onPress={() => {
                                    const index = pageIndex - 1
                                    this.setState({ pageIndex: index })
                                }}>
                                    <Text style={{ color: '#9b59b6' }}>{'<< Geri'}</Text>
                                </TouchableOpacity> : null
                        }
                        <TouchableOpacity style={styles.nextButton} onPress={() => {
                            if (pageIndex < 2) {
                                const index = pageIndex + 1
                                this.setState({ pageIndex: index })
                            } else {
                                this.nullControl()
                            }
                        }}>
                            <Text style={{ color: '#9b59b6' }}>İleri >></Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                        navigation.goBack()
                    }}>
                        <Text>Zaten bir hesabım var </Text>
                        <Text style={{ fontWeight: '700', fontSize: 17, color: '#9b59b6' }}>Giriş Yap!</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity >
                            <Text style={{ color: 'black' }}>Üyelik Sözleşmesi</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style={{position:'absolute',top:10,left:10,backgroundColor:'rgba(0,0,0,0.5)',width:50,height:50,borderRadius:25,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                        navigation.goBack()
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
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
