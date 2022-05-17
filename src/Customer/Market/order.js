import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import { styles } from './styles'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../../icons'
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux'
import {falAction} from '../../redux/actions/fal'
import { COIN_UPDATE } from '../../redux/actions/types'

const { width, height } = Dimensions.get('window')

const PAYMENT_LINK = 'https://asminshopping.com/backend/sale/payment/'
const SUCCESS_LINK = 'https://asminshopping.com/backend/sale/success/'
const FAIL_LINK = 'https://asminshopping.com/backend/sale/failure/'

export class Order extends Component {

    state = {
        loading: true,
        success: false,
        error: false
    }

    render() {

        const { navigation, route,user,falAction } = this.props
        const { loading, success, error } = this.state
        const { params } = route
        console.log('token', params)

        return (
            <View style={[styles.background, { backgroundColor: 'white' }]}>

                <Svg width='100%' height={100}>
                    <Ellipse rx={width} ry={100} fill="#9b59b6" cx={width / 2} cy="0" />
                </Svg>
                <View style={styles.header}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                        <Image source={icons.Back} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Ödeme Sayfası</Text>
                    </View>
                    <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                </View>
                {
                    success ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Image source={icons.CheckMar} style={{ width: 100, height: 100 }} />
                            <Text style={{ paddingHorizontal:10,fontSize: 18, marginTop: 10, fontWeight: '500', textAlign: 'center', fontStyle: 'italic' }}>Ödemeniz Alındı! Jetonlarınızı Güle Güle Kullanın.</Text>
                            <TouchableOpacity style={{ marginTop: 10, width: 150, height: 50, borderRadius: 25, backgroundColor: '#3498db', alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                                navigation.goBack()
                            }}>
                                <Text style={{ color: 'white' }}>Geri Git!</Text>
                            </TouchableOpacity>
                        </View> : null
                }
                {
                    error ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Image source={icons.Error} style={{ width: 100, height: 100 }} />
                            <Text style={{ paddingHorizontal:10,fontSize: 18, marginTop: 10, fontWeight: '500', textAlign: 'center', fontStyle: 'italic' }}>Ödemeniz Alınamadı! Lütfen Tekrar Deneyin.</Text>
                            <TouchableOpacity style={{ marginTop: 10, width: 150, height: 50, borderRadius: 25, backgroundColor: '#3498db', alignItems: 'center', justifyContent: 'center' }} onPress={() => {
                                navigation.goBack()
                            }}>
                                <Text style={{ color: 'white' }}>Geri Git!</Text>
                            </TouchableOpacity>
                        </View> : null
                }
                {
                    !success && !error ?
                        <View style={{ flex: 1 }}>
                            <WebView
                                style={{ flex: 1 }}
                                onNavigationStateChange={(state) => {
                                    console.log('webWid',state)
                                    let succ = false
                                    let err = false
                                    if (state.url === SUCCESS_LINK){
                                        succ = true
                                        falAction(COIN_UPDATE,user.coin+params.packet.coin)
                                    }
                                    else if (state.url === FAIL_LINK)
                                        err = true

                                    this.setState({ loading: state.loading, success: succ, error: err })
                                }}
                                source={{
                                    uri: PAYMENT_LINK,
                                    headers: {
                                        'Authorization': 'Token ' + params.token
                                    }
                                }}

                            />
                        </View> : null
                }
                {
                    loading && (!error && !success) ?
                        <View style={{ position: 'absolute', height: 75, top: (height / 2) - 37.5, left: (width / 2) - 37.5 }}>
                            <Image source={icons.Loading} style={{ position: 'absolute', width: 75, height: 75 }} />
                        </View> : null
                }
            </View>
        )
    }
}



const mapStateToProps = (state) => ({
    user: state.User.user,
})

const mapDispatchToProps = {
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
