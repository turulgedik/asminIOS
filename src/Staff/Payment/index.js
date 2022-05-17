import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import icons from '../../icons'
import { connect } from 'react-redux'
import { getPaymentBonus, getPaymentReport } from '../../redux/actions/fal'
import MyModal from '../../components/MyModal'

export class Payment extends Component {

    state = {
        report: null,
        bonus: [],
        select_month: new Date().getMonth(),
        months: [
            'Ocak',
            'Şubat',
            'Mart',
            'Nisan',
            'Mayıs',
            'Haziran',
            'Temmuz',
            'Ağustos',
            'Eylül',
            'Ekim',
            'Kasım',
            'Aralık'
        ]
    }

    componentDidMount() {
        const { getPaymentReport, getPaymentBonus } = this.props

        getPaymentBonus((res) => {
            console.log('bonus', res)
            this.setState({ bonus: res })
        })

        this.getReport()

    }

    componentDidUpdate(prevProp,prevState){
        if(prevState.select_month!==this.state.select_month)
            this.getReport()
    }

    getReport=()=>{
        const { getPaymentReport, getPaymentBonus } = this.props
        getPaymentReport({ month: this.state.select_month+1 }, (res) => {
            console.log('payments', res)
            this.setState({ report: res })
        })
    }

    convertCom = (jeton) => {
        const { staff } = this.props

        return jeton / 100 * staff.commission

    }

    render() {

        const { report, bonus, months,select_month } = this.state
        const { staff } = this.props
        console.log('staf', select_month)

        return (
            report === null ? <View /> :
                <View style={styles.background}>
                    <MyModal ref={node => (this._modal = node)}>
                        <View style={styles.modalContentView}>
                            <ScrollView>
                                {
                                    months.map((item, i) => {
                                        return (
                                            <TouchableOpacity style={i === select_month ? styles.selectedItem : styles.item} onPress={() => {
                                                this.setState({ select_month: i })
                                            }}>
                                                <Text style={{ color: i === select_month ? 'white' : 'black' }}>{item}</Text>
                                            </TouchableOpacity>
                                        )
                                    })

                                }
                            </ScrollView>
                        </View>
                    </MyModal>
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        <View style={styles.header}>

                            <TouchableOpacity style={{ width: 50, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                                <Image source={icons.Back} style={{ width: 42, height: 42, tintColor: 'white' }} />
                            </TouchableOpacity>

                            <View style={styles.headerTextContainer}>
                                <Text style={{ fontSize: 20, color: 'white', fontWeight: '700' }}>Muhasebe</Text>
                            </View>

                            <View style={{ width: 50, height: '100%' }}>

                            </View>

                        </View>
                        <View style={styles.ovalBack}>

                            <View style={styles.boxContainer}>
                                <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>{
                                    this.convertCom(report.star_total + report.dream_total + report.water_total + report.iskambil_total + report.katina_total + report.tarot_total +
                                        report.coffie_total) + report.bonus
                                } TL</Text>
                            </View>

                            <TouchableOpacity style={styles.monthView} onPress={()=>{
                                this._modal.onShow()
                            }}>
                                <Text style={{ color: 'white' }}>{months[select_month]}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.contentContainer}>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', borderRightColor: '#9b59b6', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Tür</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', borderRightColor: '#9b59b6', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Adet</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', borderRightColor: '#9b59b6', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>B. Fiyatı</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Toplam</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Kahve</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.coffie_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.coffieCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.coffie_total)} TL</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Tarot</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.tarot_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.tarotCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.tarot_total)} TL</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Katina</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.katina_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.katinaCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.katina_total)} TL</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>İskambil</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.iskambil_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.iskambilCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.iskambil_total)} TL</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Su</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.water_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.waterCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.water_total)} TL</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Rüya</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.dream_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.dreamCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.dream_total)} TL</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>Yıldız</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{report.star_count}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{staff.starCoin}</Text>
                                    <Image source={icons.Coin} style={{ marginLeft: 5, width: 25, height: 25 }} />
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{this.convertCom(report.star_total)} TL</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 50, borderBottomColor: '#9b59b6', borderBottomWidth: 1 }}>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Toplam</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{report.total}</Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text></Text>
                                </View>
                                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 15, fontWeight: '500' }}>{
                                        this.convertCom(report.star_total + report.dream_total + report.water_total + report.iskambil_total + report.katina_total + report.tarot_total +
                                            report.coffie_total)
                                    } TL</Text>
                                </View>
                            </View>

                            <Text style={{ fontSize: 20, fontWeight: '700', marginVertical: 20, marginHorizontal: 10 }}>Bonus</Text>

                            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>

                                {
                                    bonus.map((item, i) => {
                                        return (
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <Text>{item.bonus} TL</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ height: 10, borderRadius: 5, backgroundColor: report.bonus >= item.bonus ? '#9b59b6' : '#e1e1e1', flex: 1, marginRight: 5 }} />
                                                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: report.bonus >= item.bonus ? '#9b59b6' : '#e1e1e1', alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                                                        <Text style={{ color: 'white' }}>{item.min}</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        )
                                    })
                                }


                            </View>

                            <Text style={{ textAlign: 'right', marginVertical: 20, fontSize: 20, fontWeight: '700', marginRight: 10 }}>Toplam : {report.bonus} TL</Text>

                        </View>

                    </ScrollView>
                    <StatusBar hidden={true} />
                </View>
        )
    }
}


const mapStateToProps = (state) => ({
    staff: state.Staff.staff,

})

const mapDispatchToProps = {
    getPaymentReport,
    getPaymentBonus
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
