import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import icons from '../icons'
import CalendarPicker from 'react-native-calendar-picker';
import MyModal from '../components/MyModal'
import Moment from 'moment'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import { loginGraphql, getHistoryForms, getSearchList } from '../Apollo/Api/fal'
import { IMAGE_URL } from '../redux/actions/host';
import { FAL_STATUS_STAFF } from '../types'
import CustomTextInput from '../components/TextInput'

Date.prototype.getWeek = () => {
    newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
    newDate.setUTCDate(newDate.getUTCDate() + 4 - (newDate.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(newDate.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((newDate - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

export class History extends Component {

    state = {
        startDate: '',
        endDate: '',
        allPrice: 0,
        forms: [],
        filterBar: false,
        search: '',
        searchList:[]
    }
    async componentDidMount() {
        const { auth, csrf } = this.props
        await loginGraphql(auth.token, csrf)
        const dates = this.getWeekInformation()
        console.log('history', 'result.data')
        this.setState({ startDate: dates.startDate, endDate: dates.endDate }, () => {
            this.getReports()
        })

    }

    async getReports() {
        const { startDate, endDate } = this.state

        const strStartDate = Moment(startDate).format('yyyy-MM-DD')
        const strEndDate = Moment(endDate).format('yyyy-MM-DD')

        const result = await getHistoryForms(strStartDate, strEndDate)
        this.setState({ forms: result.forms })

    }

    async search(){
        const {search}=this.state

        const result = await getSearchList(search)
        this.setState({ searchList: result.formSearch })

    }

    getWeekInformation = () => {
        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        var last = first + 7; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first)).toUTCString();
        var lastday = new Date(curr.setDate(last)).toUTCString();

        return { startDate: firstday, endDate: lastday }

    }


    onDateChange = (date, type) => {

        if (type === 'END_DATE') {
            this.setState({
                endDate: date,
            }, () => this.getReports())
        } else {
            this.setState({
                startDate: date,
            })
        }
    }

    itemRender = (item) => {
        const { navigation, user } = this.props
        const { account } = user.id === item.account.id ? (item.to !== null ? item.to : null) : item

        let image = icons.User
        let name = account !== null ? account.firstName + ' ' + account.lastName[0] + '.' : 'Atama Bekliyor...'

        if (account !== null && account.image !== null)
            image = { uri: IMAGE_URL + account.image }

        return (
            <TouchableOpacity style={[styles.item, item.pool ? { backgroundColor: '#40a6ff' } : {}]} onPress={() => navigation.navigate('PreviewFal', { id: item.id })}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 25, padding: 10 }}>
                    <Image source={image} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 0.5, borderColor: '#e1e1e1', marginRight: 10 }} />
                    <View style={{ marginRight: 10, overflow: 'hidden', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '600', fontSize: 15, marginBottom: 10, marginRight: 10 }}>{name}</Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>#{item.id}</Text>
                        </View>
                        <Text style={{ fontStyle: 'italic' }} numberOfLines={2} ellipsizeMode='tail'>{item.info}</Text>
                    </View>
                    {
                        !item.pool ?
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

        const { navigation } = this.props
        const { startDate, endDate, forms, filterBar, search,searchList } = this.state

        return (
            <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                <MyModal ref={node => (this._datePicker = node)} fullWidth={true}>
                    <CalendarPicker
                        weekdays={['PAZ', 'PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT']}
                        months={['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']}
                        previousTitle="Önceki"
                        nextTitle="İleri"
                        todayBackgroundColor="rgba(242,203,5,0.2)"
                        selectedDayColor="#ecd447"
                        allowRangeSelection={true}
                        startFromMonday={true}
                        onDateChange={this.onDateChange}
                    />
                </MyModal>
                <View style={styles.header}>

                    <TouchableOpacity style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                        <Image source={icons.Back} style={{ width: 42, height: 42, tintColor: 'white' }} />
                    </TouchableOpacity>

                    <View style={styles.headerTextContainer}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Geçmiş Yorumlar</Text>
                    </View>

                    <View style={{height:'100%',alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity style={{ backgroundColor: filterBar ? '#8c25b7' : '#9b59b6', width: 50, marginRight: 10, borderRadius: 15, height: 50, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => this.setState({ filterBar: !filterBar })}>
                            <Image source={icons.Search} style={{ width: 42, height: 42, tintColor: 'white' }} />
                        </TouchableOpacity>
                    </View>

                </View>

                {
                    filterBar ?
                        <View style={{ marginVertical: 20, paddingHorizontal: 10, }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                <CustomTextInput color={"#e6e5f3"}
                                    settings={{
                                        value: search,
                                        placeholder: 'Yorum Ara', onChangeText: (text) => {
                                            this.setState({ search: text },()=>{
                                                this.search()
                                            })
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected}
                                    left={
                                        <Image source={icons.Search} style={{ width: 25, height: 25, marginRight: 10 }} />
                                    } />
                            </View>

                        </View> : null
                }

                <ScrollView style={{ flex: 1 }}>


                    <View style={styles.dateTimeContainer}>


                        <View style={styles.dateTimeBoxContainer}>
                            <TouchableOpacity style={styles.dateTimeBox} onPress={() => this._datePicker.onShow()}>

                                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>{Moment(startDate).format('DD')}</Text>
                                </View>
                                <View style={{ width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>{Moment(startDate).format('MM / yyyy')}</Text>
                                </View>
                                <View style={{ width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>Başlangıç Tarihi</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dateTimeBox} onPress={() => this._datePicker.onShow()}>

                                <View style={{ width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>{Moment(endDate).format('DD')}</Text>
                                </View>
                                <View style={{ width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>{Moment(endDate).format('MM / yyyy')}</Text>
                                </View>
                                <View style={{ width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10, color: 'white' }}>Bitiş Tarihi</Text>
                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={styles.contentContainer}>
                        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: '700', marginBottom: 20 }}>Yorumlarım</Text>


                        {
                            search.length>0?
                            searchList.map((item) => {
                                return this.itemRender(item)
                            }):
                            forms.map((item) => {
                                return this.itemRender(item)
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
    user: state.User.user,
    csrf: state.User.csrf,
    auth: state.User.auth,


})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(History)
