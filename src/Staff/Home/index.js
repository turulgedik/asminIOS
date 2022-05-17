import React, { Component } from 'react'
import { View, Dimensions, Text, Image, Switch, ScrollView, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import WavyHeader from '../../components/WavyHeader'
import icons from '../../icons'
import { connect } from 'react-redux'
import { falAction } from '../../redux/actions/fal'
import { loginGraphql, getMyStaff, getMyWaitingForms, getForm, getPools } from '../../Apollo/Api/staff'
import { STAFF, STAFF_FORMS, STAFF_FORMS_ADD, STAFF_FORMS_REMOVE, STAFF_FORMS_UPDATE, STAFF_POOLS, STAFF_POOLS_ADD, STAFF_POOLS_REMOVE, STAFF_POOLS_UPDATE, STAFF_UPDATE } from '../../redux/actions/types'
import { IMAGE_URL } from '../../redux/actions/host'
import { FAL_STATUS_STAFF } from '../../types'
import Moment from 'moment'
import { loginGraphql as loginGraphqlSub, subsFormID } from '../../Apollo/Api/falSub'
import { loginGraphql as loginGraphqlStaffSub, subsStaff, subsPoolCreate, subsPoolUpdate } from '../../Apollo/Api/staffSubs'
import { registerPushNotification } from '../../notification'
import { updatePushToken } from '../../redux/actions/auth'
import Toast from 'react-native-toast-message'
import { setStatus } from '../../redux/actions/staff'

export class StaffHome extends Component {

    state = {
        online: true,
        message: true,
        mic: true
    }

    async newNotification(notification) {
        const { falAction } = this.props
        const { title, body, data } = notification.request.content
        Toast.show({
            type: 'success',
            text1: title,
            text2: body,
            visibilityTime: 7000
        })
        console.log('')
        if (data.type === 'create') {
            const result = await getForm(Number.parseInt(data.id))
            falAction(STAFF_FORMS_ADD, result.form)
        }

    }

    async componentDidUpdate(prevProp, prevState) {
        const { user, auth, falAction, csrf } = this.props
        if (user !== prevProp.user) {
            await loginGraphql(auth.token,csrf)
            await loginGraphqlStaffSub(auth.token,csrf)
            const data = await getMyStaff()
            this.staffSub(data.myStaff.id)
            falAction(STAFF, data.myStaff)
            this.getWaitingForms()
        }
    }

    async componentDidMount() {
        const { user, auth, falAction, updatePushToken, csrf } = this.props

        if (user) {
            await loginGraphql(auth.token,csrf)
            await loginGraphqlStaffSub(auth.token,csrf)
            const data = await getMyStaff()
            this.staffSub(data.myStaff.id)
            falAction(STAFF, data.myStaff)
            this.getWaitingForms()
            this.getPool()
            registerPushNotification(this.newNotification).then(token => updatePushToken(token))
        }

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

        falAction(STAFF_FORMS, result.formsWait)

    }

    async getPool() {
        const { falAction, auth } = this.props
        const result = await getPools()

        await subsPoolCreate(this.createPool)
        await subsPoolUpdate(this.updatePool)
        falAction(STAFF_POOLS, result.pools)

    }

    async sub(id) {
        await subsFormID(id, this.updateForm)
    }
    async staffSub(id) {
        await subsStaff(id, this.updateStaff)
    }



    updateStaff = (data) => {
        const staff = data.data.staffUpdateId
        console.log('staff', staff)
        this.props.falAction(STAFF_UPDATE, staff)
    }

    updateForm = (data) => {
        const form = data.data.formUpdateId
        console.log('forms', form)
        this.props.falAction(STAFF_FORMS_UPDATE, form)
    }

    createPool = (data) => {
        const form = data.data.poolCreated
        this.props.falAction(STAFF_POOLS_ADD, form)
    }

    updatePool = (data) => {
        const {staff,forms,pool}=this.props
        const form = data.data.poolUpdate

        if(form.to!==null){
            if(form.to.id===staff.id && (forms.find(item=>item.id===form.id)===null || forms.find(item=>item.id===form.id)===undefined)){
                this.props.falAction(STAFF_FORMS_ADD, form)
            }
            this.props.falAction(STAFF_POOLS_REMOVE, form.id)
        }
        else{
            if(pool.find(item=>item.id===form.id)===null || pool.find(item=>item.id===form.id)===undefined)
                this.props.falAction(STAFF_POOLS_ADD, form)
            if(forms.find(item=>item.id===form.id)!==null || forms.find(item=>item.id===form.id)!==undefined)
                this.props.falAction(STAFF_FORMS_REMOVE, form.id)
            this.props.falAction(STAFF_POOLS_UPDATE, form)
        }
    }

    itemRender = (item, pool = false) => {
        const { navigation } = this.props
        const { account } = item

        return (
            <TouchableOpacity style={[styles.item, pool ? { backgroundColor: '#40a6ff' } : {}]} onPress={() => navigation.navigate('PreviewFal', { id: item.id })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 25, padding: 10 }}>
                    <Image source={!account.image ? icons.User : { uri: IMAGE_URL + account.image }} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 0.5, borderColor: '#e1e1e1', marginRight: 10 }} />
                    <View style={{ marginRight: 10, overflow: 'hidden', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '600', fontSize: 15, marginBottom: 10, marginRight: 10 }}>{account.firstName + ' ' + account.lastName}</Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>#{item.id}</Text>
                        </View>
                        <Text style={{ fontStyle: 'italic' }} numberOfLines={2} ellipsizeMode='tail'>{item.info}</Text>
                    </View>
                    {
                        !pool ?
                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Image source={icons.Coin} style={{ width: 32, height: 32, marginRight: 5 }} />
                                <Text>{item.coin}</Text>
                            </View> : null
                    }
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={item.answerType === 'mic' ? icons.Mic : icons.Message} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'white' }} />
                        <Text style={{ color: 'white' }}>{item.answerType === 'mic' ? 'Sesli' : 'Yazılı'} </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: IMAGE_URL + item.type.icon }} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'white' }} />
                        <Text style={{ color: 'white' }}>{item.type.name} </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{
                            width: 25, height: 25, borderRadius: 12.5, borderWidth: 2, borderColor: 'white', marginRight: 5,
                            backgroundColor: item.status === 0 ? null : item.status === 1 ? 'white' : item.status === 2 ? '#2ecc71' : '#e74c3c'
                        }} />
                        <Text style={{ color: 'white' }}>{FAL_STATUS_STAFF[item.status]}</Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'white' }}>{Moment(new Date(item.createDate)).format('hh:mm')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { online, message, mic } = this.state
        const { staff, forms, falAction, user, setStatus, navigation, pool } = this.props

        return (
            !staff ? <View /> :
                <View style={styles.background}>
                    <WavyHeader customStyles={styles.svgCurve} />
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Asmin Fal</Text>
                    </View>
                    <TouchableOpacity style={styles.officeButton} onPress={() => navigation.navigate('Office')}>
                        <Image source={icons.Office} style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    <View style={styles.topBar}>
                        <View style={{ flex: 1, paddingTop: 20, paddingLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                <Text style={{ marginRight: 10 }}>Çevrimiçi : </Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#2ecc71' }}
                                    thumbColor={staff.online ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(val) => setStatus('online', val === true ? 1 : 0)}
                                    value={staff.online}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={icons.Message} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'black' }} />
                                    <Text style={{ marginRight: 5, fontSize: 10 }}>Yazılı : </Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#9b59b6' }}
                                        thumbColor={staff.writer ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(val) => setStatus('writer', val === true ? 1 : 0)}
                                        value={staff.writer}
                                        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={icons.Mic} style={{ marginRight: 5, width: 25, height: 25, tintColor: 'black' }} />
                                    <Text style={{ marginRight: 5, fontSize: 10 }}>Sesli : </Text>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#9b59b6' }}
                                        thumbColor={staff.mic ? '#f5dd4b' : '#f4f3f4'}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={(val) => setStatus('mic', val === true ? 1 : 0)}
                                        value={staff.mic}
                                        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderRadius: 40, borderColor: '#9b59b6' }}>
                                <Image source={!user.image ? icons.User : { uri: user.image }} style={{ width: 75, height: 75, borderRadius:40 }} />
                            </View>
                            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10, }}>{user.first_name + ' ' + user.last_name}</Text>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1, padding: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Bekleyenler</Text>

                        {
                            forms.map((item) => {
                                return this.itemRender(item)
                            })
                        }

                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Havuz</Text>

                        {
                            pool.map((item) => {
                                return this.itemRender(item, true)
                            })
                        }

                    </ScrollView>

                    <View style={{ height: 60, width: '100%', borderTopWidth: 0.3, borderTopColor: '#1e1e1e', flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.bottomBarItem} onPress={() => navigation.navigate('History')}>
                            <Image source={icons.History} style={{ width: 32, height: 32, tintColor: 'black' }} />
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
    auth: state.User.auth,
    staff: state.Staff.staff,
    forms: state.Staff.forms,
    pool: state.Staff.pool,
    csrf: state.User.csrf,

})

const mapDispatchToProps = {
    falAction,
    updatePushToken,
    setStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffHome)
