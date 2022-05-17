import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView,Modal } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../../icons'
import CustomTextInput from '../../components/TextInput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-tools'
import { COIN_UPDATE, FAL_COUNT_UPDATE, FAL_NEW, FAL_WAITING_ADD, FORM_ANSWER_TYPE, FORM_BDAY, FORM_COFFIE, FORM_GENDER, FORM_HOROSCOPE, FORM_INFO, FORM_LOVETYPE, FORM_MOMNAME, FORM_NAME, FORM_PART_BDAY, FORM_PART_HOROSCOPE, FORM_PART_INFO, FORM_PART_MOMNAME, FORM_PART_NAME, FORM_SECTOR, FORM_SURNAME, GIFT_COUNT_UPDATE } from '../../redux/actions/types'
import { falAction, create } from '../../redux/actions/fal'
import MyModal from '../../components/MyModal'
import Alert from '../../components/Alert'
import Moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker';
import { getHoroscopes, getSectors } from '../../Apollo/Api/form'
import { COFFIE_FAL, TAROT_FAL, Gender, Love_Type, KATINA_FAL, ISKAMBIL_FAL, WATER_FAL } from '../../types'
import Coffie from './coffie'
import Tarot from './tarot'
import Katina from './katina'
import Iskambil from './iskambil'
import Water from './water'
import Toast from 'react-native-toast-message';
import { loginGraphql, getForm } from '../../Apollo/Api/fal'

const { width, height } = Dimensions.get('window')
const HOROSCOPE = 'horoscope'
const GENDER = 'gender'
const LOVE = 'love'
const SECTOR = 'sector'
const PART_HOROSCOPE = 'part_horoscope'
const BDAY = 'bDay'
const PART_BDAY = 'part_bDay'

export class Form extends Component {

    state = {
        keyboardHeight: 0,
        horoscopes: [],
        modalType: HOROSCOPE,
        sectors: [],
        dateType: BDAY,
    }

    async componentDidMount() {
        const hor = await getHoroscopes()
        const sec = await getSectors()

        this.setState({ horoscopes: hor.horoscopes, sectors: sec.sectors })
    }


    modalContent = () => {
        const { modalType, horoscopes, sectors } = this.state
        const { item, falAction } = this.props
        const title = modalType === HOROSCOPE ? 'Burç Seç' : modalType === SECTOR ? 'Sektör Seç' : modalType === GENDER ? 'Cinsiyet Seç' : modalType === LOVE ? 'İlişki Durumu Seç' : 'Partnerin Burcu'

        const items = modalType === HOROSCOPE ? horoscopes : modalType === SECTOR ? sectors : modalType === GENDER ? Gender : modalType === LOVE ? Love_Type : horoscopes
        const selected = modalType === HOROSCOPE ? item.horoscope : modalType === SECTOR ? item.sector : modalType === GENDER ? item.gender : modalType === LOVE ? item.loveType : item.part_horoscope

        return (
            <View style={styles.modalContentView}>
                <View style={{ marginBottom: 20, flexDirection: 'row', height: 50, alignItems: 'center', }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>{title}</Text>

                </View>
                <ScrollView>
                    {
                        items.map((item, i) => {
                            return (
                                <TouchableOpacity style={item === selected ? styles.selectedItem : styles.item} onPress={() => {
                                    falAction(modalType === HOROSCOPE ? FORM_HOROSCOPE : modalType === SECTOR ? FORM_SECTOR : modalType === GENDER ? FORM_GENDER : modalType === LOVE ? FORM_LOVETYPE : FORM_PART_HOROSCOPE, item)
                                }}>
                                    <Text style={{ color: selected === item ? 'white' : 'black' }}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })

                    }
                </ScrollView>
            </View>
        )

    }

    coffieControl = () => {
        const { item } = this.props
        const { image1, image2, image3, image4, image5 } = item.coffie

        if (image1 === null && image2 === null && image3 === null && image4 === null && image5 === null)
            return false

        return true
    }

    tarotControl = () => {
        const { item } = this.props
        if (item.tarot.length < 7)
            return false

        return true
    }

    katinaControl = () => {
        const { item } = this.props
        if (item.katina.length < 7)
            return false

        return true
    }

    iskambilControl = () => {
        const { item } = this.props
        if (item.iskambil.length < 7)
            return false

        return true
    }

    waterControl = () => {
        const { item } = this.props
        const { pp, part_pp } = item.water

        if (pp === null || part_pp === null)
            return false

        return true
    }

    TriangleCorner = (sty) => {
        return <View style={[styles.triangleCorner, sty]} />;
    };

    sendFal = () => {
        const { item, user, navigation, create, auth, falAction } = this.props

        if (user === null) {
            this._myAlert.setTitle('Hata!')
            this._myAlert.setMessage('İşleme devam edebilmek için lütfen giriş yapınız.')
            this._myAlert.setConfirmText('Giriş Yap')
            this._myAlert.confirmHandler(() => {
                navigation.navigate('Profile')
            })
            this._myAlert.show()

            return
        }

        const { water } = item
        const { image1, image2, image3, image4, image5 } = item.coffie

        const data = new FormData()

        data.append('staff', item.staff ? item.staff.id : null)
        data.append('name', item.name)
        data.append('surname', item.surname)
        data.append('bDay', item.bDay)
        data.append('horoscope', item.horoscope ? item.horoscope.id : null)
        data.append('gender', item.gender ? item.gender.id : 0)
        data.append('love_type', item.loveType ? item.loveType.id : -1)
        data.append('sector', item.sector ? item.sector.id : null)
        data.append('info', item.info)
        data.append('type', item.type)
        data.append('part_name', item.part_name)
        data.append('part_mom_name', item.part_mom_name)
        data.append('part_bDay', item.part_bDay)
        data.append('part_horoscope', item.part_horoscope ? item.part_horoscope.id : null)
        data.append('part_info', item.part_info)
        data.append('coin', item.coin)
        data.append('answer_type', item.answer_type)
        data.append('gift',item.gift)
        data.append('pool',item.gift!==null?true:false)

        if (item.answer_type === null) {
            Toast.show({
                type: 'error',
                text1: 'Hata!',
                text2: 'Cevap Tipi Seçmeniz Gerekmektedir!',
                visibilityTime: 7000
            })
            return
        }

        if (item.type === 'coffie') {
            if (this.coffieControl()) {
                data.append('image1', image1 ? { uri: image1.uri, name: 'coffie.jpg', type: 'image/jpg' } : null)
                data.append('image2', image2 ? { uri: image2.uri, name: 'coffie.jpg', type: 'image/jpg' } : null)
                data.append('image3', image3 ? { uri: image3.uri, name: 'coffie.jpg', type: 'image/jpg' } : null)
                data.append('image4', image4 ? { uri: image4.uri, name: 'coffie.jpg', type: 'image/jpg' } : null)
                data.append('image5', image5 ? { uri: image5.uri, name: 'coffie.jpg', type: 'image/jpg' } : null)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: 'En Az 1 Görüntü Yüklemeniz Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        } else if (item.type === 'tarot') {
            if (this.tarotControl()) {
                let stringArray = ''
                item.tarot.map((x, i) => {
                    stringArray += x + (i < 6 ? ',' : '')
                })
                data.append('cards', stringArray)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: '7 Adet Kart Seçmeniz Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        } else if (item.type === 'katina') {
            if (this.katinaControl()) {
                let stringArray = ''
                item.katina.map((x, i) => {
                    stringArray += x + (i < 6 ? ',' : '')
                })
                data.append('cards', stringArray)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: '7 Adet Kart Seçmeniz Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        } else if (item.type === 'iskambil') {
            if (this.iskambilControl()) {
                let stringArray = ''
                item.iskambil.map((x, i) => {
                    stringArray += x + (i < 6 ? ',' : '')
                })
                data.append('cards', stringArray)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: '7 Adet Kart Seçmeniz Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        } else if (item.type === 'water') {
            if (this.waterControl()) {
                data.append('pp', water.pp ? { uri: water.pp.uri, name: 'water_pp.jpg', type: 'image/jpg' } : null)
                data.append('part_pp', water.part_pp ? { uri: water.part_pp.uri, name: 'water_part_pp.jpg', type: 'image/jpg' } : null)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: 'Kendinin ve Partnerinin Fotoğrafları Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        } else if (item.type === 'star') {
            if (item.mom_name.length > 1 && item.name.length > 1) {
                data.append('mom_name', item.mom_name)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: 'Adınızı ve Annenizin Adı Gerekmektedir.',
                    visibilityTime: 7000
                })
                return
            }
        }

        create(data, (res) => {
            console.log('reds', res)
            if (!res.ok) {
                this._myAlert.setTitle('Hata!')
                this._myAlert.setMessage(res.message)
                this._myAlert.setConfirmText('Tamam')
                this._myAlert.confirmHandler(() => { })
                this._myAlert.show()
            } else {
                falAction(GIFT_COUNT_UPDATE,res.gift_count)
                falAction(FAL_COUNT_UPDATE,res.fal_count)
                falAction(COIN_UPDATE,res.coin)
                this.getFormDetail(res.form)

                this._myAlert.setTitle('Onay!')
                this._myAlert.setMessage('Falınız Yorumcuya Gönderildi. En Kısa Sürede Yanıtlanacaktır.')
                this._myAlert.setConfirmText('Tamam')
                this._myAlert.confirmHandler(() => {
                    navigation.navigate('Home')
                })
                this._myAlert.show()

            }
        })

    }

    async getFormDetail(id) {
        const { falAction, auth ,csrf} = this.props
        await loginGraphql(auth.token,csrf)
        const formDetail = await getForm(id)
        falAction(FAL_NEW, formDetail.form)
        falAction(FAL_WAITING_ADD, formDetail.form)
    }


    render() {
        const { keyboardHeight, dateType } = this.state
        const { item, falAction,loading, navigation } = this.props
        console.log('item', item)
        return (
            <KeyboardAvoidingView
                behavior={"height"}
                style={styles.background}
            >
                <Modal animationType="slide" transparent={true} visible={loading}>
                    <View style={{width:'100%',height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
                        <Image source={icons.Loading} style={{width:100,height:100}} />
                    </View>
                </Modal>
                <MyModal ref={node => (this._myModal = node)}>
                    {this.modalContent()}
                </MyModal>
                <Alert ref={node => (this._myAlert = node)} />
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
                            falAction(dateType === BDAY ? FORM_BDAY : FORM_PART_BDAY, dateText)
                            this._datePicker.onClose()
                        }}
                    />
                </MyModal>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <Svg width='100%' height={100}>
                        <Ellipse rx={width} ry={100} fill="#9b59b6" cx={width / 2} cy="0" />
                    </Svg>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ paddingHorizontal: 10, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                            <Image source={icons.Back} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Form</Text>
                        </View>
                        <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                    <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 20, fontWeight: '700' }}>Kişisel Bilgiler</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>İsim</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.name,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_NAME, text)
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Soyisim</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.surname,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_SURNAME, text)
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Doğum Tarihi</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ dateType: BDAY }, () => this._datePicker.onShow())
                                }}>
                                    <Text>{item.bDay}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Burç</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ modalType: HOROSCOPE }, () => this._myModal.onShow())
                                }}>
                                    <Text>{item.horoscope !== null ? item.horoscope.name : ''}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Cinsiyet</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ modalType: GENDER }, () => this._myModal.onShow())
                                }}>
                                    <Text>{item.gender !== null ? item.gender.name : ''}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>İlişki Durumu</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ modalType: LOVE }, () => this._myModal.onShow())
                                }}>
                                    <Text>{item.loveType !== null ? item.loveType.name : ''}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Sektörünüz</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ modalType: SECTOR }, () => this._myModal.onShow())
                                }}>
                                    <Text>{item.sector !== null ? item.sector.name : ''}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 20, fontWeight: '700' }}>İlişki Durumu</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Partnerin İsmi</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.part_name,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_PART_NAME, text)
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Partnerin Anne İsmi</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.part_mom_name,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_PART_MOMNAME, text)
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Partnerin Doğum Tarihi</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ dateType: PART_BDAY }, () => this._datePicker.onShow())
                                }}>
                                    <Text>{item.part_bDay}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Partnerin Burçu</Text>
                                <TouchableOpacity style={[styles.textInput, { justifyContent: 'center', alignItems: 'center' }]} onPress={() => {
                                    this.setState({ modalType: PART_HOROSCOPE }, () => this._myModal.onShow())
                                }}>
                                    <Text>{item.part_horoscope !== null ? item.part_horoscope.name : ''}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Partner Hakkında</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.part_info,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_PART_INFO, text)
                                        },
                                        multiline: true,
                                        maxLength: 500
                                    }} style={[styles.textInput, { height: 150 }]} selectedStyle={[styles.textInputSelected, { height: 150 }]} />
                                <Text style={{ marginTop: 5, textAlign: 'right', color: '#c1c1c1' }}>{item.part_info.length} / 500</Text>
                            </View>
                        </View>

                    </View>
                    <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 20, fontWeight: '700' }}>Hangi Konuda Bilgi Almak İstiyorsunuz?</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginBottom: 5 }}>Kısaca Açıklayın</Text>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: item.info,
                                        placeholder: '', onChangeText: (text) => {
                                            falAction(FORM_INFO, text)
                                        },
                                        multiline: true,
                                        maxLength: 500
                                    }} style={[styles.textInput, { height: 150 }]} selectedStyle={[styles.textInputSelected, { height: 150 }]} />
                                <Text style={{ marginTop: 5, textAlign: 'right', color: '#c1c1c1' }}>{item.info.length} / 500</Text>
                            </View>
                        </View>

                    </View>

                    <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 20, fontWeight: '700' }}>Cevap Tipi</Text>

                    <View style={{ flexDirection: 'row', marginBottom: 20 }}>

                        {
                            item.gift !== null || (item.staff !== null && item.staff.writer) ?
                                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10 }}>
                                    <TouchableOpacity style={styles.answerTypeButton} onPress={() => {
                                        falAction(FORM_ANSWER_TYPE, 'write')
                                    }} >
                                        <Image source={icons.Message} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#9b59b6' }} />
                                        <Text style={{ color: '#9b59b6' }}>Yazılı</Text>
                                        {item.answer_type === 'write' ? this.TriangleCorner(styles.triangleCornerTopLeft) : null}
                                        {item.answer_type === 'write' ? this.TriangleCorner(styles.triangleCornerBottomRight) : null}

                                    </TouchableOpacity>
                                </View> : null
                        }
                        {
                            item.gift !== null || (item.staff !== null && item.staff.mic) ?
                                <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10 }}>
                                    <TouchableOpacity style={styles.answerTypeButton} onPress={() => {
                                        falAction(FORM_ANSWER_TYPE, 'mic')
                                    }} >
                                        <Image source={icons.Mic} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#9b59b6' }} />
                                        <Text style={{ color: '#9b59b6' }}>Sesli</Text>
                                        {item.answer_type === 'mic' ? this.TriangleCorner(styles.triangleCornerTopLeft) : null}
                                        {item.answer_type === 'mic' ? this.TriangleCorner(styles.triangleCornerBottomRight) : null}

                                    </TouchableOpacity>
                                </View> : null
                        }

                    </View>

                    {
                        item.type === COFFIE_FAL ?
                            <Coffie navigation={navigation} /> :
                            item.type === TAROT_FAL ?
                                <Tarot /> :
                                item.type === KATINA_FAL ?
                                    <Katina /> :
                                    item.type === ISKAMBIL_FAL ?
                                        <Iskambil /> :
                                        item.type === WATER_FAL ?
                                            <Water /> :
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <View style={{ width: '90%', marginBottom: 20 }}>
                                                    <Text style={{ marginBottom: 5 }}>Anne Adı</Text>
                                                    <CustomTextInput color={"#e6e5f3"}
                                                        settings={{
                                                            value: item.mom_name,
                                                            placeholder: '', onChangeText: (text) => {
                                                                falAction(FORM_MOMNAME, text)
                                                            }
                                                        }} style={styles.textInput} selectedStyle={styles.textInputSelected} />
                                                </View>
                                            </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 10, flex: 1 }}>Yorumcu</Text>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 10, flex: 0.5, textAlign: 'center' }}>Tür</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                        {
                            item.gift === null ?
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <Image source={!item.staff && !item.staff.account.image ? { uri: item.staff.account.image } : icons.User}
                                        style={{ width: 75, height: 75, marginRight: 10 }} />
                                    <Text style={{ fontSize: 13, fontWeight: '300' }}>{'#' + item.staff.account.id}</Text>
                                    <Text style={{ fontSize: 18, fontWeight: '500' }}>
                                        {item.staff.account.firstName + ' ' + item.staff.account.lastName}
                                    </Text>
                                </View> : <View style={{flex:1}} />
                        }
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>
                                {
                                    item.type === 'coffie' ?
                                        'Kahve Yorumu' :
                                        item.type === 'tarot' ?
                                            'Tarot Yorumu' :
                                            item.type === 'katina' ?
                                                'Katina Yorumu' :
                                                item.type === 'iskambil' ?
                                                    'İskambil Yorumu' :
                                                    item.type === 'water' ?
                                                        'Su Yorumu' :
                                                        item.type === 'star' ?
                                                            'Yıldızname' :
                                                            item.type === 'dream' ?
                                                                'Rüya Yorumu' : null}
                            </Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                        <TouchableOpacity style={styles.sendButtom} onPress={() => {
                            this.sendFal()
                        }}>
                            <Text style={{ marginRight: 10, color: '#9b59b6' }}>Gönder</Text>
                            {
                                item.gift === null ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Coin} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#9b59b6' }} />
                                        <Text style={{ color: '#9b59b6' }}>{
                                            item.type === 'coffie' ?
                                                item.staff.coffieCoin :
                                                item.type === 'tarot' ?
                                                    item.staff.tarotCoin :
                                                    item.type === 'katina' ?
                                                        item.staff.katinaCoin :
                                                        item.type === 'iskambil' ?
                                                            item.staff.iskambilCoin :
                                                            item.type === 'water' ?
                                                                item.staff.waterCoin :
                                                                item.type === 'star' ?
                                                                    item.staff.starCoin :
                                                                    item.type === 'dream' ?
                                                                        item.staff.dreamCoin : null
                                        }</Text>
                                    </View> : null
                            }
                        </TouchableOpacity>
                    </View>

                    <StatusBar hidden={true} />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.Form,
    user: state.User.user,
    auth: state.User.auth,
    loading:state.App.loading,
    csrf: state.User.csrf,

})

const mapDispatchToProps = {
    falAction,
    create
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)