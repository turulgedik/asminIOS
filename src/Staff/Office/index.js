import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import { connect } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import Svg, { Ellipse } from 'react-native-svg'
import { styles } from './styles'
import icons from '../../icons'
import { getOffice } from '../../Apollo/Api/fal'
import { addOffice } from '../../redux/actions/staff'
import { subsOffice } from '../../Apollo/Api/falSub'
import moment from 'moment'
import Toast from 'react-native-toast-message'
import { IMAGE_URL } from '../../redux/actions/host'

const { width, height } = Dimensions.get('window')

export class Office extends Component {

    state = {
        office: {
            firstOfficer: null,
            lastOfficer: null
        }
    }

    async componentDidMount() {
        const result = await getOffice()
        this.setState({ office: result.office }, () => this.officeSub())
    }

    async officeSub() {
        await subsOffice(this.updateOffice)
    }
    
    updateOffice = (data) => {
        const office = data.data.officeUpdate
        
        this.setState({ office: office })
    }

    joinOffice = (way) => {
        this.props.addOffice(way, (res) => {
            if (!res.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: res.message,
                    visibilityTime: 7000
                })
            }
        })
    }

    render() {
        const { navigation, staff } = this.props
        const { office } = this.state
        const { firstOfficer, lastOfficer } = office
        return (
            <View style={styles.background}>
                <Svg width='100%' height={100}>
                    <Ellipse rx={width} ry={100} fill="#9b59b6" cx={width / 2} cy="0" />
                </Svg>
                <View style={styles.header}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                        <Image source={icons.Back} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Nöbet</Text>
                    </View>
                    <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                </View>

                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            firstOfficer !== null ?
                                <View style={styles.cartView}>
                                    <Image source={firstOfficer.staff.account.image !== null ? { uri: IMAGE_URL + firstOfficer.staff.account.image } : icons.User2} style={styles.pp} />
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <Text>{firstOfficer.staff.account.firstName + ' ' + firstOfficer.staff.account.lastName}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            <Image source={icons.Star} style={{ width: 20, height: 20, marginRight: 10 }} />
                                            <Text style={{ fontWeight: '700' }}>{firstOfficer.staff.rate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        {
                                            firstOfficer.staff.writer ?
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Image source={icons.Message} style={{ width: 20, height: 20, marginRight: 5, tintColor: 'black' }} />
                                                    <Text>Yazılı</Text>
                                                </View> : null
                                        }
                                        {
                                            firstOfficer.staff.mic ?
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Image source={icons.Mic} style={{ width: 20, height: 20, marginRight: 5 }} />
                                                    <Text>Sesli</Text>
                                                </View> : null
                                        }

                                    </View>
                                    <View style={{ backgroundColor: '#9b59b6', alignItems: 'center', justifyContent: 'center', height: 30, width: '100%' }}>
                                        <Text style={{ color: 'white' }}>Bitiş : {moment(new Date(firstOfficer.lastDate)).format('hh:mm')}</Text>
                                    </View>
                                </View> :
                                <View style={[styles.cartView, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <TouchableOpacity style={styles.joinButton} onPress={() => {
                                        this.joinOffice('left')
                                    }}>
                                        <Image source={icons.Add} style={{ width: 50, height: 50, tintColor: 'white' }} />
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            lastOfficer !== null ?
                                <View style={styles.cartView}>
                                    <Image source={lastOfficer.staff.account.image !== null ? { uri: IMAGE_URL + lastOfficer.staff.account.image } : icons.User2} style={styles.pp} />
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <Text>{lastOfficer.staff.account.firstName + ' ' + lastOfficer.staff.account.lastName}</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                            <Image source={icons.Star} style={{ width: 20, height: 20, marginRight: 10 }} />
                                            <Text style={{ fontWeight: '700' }}>{lastOfficer.staff.rate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                        {
                                            lastOfficer.staff.writer ?
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Image source={icons.Message} style={{ width: 20, height: 20, marginRight: 5, tintColor: 'black' }} />
                                                    <Text>Yazılı</Text>
                                                </View> : null
                                        }
                                        {
                                            lastOfficer.staff.mic ?
                                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Image source={icons.Mic} style={{ width: 20, height: 20, marginRight: 5 }} />
                                                    <Text>Sesli</Text>
                                                </View> : null
                                        }

                                    </View>
                                    <View style={{ backgroundColor: '#9b59b6', alignItems: 'center', justifyContent: 'center', height: 30, width: '100%' }}>
                                        <Text style={{ color: 'white' }}>Bitiş : {moment(new Date(lastOfficer.lastDate)).format('hh:mm')}</Text>
                                    </View>
                                </View> :
                                <View style={[styles.cartView, { alignItems: 'center', justifyContent: 'center' }]}>
                                    <TouchableOpacity style={styles.joinButton} onPress={() => {
                                        this.joinOffice('right')
                                    }}>
                                        <Image source={icons.Add} style={{ width: 50, height: 50, tintColor: 'white' }} />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                    <Text style={{ marginTop: 10, textAlign: 'center', backgroundColor: '#9b59b6', width: '100%', paddingVertical: 10, color: 'white' }}>
                        Sonraki Nöbet Tarihi : {moment(new Date(staff.officeDate)).format('YYYY-MM-DD hh:mm')}
                    </Text>
                </View>

                <StatusBar hidden={true} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    staff: state.Staff.staff,

})

const mapDispatchToProps = {
    addOffice
}

export default connect(mapStateToProps, mapDispatchToProps)(Office)
