import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native'
import { styles } from './styles'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../../icons'
import { StatusBar } from 'expo-status-bar'
import { getPackets, create } from '../../redux/actions/sales'
import MyModal from '../../components/MyModal'
import CustomTextInput from '../../components/TextInput'
import Toast from 'react-native-toast-message'
import moment from 'moment'
//import IAP from "react-native-iap";


const { width, height } = Dimensions.get('window')


let purchaseUpdate;
let purchaseError;


export class Market extends Component {

    state = {
        packets: [],
        selected: null,
        adress: '',
        phone: '',
        productList: [],
        receipt: '',
        availableItemsMessage: '',
        products: []
    }


    async connectToStore() {
        /*
        const { products } = this.state

        IAP.getProducts(products)
            .catch((ex) => {
                console.log('failed products', ex)
            })
            .then((res) => {
                console.log('getProducts', res)
            })


        purchaseError = IAP.purchaseErrorListener((error) => {
            if (!(error["responseCode"] === "2")) {
                
                console.log('error kode',error["code"])
            }
        });

        purchaseUpdate = IAP.purchaseUpdatedListener((purchase) => {
            const receipt = purchase.transactionReceipt;
            console.log('purchase', purchase)
            if (receipt) {
                this.validate(purchase);
                IAP.finishTransaction(purchase, true);
            }
        });
        */
    }


    validate = (receipt) => {

        if (Platform.OS === 'ios') {

        }
        else{
            this.createOrder(1,receipt.transactionId,receipt.purchaseToken)
        }

    }

    async componentDidMount() {
        /*
        IAP.initConnection()
        .catch(() => {
            console.log("error connecting to store...");
        })
        */
        this.props.getPackets((data) => {
            //console.log('market', data)
            let skuProducts = []
            data.map(item => {

                skuProducts.push(Platform.OS === 'ios' ? item.apple_id : item.android_id)
            })

            this.setState({ packets: data, products: skuProducts }, () => this.connectToStore())
        })
    }

    async componentWillUnmount() {
        try {
            //purchaseUpdate.remove();
        } catch (error) { }
        try {
            //purchaseError.remove();
        } catch (error) { }
        try {
            
            //IAP.endConnection();
        } catch (error) { }
    }


    createOrder = (paymentMethod,specialID=Date.now(),token='') => {
        const { selected, adress, phone, packets } = this.state

        const { user, create, navigation, auth } = this.props
        if (user === null) {
            navigation.navigate('Profile')
            return
        }
        var data = new FormData()
        data.append('packet', selected)
        data.append('payment_method', paymentMethod)
        data.append('currency', 0)
        data.append('phone', phone)
        data.append('adress', adress)
        data.append('specialID', specialID)
        data.append('token',token)

        this.props.create(data, (result) => {
            if (result.ok) {
                if(paymentMethod!==0){
                    Toast.show({
                        type: 'success',
                        text1: 'Onaylandı!',
                        text2: 'Ödeme İşleminiz Onaylandı! Hesabınıza '+packets.find(item => item.id === selected).coin + ' Jeton Aktarıldı.',
                        visibilityTime: 7000
                    })
                }else{
                    this._myModal.onClose()
                    navigation.navigate('Order', { id: result.pk, token: auth.token, packet: packets.find(item => item.id === selected) })
                }
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: 'Bilinmeyen Hata!',
                    visibilityTime: 7000
                })
            }
        })

    }

    render() {
        const { navigation } = this.props
        const { packets, selected, phone, adress, productList } = this.state

        return (
            <View style={styles.background}>

                <MyModal ref={node => (this._myModal = node)}>
                    <View style={styles.modalContentView}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Genel Bilgiler</Text>
                        <Text style={{ fontSize: 15, fontWeight: '400', marginBottom: 10 }}>Telefon Numarası</Text>
                        <CustomTextInput color={"#e6e5f3"}
                            settings={{
                                value: phone,
                                placeholder: '', onChangeText: (text) => {
                                    this.setState({ phone: text })
                                }
                            }} style={styles.textInput} selectedStyle={styles.textInputSelected} />

                        <Text style={{ fontSize: 15, fontWeight: '400', marginVertical: 10 }}>Adres</Text>
                        <CustomTextInput color={"#e6e5f3"}
                            settings={{
                                value: adress,
                                placeholder: '', onChangeText: (text) => {
                                    this.setState({ adress: text })
                                }
                            }} style={styles.textInput} selectedStyle={styles.textInputSelected} />

                        <View style={{ width: '100%', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={[styles.applePayButton, { justifyContent: 'center', backgroundColor: '#27ae60' }]} onPress={() => {
                                this.createOrder(0)
                            }}>
                                <Text style={{ color: 'white', fontWeight: '700', }}>Devam Et</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                            <Text style={{ fontSize: 20, color: 'white' }}>Market</Text>
                        </View>
                        <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Paketler</Text>
                        {
                            packets.map((item, i) => {
                                return (
                                    <TouchableOpacity style={[styles.item, selected === item.id ? { backgroundColor: '#9b59b6' } : {}]} key={i} onPress={() => {
                                        this.setState({ selected: item.id })
                                    }}>
                                        <Image source={{ uri: item.image }} style={{ width: 32, height: 32, marginRight: 10, tintColor: selected === item.id ? 'white' : null }} />
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: selected === item.id ? 'white' : 'black' }}>{item.name}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: '500', color: selected === item.id ? 'white' : 'black' }}>{item.tl} ₺</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>

                </ScrollView>
                <View style={{ paddingVertical: 10, flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {
                            Platform.OS!=='ios'?
                            <TouchableOpacity style={Platform.OS === 'ios' ? styles.applePayButton : styles.googlePayButton} onPress={() => {
                                if (selected === null) {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Hata!',
                                        text2: 'Lütfen Paket Seçin!',
                                        visibilityTime: 7000
                                    })
                                    return
                                }
                                if (this.props.user === null) {
                                    navigation.navigate('Profile')
                                    return
                                }
                                //IAP.requestPurchase(Platform.OS === 'ios' ?packets.find(item=>item.id===selected).apple_id:packets.find(item=>item.id===selected).android_id)
                            }}>
                                <Image source={Platform.OS === 'ios' ? icons.Apple : icons.Google} style={{ width: 32, height: 32, tintColor: 'white', marginRight: 5 }} />
                                <Text style={{ color: 'white', fontWeight: '700', }}>{Platform.OS === 'ios' ? 'Apple' : 'Google'} İle Öde</Text>
                            </TouchableOpacity>:null
                        }
                    </View>
                    <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={[styles.applePayButton, { justifyContent: 'center', backgroundColor: '#27ae60' }]} onPress={() => {
                            if (selected === null) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Hata!',
                                    text2: 'Lütfen Paket Seçin!',
                                    visibilityTime: 7000
                                })
                                return
                            }
                            if (this.props.user === null) {
                                navigation.navigate('Profile')
                                return
                            }
                            this._myModal.onShow()
                        }}>
                            <Image source={icons.CreditCard} style={{ width: 32, height: 32, tintColor: 'white', marginRight: 10 }} />
                            <Text style={{ color: 'white', fontWeight: '700', }}>Kredi Kartı İle Öde</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar hidden={true} />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.User.user,
    auth: state.User.auth,
})

const mapDispatchToProps = {
    getPackets,
    create
}

export default connect(mapStateToProps, mapDispatchToProps)(Market)
