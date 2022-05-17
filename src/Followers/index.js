import React, { Component } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import {styles} from './styles'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../icons'
import { StatusBar } from 'expo-status-bar'
import { connect } from 'react-redux'
import { getMyFollow, loginGraphql } from '../Apollo/Api/fal'
import { IMAGE_URL } from '../redux/actions/host'

const { width, height } = Dimensions.get('window')

export class Followers extends Component {

    state={
        followers:[]
    }

    async componentDidMount(){
        const {auth, csrf}=this.props
        await loginGraphql(auth.token,csrf)

        const result = await getMyFollow()
        this.setState({followers:result.friends})

    }

    staffItemRender = (staff) => {
        const { account } = staff
        const {  navigation } = this.props

        return (
            <TouchableOpacity style={styles.usercardBack} onPress={() => {
                navigation.navigate('StaffCart', { id:staff.id })
            }}>
                <View style={styles.userCard}>
                    <Image source={account.image !== null ? { uri: IMAGE_URL + account.image } : icons.User} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 0.5, borderColor: '#e1e1e1', marginRight: 10 }} resizeMode='contain' />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: '700' }}>{account.firstName + ' ' + account.lastName}</Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
                                {staff.coffie ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Kahve</Text> : null}
                                {staff.tarot ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Tarot</Text> : null}
                                {staff.katina ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Katina</Text> : null}
                                {staff.water ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Su</Text> : null}
                                {staff.iskambil ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#İskambil</Text> : null}
                                {staff.star ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Yıldız</Text> : null}
                                {staff.dream ? <Text style={{ marginRight: 10, fontStyle: 'italic' }}>#Rüya</Text> : null}
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={icons.Star} style={{ width: 20, height: 20, marginRight: 10 }} />
                                <Text style={{ fontWeight: '700' }}>{staff.rate}</Text>
                            </View>


                        </View>
                    </View>
                </View>
                <View style={{ padding: 10, flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={icons.Friends} style={{ width: 20, height: 20, marginRight: 10, tintColor: 'white' }} />
                        <Text style={{ color: 'white' }}>{staff.followCount}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            staff.writer ?
                                <View style={{ flexDirection: 'row', marginRight: 20 }}>
                                    <Image source={icons.Message} style={{ width: 20, height: 20, marginRight: 10, tintColor: 'white' }} />
                                    <Text style={{ color: 'white' }}>Yazılı</Text>
                                </View> : null
                        }
                        {
                            staff.mic ?
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={icons.Mic} style={{ width: 20, height: 20, marginRight: 10, tintColor: 'white' }} />
                                    <Text style={{ color: 'white' }}>Sesli</Text>
                                </View> : null
                        }


                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 20, height: 20, marginRight: 10, borderRadius: 10, backgroundColor: staff.online ? '#2ecc71' : '#34495e' }} />
                        <Text style={{ color: 'white' }}>{staff.online ? 'Çevrimiçi' : 'Çevrimdışı'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const {navigation}=this.props
        const {followers}=this.state

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
                            <Text style={{ fontSize: 20, color: 'white' }}>Takip Ettiklerim</Text>
                        </View>
                        <View style={{ width: 42, height: '100%', alignItems: 'center', justifyContent: 'center' }} />
                    </View>

                    <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                        
                        {
                            followers.map((item,i)=>{
                                return(
                                    this.staffItemRender(item.to)
                                )
                            })
                        }

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
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers)
