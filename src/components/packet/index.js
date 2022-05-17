import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { styles } from './style'
import icons from '../../icons'
import Moment from 'moment'

export default class Packet extends Component {

    static propTypes = {
        packet: PropTypes.object,
        type: PropTypes.string
    }

    render() {

        const { packet, type } = this.props
        const packetStatus = packet.status
        const { creator, kurye, description, allKM, allPrice, adresses } = packet

        const color = packetStatus !== 3 ? '#ecd447' : '#e74c3c'
        const unHoverColor = packetStatus !== 3 ? 'rgba(242,203,5,0.2)' : '#e74c3c'

        return (
            <TouchableOpacity  onPress={() => {
                this.props.click(packet.id)
            }}>

                <View style={{zIndex:99,borderBottomLeftRadius:30,borderBottomRightRadius:30,backgroundColor:'white'}}>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 100, }}>
                            <Image source={icons.ComplateBox} style={{ width: 75, height: 75 }} resizeMode='contain' />
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' }}>{creator._account.first_name + ' ' + creator._account.last_name}</Text>
                            <Text style={{ fontSize: 15, marginTop: 10 }} numberOfLines={2}>{description}</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: 100, }}>
                            <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center' }}>{allPrice} TL</Text>
                            <Text style={{ fontSize: 15, fontWeight: '500', textAlign: 'center', marginTop: 10 }}>{allKM} km</Text>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={[styles.circleContainer, { borderColor: packetStatus > 0 ? color : unHoverColor }]}>
                                    <View style={[styles.circle, { backgroundColor: packetStatus > 0 ? color : unHoverColor }]}>
                                        {packetStatus !== 3 ?
                                            <Image source={icons.PacketStatus1} style={{ width: 40, height: 40 }} /> : null
                                        }
                                    </View>
                                </View>
                                <View style={[styles.arrow, { backgroundColor: packetStatus > 0 ? color : unHoverColor }]} />
                            </View>
                            <View style={{ marginTop: 10, width: 45, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'black' }}>{packetStatus !== 3 ? 'Alındı' : ''}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={[styles.circleContainer, { borderColor: packetStatus > 0 ? color : unHoverColor }]}>
                                    <View style={[styles.circle, { backgroundColor: packetStatus > 0 ? color : unHoverColor }]} >
                                        <Image source={packetStatus !== 3 ? icons.PacketStatus2 : icons.Cancel} style={{ width: 40, height: 40 }} />
                                    </View>
                                </View>
                                <View style={[styles.arrow, { backgroundColor: packetStatus > 1 ? color : unHoverColor }]} />
                            </View>
                            <View style={{ marginTop: 10, width: 45, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: packetStatus > 1 ? 'black' : 'rgba(0,0,0,0.2)' }}>{packetStatus !== 3 ? 'Yolda' : 'İptal'}</Text>
                            </View>

                        </View>
                        <View>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <View style={[styles.circleContainer, { borderColor: packetStatus > 1 ? color : unHoverColor }]}>
                                    <View style={[styles.circle, { backgroundColor: packetStatus > 1 ? color : unHoverColor }]} >
                                        {packetStatus !== 3 ?
                                            <Image source={icons.ComplateBox} style={{ width: 40, height: 40 }} /> : null
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 12, color: packetStatus > 3 ? 'black' : 'rgba(0,0,0,0.2)' }}>{packetStatus !== 3 ? 'Teslim' : ''}</Text>
                            </View>
                        </View>
                    </View>
                
                    
                </View>

                <View style={{height:100,backgroundColor:'#ecf0f1',zIndex:-1,marginTop:-70,alignContent:'center',justifyContent:'flex-end'}}>
                    <View style={{height:30,justifyContent:'center',paddingHorizontal:10}}>
                        <Text>Tarih : {Moment(new Date(packet.create_date)).format('DD / MM / yyyy hh:mm')}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }
}


Packet.defaultProps = {
    type: 'isletme'
}