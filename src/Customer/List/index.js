import React, { Component } from 'react'
import { ScrollView, View, Dimensions, Image, Text, TouchableOpacity, Switch, Modal } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../../icons'
import { getOffice, getStaff } from '../../Apollo/Api/fal'
import { loginGraphql, subsOffice, subsStaff } from '../../Apollo/Api/falSub'
import { IMAGE_URL } from '../../redux/actions/host'
import CustomTextInput from '../../components/TextInput'

import { connect } from 'react-redux'
import { falAction } from '../../redux/actions/fal'



const { width, height } = Dimensions.get('window')

export class StaffList extends Component {

    state = {
        staffList: [],
        type: 'coffie',
        mic: true,
        writer: true,
        search: '',
        filterBar: false,
        office: {
            firstOfficer: null,
            lastOfficer: null
        },
    }

    async componentDidMount() {
        const { route } = this.props
        loginGraphql("1")
        this.sub()
        const data = await getStaff(route.params === undefined ? null : route.params.type)
        const result = await getOffice()
        this.setState({ office: result.office, staffList: route.params === undefined ? data.staffList : data.staffListType, loading:false }, () => console.log(this.state), () => {
            this.officeSub()
        })


    }

    async sub() {
        await subsStaff(this.updateStaff)
    }
    async officeSub() {
        await subsOffice(this.updateOffice)
    }
    updateOffice = (data) => {
        const office = data.data.officeUpdate

        this.setState({ office: office })
    }
    updateStaff = (data) => {
        let copy = [...this.state.staffList]
        const newData = data.data.staffUpdate
        let index = copy.findIndex(item => item.id === newData.id)
        copy.splice(index, 1, newData)
        console.log('copy', index)

        this.setState({ staffList: copy })
    }

    itemRender = (staff) => {
        const { account } = staff
        const { route, navigation, falAction } = this.props
        let type = undefined

        if (route.params !== undefined)
            type = route.params.type


        return (
            <TouchableOpacity style={styles.usercardBack} onPress={() => {
                const coin = 'coffie' ? staff.coffieCoin :
                    type === 'tarot' ? staff.tarotCoin :
                        type === 'katina' ? staff.katinaCoin :
                            type === 'water' ? staff.waterCoin :
                                type === 'iskambil' ? staff.iskambilCoin :
                                    type === 'star' ? staff.starCoin :
                                        staff.dreamCoin

                navigation.navigate('StaffCart', { id:staff.id, type })
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

                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    type !== undefined ?
                                        <Image source={icons.Coin} style={{ width: 20, height: 20, marginRight: 10 }} /> : null
                                }
                                {
                                    type === undefined ?
                                        <View /> :
                                        <Text style={{ fontWeight: '700' }}>
                                            {
                                                type === 'coffie' ? staff.coffieCoin :
                                                    type === 'tarot' ? staff.tarotCoin :
                                                        type === 'katina' ? staff.katinaCoin :
                                                            type === 'water' ? staff.waterCoin :
                                                                type === 'iskambil' ? staff.iskambilCoin :
                                                                    type === 'star' ? staff.starCoin :
                                                                        staff.dreamCoin
                                            }
                                        </Text>
                                }
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

    filter = () => {
        let list = []
        const { staffList, mic, writer, search } = this.state

        if (writer)
            staffList.filter(item => item.writer === true).map(item => list.push(item))

        if (mic)
            staffList.filter(item => item.mic === true && list.findIndex(x => x.id === item.id) === -1).map(item => list.push(item))

        if (search.length > 0)
            return staffList.filter(item => item.account.firstName.includes(search) || item.account.lastName.includes(search))
        else
            return list
    }

    render() {

        const { staffList, search, mic, writer, filterBar, office } = this.state
        const { navigation, type } = this.props
        const { firstOfficer, lastOfficer } = office


        const filter = this.filter()
        const complateList = filter.sort((x, y) => {
            return (x.online === y.online) ? 0 : x.online ? -1 : 1;
        })

        console.log('complate', complateList)

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
                            <Text style={{ fontSize: 20, color: 'white' }}>Kahve Yorumcuları</Text>
                        </View>
                        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: filterBar ? '#8c25b7' : '#9b59b6', width: 50, marginRight: 10, borderRadius: 15, height: 50, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.setState({ filterBar: !filterBar })}>
                                <Image source={icons.Filter} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        filterBar ?
                            <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 20 }}>Filtre</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                    <CustomTextInput color={"#e6e5f3"}
                                        settings={{
                                            value: search,
                                            placeholder: 'Yorumcu Ara', onChangeText: (text) => {
                                                this.setState({ search: text })
                                            }
                                        }} style={styles.textInput} selectedStyle={styles.textInputSelected}
                                        left={
                                            <Image source={icons.Search} style={{ width: 25, height: 25, marginRight: 10 }} />
                                        } />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                        <Image source={icons.Message} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'black' }} />
                                        <Text style={{ marginRight: 5, fontSize: 10 }}>Yazılı : </Text>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#9b59b6' }}
                                            thumbColor={writer ? '#f5dd4b' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={(val) => this.setState({ writer: val })}
                                            value={writer}
                                            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={icons.Mic} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'black' }} />
                                        <Text style={{ marginRight: 5, fontSize: 10 }}>Sesli : </Text>
                                        <Switch
                                            trackColor={{ false: '#767577', true: '#9b59b6' }}
                                            thumbColor={mic ? '#f5dd4b' : '#f4f3f4'}
                                            ios_backgroundColor="#3e3e3e"
                                            onValueChange={(val) => this.setState({ mic: val })}
                                            value={mic}
                                            style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                        />
                                    </View>
                                </View>
                            </View> : null
                    }

                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            {
                                firstOfficer ?
                                    <TouchableOpacity style={styles.sentryView} onPress={()=>{
                                        navigation.navigate('StaffCart', { id:firstOfficer.staff.id, type })
                                    }}>
                                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                            <Image source={icons.User2} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'white' }} />
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>{firstOfficer.staff.account.firstName + ' ' + firstOfficer.staff.account.lastName.charAt(0)}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                                    <Image source={icons.Star} style={{ width: 20, height: 20, marginRight: 10 }} />
                                                    <Text style={{ fontWeight: '700' }}>{firstOfficer.staff.rate}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#9b59b6', alignItems: 'center', justifyContent: 'center', height: 30, marginBottom: 5 }}>
                                            <Text style={{ color: 'white' }}>NÖBETÇİ</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            <Image source={icons.Coin} style={{ width: 20, height: 20, marginRight: 10 }} />
                                            <Text style={{ fontWeight: '700' }}> {
                                                type === 'coffie' ? firstOfficer.staff.coffieCoin :
                                                    type === 'tarot' ? firstOfficer.staff.tarotCoin :
                                                        type === 'katina' ? firstOfficer.staff.katinaCoin :
                                                            type === 'water' ? firstOfficer.staff.waterCoin :
                                                                type === 'iskambil' ? firstOfficer.staff.iskambilCoin :
                                                                    type === 'star' ? firstOfficer.staff.starCoin :
                                                                        firstOfficer.staff.dreamCoin
                                            }</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
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
                                    </TouchableOpacity> : null
                            }
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        {
                                lastOfficer ?
                                    <TouchableOpacity style={styles.sentryView} onPress={()=>{
                                        navigation.navigate('StaffCart', { id:lastOfficer.staff.id, type })
                                    }}>
                                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                            <Image source={icons.User2} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'white' }} />
                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <Text>{lastOfficer.staff.account.firstName + ' ' + lastOfficer.staff.account.lastName.charAt(0)}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                                    <Image source={icons.Star} style={{ width: 20, height: 20, marginRight: 10 }} />
                                                    <Text style={{ fontWeight: '700' }}>{lastOfficer.staff.rate}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ backgroundColor: '#9b59b6', alignItems: 'center', justifyContent: 'center', height: 30, marginBottom: 5 }}>
                                            <Text style={{ color: 'white' }}>NÖBETÇİ</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                                            <Image source={icons.Coin} style={{ width: 20, height: 20, marginRight: 10 }} />
                                            <Text style={{ fontWeight: '700' }}> {
                                                type === 'coffie' ? lastOfficer.staff.coffieCoin :
                                                    type === 'tarot' ? lastOfficer.staff.tarotCoin :
                                                        type === 'katina' ? lastOfficer.staff.katinaCoin :
                                                            type === 'water' ? lastOfficer.staff.waterCoin :
                                                                type === 'iskambil' ? lastOfficer.staff.iskambilCoin :
                                                                    type === 'star' ? lastOfficer.staff.starCoin :
                                                                        lastOfficer.staff.dreamCoin
                                            }</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
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
                                    </TouchableOpacity> : null
                            }
                        </View>
                    </View>

                    {
                        complateList.map((item => this.itemRender(item)))
                    }

                </ScrollView>

                <StatusBar hidden={true} />
            </View>
        )
    }
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    falAction
}


export default connect(mapStateToProps, mapDispatchToProps)(StaffList)
