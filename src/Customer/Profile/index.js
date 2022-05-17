import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import icons from '../../icons'
import Alert from '../../components/Alert'
import MyModal from '../../components/MyModal'
import Constants from "expo-constants"
import CustomTextInput from '../../components/TextInput'
import { connect } from 'react-redux'
import { logOut, updateAccount } from '../../redux/actions/auth'
import { Gender, Love_Type } from '../../types'
import Moment from 'moment'
import { getHoroscopes, getSectors } from '../../Apollo/Api/form'
import * as ImagePicker from 'expo-image-picker'
import CalendarPicker from 'react-native-calendar-picker';

const GENDER_TYPE = 'GENDER_TYPE'
const MAIL_TYPE = 'MAIL_TYPE'
const LOVE_TYPE = 'LOVE_TYPE'
const DATE_TYPE = 'DATE_TYPE'
const HOROSCOPE_TYPE = 'HOROSCOPE_TYPE'
const SECTOR_TYPE = 'SECTOR_TYPE'


const version = Constants.manifest.version


export class CustomerProfile extends Component {

    state = {
        user: null,
        modalType: GENDER_TYPE,
        modalValue: '',
        selectedImage: null,
        horoscopes: [],
        sectors: [],
    }

    componentDidUpdate(prevProp, prevState) {


    }

    async componentDidMount() {
        const { navigation, user } = this.props


        if (user === null)
            navigation.navigate('Login')
        else {
            this.setState({ user })
        }

        const hor = await getHoroscopes()
        const sec = await getSectors()

        this.setState({ horoscopes: hor.horoscopes, sectors: sec.sectors }, () => console.log('state', this.state))

    }

    save = (key, value) => {

        const { user, selectedImage } = this.state

        let data = new FormData()
        data.append('key', key)
        data.append('value', value)
        console.log('data', data)
        this.props.updateAccount(data, (res) => {
            console.log('res', res)

        })

    }

    ageCal = (date) => {
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
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

                    this.save('image', result)
                }
            }
        }


    };

    modalContent = () => {
        const { modalType, user, modalValue, horoscopes, sectors } = this.state
        let _account = user !== null ? { ...user } : null
        const title = modalType === GENDER_TYPE ? 'Cinsiyet Seç' :
            modalType === MAIL_TYPE ? 'Mail' :
                modalType === LOVE_TYPE ? 'İlişki Durumu' :
                    modalType === DATE_TYPE ? 'Doğum Tarihi' :
                        modalType === SECTOR_TYPE ? 'Sektör Seç' : 'Burç Seç'

        const genderView = <ScrollView>
            {
                Gender.map((item, i) => {
                    return (
                        <TouchableOpacity style={item.id === modalValue ? styles.selectedItem : styles.item} onPress={() => {
                            this.setState({ modalValue: item.id })
                        }}>
                            <Text style={{ color: item.id === modalValue ? 'white' : 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </ScrollView>

        const loveView = <ScrollView>
            {
                Love_Type.map((item, i) => {
                    return (
                        <TouchableOpacity style={item.id === modalValue ? styles.selectedItem : styles.item} onPress={() => {
                            this.setState({ modalValue: item.id })
                        }}>
                            <Text style={{ color: item.id === modalValue ? 'white' : 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </ScrollView>

        const horoscopeView = <ScrollView>
            {
                horoscopes.map((item, i) => {
                    return (
                        <TouchableOpacity style={item.id === modalValue ? styles.selectedItem : styles.item} onPress={() => {
                            this.setState({ modalValue: item.id })
                        }}>
                            <Text style={{ color: item.id === modalValue ? 'white' : 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </ScrollView>
        const sectorView = <ScrollView>
            {
                sectors.map((item, i) => {
                    return (
                        <TouchableOpacity style={item.id === modalValue ? styles.selectedItem : styles.item} onPress={() => {
                            this.setState({ modalValue: item.id })
                        }}>
                            <Text style={{ color: item.id === modalValue ? 'white' : 'black' }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })

            }
        </ScrollView>

        const mailView = <CustomTextInput color={"white"}
            settings={{
                placeholderTextColor: "#e5e5e5",
                value: modalValue,
                placeholder: 'Mail', textAlign: 'center', onChangeText: (text) => {

                    this.setState({ modalValue: text })
                }
            }} style={styles.textInput} selectedStyle={styles.textInputSelected} />



        return (
            user === null ? <View /> :
                <View style={styles.modalContentView}>
                    <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>{title}</Text>

                    {
                        modalType === GENDER_TYPE ? genderView :
                            modalType === MAIL_TYPE ? mailView :
                                modalType === LOVE_TYPE ? loveView :
                                    modalType === SECTOR_TYPE ? sectorView : horoscopeView
                    }

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.modalOkButton} onPress={() => {

                            if (modalType === GENDER_TYPE) {
                                this.save('gender', modalValue)
                            }
                            else if (modalType === MAIL_TYPE) {
                                this.save('email', modalValue)
                            }
                            else if (modalType === LOVE_TYPE) {
                                this.save('love_type', modalValue)
                            }

                            else if (modalType === HOROSCOPE_TYPE) {
                                this.save('horoscope', modalValue)
                            }

                            else if (modalType === SECTOR_TYPE) {
                                this.save('sector', modalValue)
                            }


                            this._modal.onClose()

                        }}>
                            <Text style={{ color: 'white' }}>Tamam</Text>
                        </TouchableOpacity>
                    </View>

                </View>
        )

    }

    item = (type, leftIcon, title, text, rightIcon, enable = false) => {
        return (
            <TouchableOpacity disabled={enable}
                style={{ flexDirection: 'row', height: 60, alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#e1e1e1', borderBottomWidth: 0.5 }}
                onPress={() => {
                    this.setState({ modalType: type, modalValue: null }, () => {
                        if (type === DATE_TYPE)
                            this._datePicker.onShow()
                        else
                            this._modal.onShow()
                    })
                }}>
                <Image source={leftIcon} style={{ width: 32, height: 32, marginRight: 10, tintColor: 'black' }} />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ flex: 0.5 }}>{title}</Text>
                    <Text style={{ flex: 1 }} numberOfLines={1}>{text}</Text>
                </View>
                <Image source={rightIcon} style={{ width: 32, height: 32, marginRight: 10 }} />
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation, user } = this.props
        const { selectedImage, } = this.state
        console.log('user', user)
        return (
            user === null ? <View /> :
                <View style={styles.background}>
                    <Alert ref={node => (this._alert = node)} />
                    <MyModal ref={node => (this._modal = node)}>
                        {this.modalContent()}
                    </MyModal>
                    <MyModal ref={node => (this._datePicker = node)} fullWidth={true}>
                        <CalendarPicker
                            weekdays={['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT']}
                            months={['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']}
                            previousTitle="Önceki"
                            nextTitle="İleri"
                            todayBackgroundColor="rgba(242,203,5,0.2)"
                            selectedDayColor="#ecd447"
                            startFromMonday={true}
                            onDateChange={(date) => {
                                const dateText = Moment(date).format('YYYY-MM-DD')
                                this.save('bDay', dateText)
                            }}
                        />
                    </MyModal>
                    <MyModal ref={node => (this._helpModal = node)}>
                        <View style={styles.modalContentView}>
                            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Yardım</Text>
                            <TouchableOpacity style={styles.helpButton} onPress={() => {
                                Linking.openURL('whatsapp://send?text=&phone=+905529223496')

                            }}>
                                <Image source={icons.Whatsapp} style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' />
                                <Text style={{ flex: 1 }}>Whatsappp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.helpButton} onPress={() => {
                                Linking.openURL('tel:05330922434')
                            }}>
                                <Image source={icons.Phone} style={{ width: 32, height: 32, marginRight: 10, tintColor: 'black' }} resizeMode='contain' />
                                <Text style={{ flex: 1 }}>Telefon</Text>
                            </TouchableOpacity>
                        </View>
                    </MyModal>
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        <View style={styles.header}>

                            <TouchableOpacity style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                                <Image source={icons.Back} style={{ width: 42, height: 42 }} />
                            </TouchableOpacity>

                            <View style={styles.headerTextContainer}>
                                <Text style={{ fontSize: 20 }}>Profil</Text>
                            </View>

                        </View>

                        <View style={styles.ovalBack}>

                            <View style={styles.oval} />
                            <View style={styles.boxContainer}>
                                <TouchableOpacity style={styles.box} onPress={() => { this.pickImage() }}>

                                    <Image source={selectedImage !== null ? { uri: selectedImage.uri } : user.image === null ? icons.User : { uri: user.image }}
                                        style={selectedImage !== null || user.image !== null ? { width: '100%', height: '100%', } : { width: 75, height: 75, tintColor: 'white' }} />

                                </TouchableOpacity>

                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{user.first_name + ' ' + user.last_name}</Text>

                            </View>


                            <View style={styles.boxInBottom}>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=>navigation.navigate('Followers')}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Friends} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#3aacf8' }} />
                                        <Text style={{ color: 'white' }}>{user.follow_count}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Coin} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#f0e178' }} />
                                        <Text style={{ color: 'white' }}>{user.coin}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={()=>{
                                    navigation.navigate('History')
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Coffie} style={{ width: 25, height: 25, marginRight: 10,tintColor:'white' }} />
                                        <Text style={{ color: 'white' }}>{user.fal_count}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>


                        </View>

                        <View style={styles.contentContainer}>
                            {this.item(null, icons.User2, "Kullanıcı Adı", ': ' + user.username, null, true)}
                            {this.item(MAIL_TYPE, icons.Mail, "Mail", ': ' + user.email, icons.Right, false)}
                            {this.item(GENDER_TYPE, icons.Gender, "Cinsiyet", ': ' + Gender[user.gender].name, icons.Right, false)}
                            {this.item(LOVE_TYPE, icons.Love, "İlişki", ': ' + Love_Type[user.love_type].name, icons.Right, false)}
                            {this.item(DATE_TYPE, icons.Date, "Doğum Tarihi", ': ' + (user.bDay !== null ? Moment(new Date(user.bDay)).format('YYYY - MM - DD') : 'Boş'), icons.Right, false)}
                            {this.item(null, icons.Candle, "Yaş", ': ' + this.ageCal(user.bDay !== null ? user.bDay : new Date()), null, true)}
                            {this.item(HOROSCOPE_TYPE, icons.Horoscope, "Burç", ': ' + (user.horoscope !== null ? user.horoscope.name : 'Boş'), icons.Right, false)}
                            {this.item(SECTOR_TYPE, icons.Sector, "Sektör", ': ' + (user.sector !== null ? user.sector.name : 'Boş'), icons.Right, false)}
                        </View>

                        <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this._alert.setTitle('Çıkıp Yap')
                                this._alert.setMessage('Çıkış Yapmak İstediğinizden Emin Misiniz?')
                                this._alert.setConfirmText('Evet')
                                this._alert.confirmHandler(() => {
                                    this.props.logOut()
                                    navigation.goBack()
                                })
                                this._alert.show()
                            }}
                                style={{ width: '70%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: '#e74c3c', borderWidth: 1, borderColor: '#c0392b' }}>
                                <Text style={{ color: 'white' }}>Çıkış Yap</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: '50%', backgroundColor: '#3498db', borderRadius: 25 }} onPress={() => {
                                this._helpModal.onShow()
                            }}>
                                <Text style={{ color: 'white' }}>Yardım</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                            <Text>Version : {version}</Text>
                        </View>

                    </ScrollView>

                    <StatusBar hidden={true} />
                </View>


        )
    }
}


const mapStateToProps = (state) => ({
    user: state.User.user

})

const mapDispatchToProps = {
    logOut,
    updateAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfile)