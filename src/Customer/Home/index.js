import React, { Component } from 'react'
import { View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { PieChart } from 'react-native-svg-charts'
import icons from '../../icons'
import Labels from './Components/labels'
import { StatusBar } from 'expo-status-bar'
import { getTypes, loginGraphql, getMyWaitingForms, logoutGraphql, getTopList } from '../../Apollo/Api/fal'
import { loginGraphql as loginGraphqlSub, subsFormID } from '../../Apollo/Api/falSub'
import { IMAGE_URL, MAIN_URL } from '../../redux/actions/host'
import { connect } from 'react-redux'
import { falAction } from '../../redux/actions/fal'
import { FAL_WAITING, FAL_WAITING_UPDATE } from '../../redux/actions/types'
import { FAL_STATUS } from '../../types'
import axios from 'axios'

const { width, height } = Dimensions.get('window')
export class CustomerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSlice: {
                label: '',
                value: 0
            },
            labelWidth: 0,
            types: [],
            topList: []
        }
    }

    async componentDidUpdate(prevProp, prevState) {
        const { user, auth, newForm, csrf } = this.props
        if (user !== prevProp.user && user !== null) {
            await loginGraphql(auth.token,csrf)
            this.getWaitingForms()
        }

        if (prevProp.newForm !== newForm && newForm !== null) {
            this.sub(newForm.id)
        }

        if (prevProp.user !== user && user === null)
            await logoutGraphql()
    }

    async componentDidMount() {

        const { user, auth, csrf } = this.props

        if (user) {
            await loginGraphql(auth.token,csrf)
            this.getWaitingForms()
        }

        const data = await getTypes()
        this.convertTypeToMenu(data.types)
        const topList = await getTopList()
        this.setState({ topList: topList.topStaffList })
    }

    convertTypeToMenu = (data) => {
        const { navigation } = this.props
        let items = []

        data.map(item => {
            console.log('image', IMAGE_URL + item.icon)
            items.push({
                image: IMAGE_URL + item.icon,
                key: item.id,
                amount: 50,
                svg: {
                    stroke: "#9b59b6",
                    strokeWidth: "2",
                    fill: 'white'
                },
                onPress: () => navigation.navigate('StaffList', { type: item.type })
            })
        })

        this.setState({ types: items }, () => console.log('state', this.state))
    }

    async getWaitingForms() {
        const { falAction, auth, csrf } = this.props
        const result = await getMyWaitingForms()
        if (result.formsWait.length > 0) {
            await loginGraphqlSub(auth.token,csrf)
            result.formsWait.map(item => {
                this.sub(item.id)
            })
        }

        falAction(FAL_WAITING, result.formsWait)
    }

    async sub(id) {
        await subsFormID(id, this.updateForm)
    }

    updateForm = (data) => {
        const form = data.data.formUpdateId
        console.log('forms', form)
        this.props.falAction(FAL_WAITING_UPDATE, form)
    }

    getTopRank = () => {

        let items = null



        return items
    }

    TriangleCorner = (sty) => {
        return <View style={[styles.triangleCorner, sty]} />;
    };

    render() {
        const { types, topList } = this.state
        const { navigation, user, waiting } = this.props
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ width: '100%', height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 20 }}>
                        <TouchableOpacity style={styles.topBarItem} onPress={() => {
                            navigation.navigate(user !== null ? 'Gift' : 'Profile')
                        }}>
                            <Image source={icons.Gift} style={{ width: 20, height: 20 }} />
                            <Text style={{ textAlign: 'center', flex: 1, color: 'white' }}>{user !== null ? user.gift_count : 0} / 10</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>

                        </View>
                        <TouchableOpacity style={styles.topBarItem}>
                            <Image source={icons.Coin} style={{ width: 20, height: 20, tintColor: '#f0e178' }} />
                            <Text style={{ textAlign: 'center', flex: 1, color: 'white' }}>{user !== null ? user.coin : 0}</Text>
                        </TouchableOpacity>
                    </View>

                    {waiting.length > 0 ? <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: '700', marginBottom: 10 }}>Bekleyen Yorumlar</Text> : null}
                    {
                        waiting.map((item, i) => {
                            console.log('sta', item.status)
                            return (
                                <View style={{ flexDirection: 'row', marginBottom: 20, marginHorizontal: 10 }} key={i}>
                                    <TouchableOpacity style={styles.userTypeButton} onPress={() => navigation.navigate('PreviewFal', { id: item.id })} >
                                        <Text style={{ color: '#9b59b6' }}>{'#' + item.id + ' Nolu Falınız ' + FAL_STATUS[item.status]}</Text>
                                        {this.TriangleCorner(styles.triangleCornerTopLeft)}
                                        {this.TriangleCorner(styles.triangleCornerBottomRight)}

                                    </TouchableOpacity>
                                </View>
                            )
                        })

                    }

                    <View style={{ marginBottom: 20 }}>
                        <PieChart
                            style={{ height: width / 1.2 }}
                            valueAccessor={({ item }) => item.amount}
                            data={types}
                            spacing={0}
                            outerRadius={'99%'}
                        >
                            <Labels />

                        </PieChart>

                        <TouchableOpacity style={{ position: 'absolute', top: ((width / 1.2) / 4), left: (width / 2) - (width / 1.2) / 4, width: (width / 1.2) / 2, height: (width / 1.2) / 2 }} onPress={() => {
                            navigation.navigate('StaffList')
                        }}>
                            <Image source={icons.LogoFulllGif} style={{ width: '100%', height: '100%' }} resizeMode='contain' />

                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ flex: 1, fontSize: 25, fontWeight: '600', paddingLeft: 10, marginBottom: 20 }}>Öne Çıkan Yorumcular</Text>

                        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    topList.length > 1 ?
                                        <TouchableOpacity onPress={()=>navigation.navigate('StaffCart',{id:topList[1].id})}>
                                            <Image source={topList[1].account.image !== null ? { uri: IMAGE_URL + topList[1].account.image } : icons.User} style={[styles.topUserItem, { borderColor: 'rgba(155,89,182,0.5)', }]} />
                                            <View style={{ marginVertical: 10 }}>
                                                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 15, fontStyle: 'italic' }}>#2</Text>
                                                <Text style={{ textAlign: 'center', fontWeight: '500', marginTop: 5, fontSize: 15 }}>{topList[1].account.firstName + ' ' + topList[1].account.lastName[0] + '.'}</Text>
                                            </View>
                                            <View style={{position:'absolute',right:0,top:0,alignItems:'center',justifyContent:'center'}}>
                                                <Image source={icons.Star} style={{width:30,height:30}}/>
                                                <Text style={{position:'absolute',fontWeight:'700'}}>{topList[1].rate}</Text>
                                            </View>
                                        </TouchableOpacity> : null
                                }
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    topList.length > 0 ?
                                        <TouchableOpacity onPress={()=>navigation.navigate('StaffCart',{id:topList[0].id})}>
                                            <Image source={topList[0].account.image !== null ? { uri: IMAGE_URL + topList[0].account.image } : icons.User} style={[styles.topUserItem, { borderColor: 'rgba(155,89,182,1)', width: width / 3 - 20, height: width / 3 - 20, borderRadius: (width / 3 - 20) / 2 }]} />
                                            <View style={{ marginVertical: 10 }}>
                                                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 15, fontStyle: 'italic' }}>#1</Text>
                                                <Text style={{ textAlign: 'center', fontWeight: '500', marginTop: 5, fontSize: 15 }}>{topList[0].account.firstName + ' ' + topList[0].account.lastName[0] + '.'}</Text>
                                            </View>
                                            <View style={{position:'absolute',right:0,top:0,alignItems:'center',justifyContent:'center'}}>
                                                <Image source={icons.Star} style={{width:30,height:30}}/>
                                                <Text style={{position:'absolute',fontWeight:'700'}}>{topList[0].rate}</Text>
                                            </View>
                                        </TouchableOpacity> : null
                                }
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    topList.length > 2 ?
                                        <TouchableOpacity onPress={()=>navigation.navigate('StaffCart',{id:topList[2].id})}>
                                            <Image source={topList[2].account.image !== null ? { uri: IMAGE_URL + topList[2].account.image } : icons.User} style={[styles.topUserItem, { borderColor: 'rgba(155,89,182,0.2)' }]} />
                                            <View style={{ marginVertical: 10 }}>
                                                <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 15, fontStyle: 'italic' }}>#3</Text>
                                                <Text style={{ textAlign: 'center', fontWeight: '500', marginTop: 5, fontSize: 15 }}>{topList[2].account.firstName + ' ' + topList[2].account.lastName[0] + '.'}</Text>
                                            </View>
                                            <View style={{position:'absolute',right:0,top:0,alignItems:'center',justifyContent:'center'}}>
                                                <Image source={icons.Star} style={{width:30,height:30}}/>
                                                <Text style={{position:'absolute',fontWeight:'700'}}>{topList[2].rate}</Text>
                                            </View>
                                        </TouchableOpacity> : null
                                }
                            </View>

                        </View>

                    </View>

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.topUserBackView}>
                                <Text>Sıra No.</Text>
                            </View>
                            <View style={[styles.topUserBackView, { flex: 2 }]}>
                                <Text>İsim</Text>
                            </View>
                            <View style={[styles.topUserBackView, { borderRightWidth: 0 }]}>
                                <Text>Puan</Text>
                            </View>
                        </View>
                        {
                            topList.map((item, i) => {
                                return (
                                    i>2?
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={()=>navigation.navigate('StaffCart',{id:item.id})}>
                                        <View style={styles.topUserBackView}>
                                            <Text>#{i+1}</Text>
                                        </View>
                                        <View style={[styles.topUserBackView, { flex: 2 }]}>
                                            <Text>{item.account.firstName+' '+item.account.lastName[0]}</Text>
                                        </View>
                                        <View style={[styles.topUserBackView, { borderRightWidth: 0 }]}>
                                            <Text>{item.rate}</Text>
                                        </View>
                                    </TouchableOpacity>:null
                                )
                            })
                        }
                    </View>

                </ScrollView>

                <View style={{ height: 60, width: '100%', borderTopWidth: 0.3, borderTopColor: '#1e1e1e', flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('Market')}>
                        <Image source={icons.Market} style={{ width: 32, height: 32, tintColor: 'black' }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomBarItem}>
                        <Image source={icons.Home} style={{ width: 32, height: 32, tintColor: '#9b59b6' }} resizeMode='contain' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('Profile')}>
                        <Image source={icons.User} style={{ width: 32, height: 32, tintColor: 'black' }} />
                    </TouchableOpacity>
                </View>

                <StatusBar hidden={true} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.User.user,
    waiting: state.Fal.waiting,
    newForm: state.Fal.newForm,
    auth: state.User.auth,
    csrf: state.User.csrf,
})

const mapDispatchToProps = {
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome)