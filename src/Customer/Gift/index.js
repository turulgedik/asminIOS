import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../../icons'
import { StatusBar } from 'expo-status-bar'
import { styles } from './styles'
import Circle from '../../components/Circle'
import { loginGraphql, getGifts } from '../../Apollo/Api/fal'
import { IMAGE_URL } from '../../redux/actions/host'
import { createGift, falAction } from '../../redux/actions/fal'
import { FORM_GIFT, FORM_TYPE, GIFT_COUNT_UPDATE } from '../../redux/actions/types'
import Toast from 'react-native-toast-message'


const { width, height } = Dimensions.get('window')

export class Gift extends Component {

    state = {
        gifts: [],
    }

    async componentDidMount() {
        const { auth , csrf} = this.props
        await loginGraphql(auth.token,csrf)
        this.getMyGifts()
    }

    async getMyGifts() {
        const result = await getGifts()
        this.setState({ gifts: result.gifts })
    }

    render() {

        const { user, navigation, falAction,createGift } = this.props
        const { gifts } = this.state

        const circleItems = [null, null, null, null, null, null, null, null, null, icons.Gift]

        return (
            <View style={styles.background}>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <Svg width='100%' height={100}>
                        <Ellipse rx={width} ry={100} fill="#9b59b6" cx={width / 2} cy="0" />
                    </Svg>
                    <View style={styles.header}>
                        <TouchableOpacity style={{ paddingHorizontal: 10, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                            <Image source={icons.Back} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Hediye Kutusu</Text>
                        </View>
                        <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: 'white', }}>{user.gift_count}</Text>
                        </View>
                    </View>

                    <Circle items={circleItems} defaultColor='rgba(155,89,182,0.5)' hoverColor='rgba(155,89,182,1)' index={user.gift_count} />

                    {
                        user.gift_count >= 10 ?
                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity 
                                onPress={()=>{
                                    var data = new FormData()
                                    createGift(data,(result)=>{
                                        if(result.ok){
                                            falAction(GIFT_COUNT_UPDATE,result.gift_count)
                                            this.getMyGifts()
                                            Toast.show({
                                                type: 'success',
                                                text1: 'Hediye!',
                                                text2: 'Tebrikler 1 adet hediye kazandınız!',
                                                visibilityTime: 7000
                                            })
                                        }else{
                                            Toast.show({
                                                type: 'error',
                                                text1: 'Hata!',
                                                text2: result.message,
                                                visibilityTime: 7000
                                            })
                                        }
                                    })
                                }}
                                style={{ width: '80%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#9b59b6', borderRadius: 25 }}>
                                    <Text style={{ color: 'white' }}>Hediyeleri Topla</Text>
                                </TouchableOpacity>
                            </View> : null
                    }

                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Hediyeler</Text>

                        {
                            gifts.length === 0 ?
                                <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Henüz Hediyeniz Bulunmamaktadır!</Text> :
                                null
                        }

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                            {
                                gifts.map((item, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            falAction(FORM_TYPE, item.type.type)
                                            falAction(FORM_GIFT, item.id)
                                            navigation.navigate('Form')
                                        }} style={{ width: 120, height: 150, alignItems: 'center', justifyContent: 'center',marginRight:10, borderColor: '#9b59b6', borderRadius: 15, borderWidth: 3 }}>
                                            <Image source={{ uri: IMAGE_URL + item.type.icon }} style={{ width: '100%', flex: 1 }} resizeMode='center' />
                                            <Text style={{ marginBottom: 10, fontSize: 18 }}>{item.type.name}</Text>
                                            <Image source={icons.Gift} style={{ position: 'absolute', right: 0, top: -15, width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                    </View>

                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User.user,
    auth: state.User.auth,
    csrf: state.User.csrf,

})

const mapDispatchToProps = {
    falAction,
    createGift
}

export default connect(mapStateToProps, mapDispatchToProps)(Gift)
