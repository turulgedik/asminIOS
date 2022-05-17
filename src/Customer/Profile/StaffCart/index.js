import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import icons from '../../../icons'
import { IMAGE_URL } from '../../../redux/actions/host'
import Moment from 'moment'
import { connect } from 'react-redux'
import { falAction } from '../../../redux/actions/fal'
import { FORM_COIN, FORM_STAFF, FORM_TYPE } from '../../../redux/actions/types'
import { getStaffID } from '../../../Apollo/Api/fal'
import { followTo } from '../../../redux/actions/auth'

export class StaffCart extends Component {

    state={
        staff:null
    }


    async componentDidMount(){
        this.getStaff()
    }

    async getStaff(){
        const {route}=this.props
        const {params}=route

        if (params !== undefined && params.id !== undefined){
            const result = await getStaffID(params.id)
            console.log('getStaffById',result)
            this.setState({staff:result.staff})
        }
    }


    coinListItem = (name, coin, type) => {
        const { navigation, falAction, route } = this.props

        return (
            <View style={{ flexDirection: 'row', height: 60 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Image source={icons.Coin} style={{ width: 22, height: 22, marginRight: 10 }} />
                    <Text>{coin}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.sendButtom, { width: '80%', height: 40, borderRadius: 20 }]} onPress={() => {
                        falAction(FORM_STAFF, this.state.staff)
                        falAction(FORM_TYPE, type)
                        falAction(FORM_COIN, coin)
                        navigation.navigate('Form')
                    }}>
                        <Text style={{ color: '#9b59b6' }}>Yorumlat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    coinList = (staff) => {

        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', marginHorizontal: 10 }}>Fiyat Listesi</Text>
                {
                    staff.coffie ?
                        this.coinListItem('Kahve Yorumu', staff.coffieCoin, 'coffie') : null
                }
                {
                    staff.tarot ?
                        this.coinListItem('Tarot Yorumu', staff.tarotCoin, 'tarot') : null
                }
                {
                    staff.katina ?
                        this.coinListItem('Katina Yorumu', staff.katinaCoin, 'katina') : null
                }
                {
                    staff.iskambil ?
                        this.coinListItem('İskambil Yorumu', staff.iskambilCoin, 'iskambil') : null
                }
                {
                    staff.water ?
                        this.coinListItem('Su Yorumu', staff.waterCoin, 'water') : null
                }
                {
                    staff.star ?
                        this.coinListItem('Yıldızname', staff.starCoin, 'star') : null
                }
                {
                    staff.dream ?
                        this.coinListItem('Rüya Yorumu', staff.dreamCoin, 'dream') : null
                }
            </View>
        )

    }

    commentItem = (comment) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Image source={comment.account.image !== null ? { uri: IMAGE_URL + comment.account.image } : icons.User} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 0.5, borderColor: '#e1e1e1', marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: '700', marginBottom: 10 }}>{comment.account.firstName + ' ' + comment.account.lastName}</Text>
                    <Text style={{ fontStyle: 'italic', fontSize: 13 }}>{comment.comment}</Text>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ fontWeight: '600', fontSize: 12 }}>{Moment(new Date(comment.createDate)).format('DD.MM.YYYY hh:mm')}</Text>
                </View>
            </View>
        )
    }

    follow=(id)=>{
        const {followTo}=this.props
        let staff = {...this.state.staff}
        followTo(id,(data)=>{
            if(data.status){
                staff.isFollow=true
                staff.followCount=staff.followCount+1
            }else{
                staff.isFollow=false
                staff.followCount=staff.followCount-1
            }

            this.setState({staff:staff})
        })
    }

    render() {

        const { route, navigation, falAction,followTo } = this.props
        const { params } = route
        const {staff}=this.state
        let type = null

        if (params !== undefined && params.type !== undefined)
            type = params.type

        return (
            staff===null?<View/>:
            <View style={styles.background}>
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
                            <TouchableOpacity style={styles.box} onPress={() => { }}>

                                <Image source={staff.account.image !== null ? { uri: IMAGE_URL + staff.account.image } : icons.User2} style={{ width: '100%', height: '100%', }} resizeMode='contain' />

                            </TouchableOpacity>

                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{staff.account.firstName + ' ' + staff.account.lastName}</Text>

                        </View>

                        <View style={styles.info}>
                            {
                                staff.writer ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                        <Image source={icons.Message} style={{ width: 25, height: 25, marginRight: 10, tintColor: 'white' }} />
                                        <Text style={{ color: 'white' }}>Yazılı</Text>
                                    </View> : null
                            }
                            {
                                staff.mic ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Mic} style={{ width: 25, height: 25, marginRight: 10, tintColor: 'white' }} />
                                        <Text style={{ color: 'white' }}>Sesli</Text>
                                    </View> : null
                            }
                        </View>

                        <TouchableOpacity onPress={()=>{
                            this.follow(staff.id)
                        }}
                        style={{position:'absolute',top:20,left:20,padding:10,backgroundColor:staff.isFollow?'#e74c3c':'#3aacf8',borderRadius:15}}>
                            <Text style={{color:'white'}}>{staff.isFollow?'Takibi Bırak':'Takip Et'}</Text>
                        </TouchableOpacity>


                        <View style={styles.boxInBottom}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.Friends} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#3aacf8' }} />
                                    <Text style={{ color: 'white' }}>{staff.followCount}</Text>
                                </View>
                            </View>
                            {
                                type ?
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={icons.Coin} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#f0e178' }} />
                                            <Text style={{ color: 'white' }}>{
                                                type === 'coffie' ?
                                                    staff.coffieCoin :
                                                    type === 'tarot' ?
                                                        staff.tarotCoin :
                                                        type === 'katina' ?
                                                            staff.katinaCoin :
                                                            type === 'iskambil' ?
                                                                staff.iskambilCoin :
                                                                type === 'water' ?
                                                                    staff.waterCoin :
                                                                    type === 'star' ?
                                                                        staff.starCoin :
                                                                        type === 'dream' ?
                                                                            staff.dreamCoin : null
                                            }</Text>
                                        </View>
                                    </View> : null
                            }
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.Star} style={{ width: 25, height: 25, marginRight: 10 }} />
                                    <Text style={{ color: 'white' }}>{staff.rate}</Text>
                                </View>
                            </View>
                        </View>


                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                        {
                            type ?
                                <TouchableOpacity style={styles.sendButtom} onPress={() => {
                                    falAction(FORM_STAFF, staff)
                                    falAction(FORM_TYPE, type)
                                    falAction(FORM_COIN, type === 'coffie' ?
                                        staff.coffieCoin :
                                        type === 'tarot' ?
                                            staff.tarotCoin :
                                            type === 'katina' ?
                                                staff.katinaCoin :
                                                type === 'iskambil' ?
                                                    staff.iskambilCoin :
                                                    type === 'water' ?
                                                        staff.waterCoin :
                                                        type === 'star' ?
                                                            staff.starCoin :
                                                            type === 'dream' ?
                                                                staff.dreamCoin : 0)
                                    navigation.navigate('Form')
                                }}>
                                    <Text style={{ marginRight: 10, color: '#9b59b6' }}>Yorumlat</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={icons.Coin} style={{ width: 25, height: 25, marginRight: 10, tintColor: '#9b59b6' }} />
                                        <Text style={{ color: '#9b59b6' }}>{
                                            type === 'coffie' ?
                                                staff.coffieCoin :
                                                type === 'tarot' ?
                                                    staff.tarotCoin :
                                                    type === 'katina' ?
                                                        staff.katinaCoin :
                                                        type === 'iskambil' ?
                                                            staff.iskambilCoin :
                                                            type === 'water' ?
                                                                staff.waterCoin :
                                                                type === 'star' ?
                                                                    staff.starCoin :
                                                                    type === 'dream' ?
                                                                        staff.dreamCoin : null
                                        }</Text>
                                    </View>
                                </TouchableOpacity> :
                                this.coinList(staff)
                        }
                    </View>

                    <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '700', marginBottom: 20 }}>Hakkında</Text>

                    <Text style={{ marginHorizontal: 10 }}>
                        {staff.info}
                    </Text>

                    <Text style={{ marginLeft: 10, fontSize: 25, fontWeight: '700', marginVertical: 20 }}>Yorumlar</Text>

                    <View style={{ paddingHorizontal: 10 }}>
                        {
                            staff.comments.map((item, i) => {
                                return this.commentItem(item)
                            })
                        }
                    </View>

                </ScrollView>

                <StatusBar hidden={true} />
            </View>


        )
    }
}

const mapStateToProps = (state) => ({
    item: state.Form
})

const mapDispatchToProps = {
    falAction,
    followTo
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffCart)
