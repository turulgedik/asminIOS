import React, { Component } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity, Linking, Modal, ScrollView } from 'react-native'
import icons from '../icons'
import { styles } from './styles'
import MyModal from '../components/MyModal'
import ImageViewer from 'react-native-image-zoom-viewer';
import CustomTextInput from '../components/TextInput'
import moment from 'moment'
import CalendarPicker from 'react-native-calendar-picker';
import Alert from '../components/Alert'
import axios from 'axios'
import { MAIN_URL } from '../redux/actions/host'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Fake extends Component {

    state = {
        showImage: false,
        rezervasyon: false,
        images: [],
        name: '',
        phone: '',
        mail: '',
        date: moment(new Date()),
        about: false,
        rezer_ids: [],
        my_rezers: [],
        history:false
    }

    componentDidMount() {
        this.getIDS()
        const copy = [{
            url: '',
            props: {
                source: icons.IMAGE1
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE2
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE3
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE4
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE5
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE6
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE7
            }
        },
        {
            url: '',
            props: {
                source: icons.IMAGE8
            }
        }
        ]
        this.setState({ images: copy })
    }

    onDateChange = (date, type) => {

        this.setState({
            date: moment(date),
        })
    }

    createRezervasyon = () => {
        const { name, phone, date, mail, rezer_ids, my_rezers } = this.state

        let copy = [...rezer_ids]

        axios.post(MAIN_URL + '/fal/rezervasyon', {
            name,
            phone,
            email: mail,
            date: date.format('YYYY-MM-DD')
        })
            .then((res) => {
                copy.push(res.data.id)
                this.setState({ rezer_ids: copy, my_rezers: [...my_rezers, res.data] }, () => {
                    this.saveIDS()
                })

            })

    }

    async getIDS() {
        try {
            const rezers = await AsyncStorage.getItem('myRezer');

            if (rezers !== null) {
                const jsonArray = JSON.parse(rezers)
                this.setState({ rezer_ids: jsonArray })
                this.getRez(jsonArray, 0)
            }

        } catch (err) {
            console.log(err);
        }
    }

    async saveIDS() {
        const { rezer_ids } = this.state
        try {
            await AsyncStorage.setItem('myRezer', JSON.stringify(rezer_ids));
            
            this._alert.setConfirmText('Tamam')
            this._alert.setTitle('Onay')
            this._alert.setMessage('Randevu talebiniz g??nderildi! K??sa s??re i??erisinde sizlere d??n???? sa??lanacakt??r.')
            this._alert.show()
        } catch (err) {
            console.log(err);
        }
    }


    getRez = (array, index) => {

        const item = array[index]

        if (index >= array.length)
            return

        axios.post(MAIN_URL + '/fal/getRezervasyon', {
            id: item,
        })
            .then((res) => {
                this.setState({ my_rezers: [...this.state.my_rezers, res.data] }, () => {
                    this.getRez(array, index + 1)
                })

            })

    }

    itemRender = (item) => {
        return (
            <View style={styles.item}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: 25, padding: 10 }}>
                    <Image source={icons.User} style={{ width: 75, height: 75, borderRadius: 37.5, borderWidth: 0.5, borderColor: '#e1e1e1', marginRight: 10 }} />
                    <View style={{ marginRight: 10, overflow: 'hidden', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontWeight: '600', fontSize: 15, marginBottom: 10, marginRight: 10 }}>{item.name}</Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 12 }}>#{item.id}</Text>
                        </View>
                        <Text style={{ fontStyle: 'italic' }} numberOfLines={2} ellipsizeMode='tail'>{item.desc}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>{item.status? 'Cevapland??' : 'Bekleniyor...'} </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ color: 'white' }}>{moment(new Date(item.date)).format('DD.MM.YYYY')}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const { showImage, images, rezervasyon, name, phone, mail, date, about, history, my_rezers } = this.state
        console.log(my_rezers);
        return (
            <ImageBackground style={styles.background} source={icons.FakeBackground}>

                <Modal visible={showImage} transparent={true}>
                    <ImageViewer enableSwipeDown={true} imageUrls={images} onSwipeDown={() => {
                        this.setState({ showImage: false })
                    }} />
                </Modal>
                <Modal visible={about} animationType='slide' transparent={true}>
                    <View style={styles.modalContent}>
                        <View style={{ width: '100%', height: 60, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => this.setState({ about: false })}>
                                <Image source={icons.Back} style={{ width: 32, height: 32 }} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>Hakk??m??zda</Text>
                        </View>

                        <ScrollView style={{ flex: 1, width: '100%', padding: 10 }}>
                            <Text style={{ marginBottom: 10 }}>Asmin Kahve Fal?? & Tarot mobil uygulamas??yla hizmet sekt??r??nde farkl??l??k yaratan Gemsizler Kafe Beyo??lu???daki varl?????? 2006 y??l??nda ba??lad??. Ya??amda insanlar?? bulu??turma, biraraya getirmede mekanlar??nda g??sterdi??i ??zen ve sayg?? kriteriyle devaml??l??????n?? s??rd??r??yor. 1999 y??l??ndan bu yana hizmet ve mekan se??icili??inde aran??r oldu.</Text>
                            <Text style={{ marginBottom: 10 }}>K??lt??rlerin kadim bulu??ma ve kesi??me mekan?? olan Beyo??lu???nda merkez ve ??ube olarak 2 yerde zengin yiyecek ve i??ecek ??e??itleriyle,  ??ay, kahve ve fal bakma hizmetleriyle insanlar??n u??rak yeri olmaya devam ediyoruz. Bulu??ma noktas?? olarak e??siz sohbetin, bilgi payla????m??n??n, ufkunu geli??tirmenin ve ??zenli hizmetin adresiyiz.</Text>
                            <Text style={{ marginBottom: 10 }}>??stanbul???un k??lt??r ve sinema birikimini yans??tan alanlarda bulunan Gemsizler Kafe Turizm ve ??n??aat Limited ??irketi???miz teknolojideki geli??meleri de dikkate alarak ASM??NFAL olarak 2020 y??l??nda hizmet vermeye ba??lad??k. ASM??NFAL bir marka tercihimiz.</Text>
                            <Text style={{ marginBottom: 10 }}>Sosyal medyada Instagram, Facebook, Youtube gibi alanlarda da varl??????m??z?? g??r??n??r ve aran??r k??laca????z.Di??er sosyal medya ileti??im bi??imlerini ve dijital geli??meleri yak??n takiple hizmete ekleyece??iz.Yenilik??i yakla????m??yla ASM??NFAL sizlerle birlikte olmaya devam edecektir.</Text>

                        </ScrollView>
                    </View>
                </Modal>
                <Modal visible={rezervasyon} animationType='slide' transparent={true}>
                    <Alert ref={node => (this._alert = node)} />
                    <MyModal ref={node => (this._datePicker = node)} fullWidth={true}>
                        <CalendarPicker
                            weekdays={['PAZ', 'PZT', 'SAL', '??AR', 'PER', 'CUM', 'CMT']}
                            months={['Ocak', '??ubat', 'Mart', 'Nisan', 'May??s', 'Haziran', 'Temmuz', 'A??ustos', 'Eyl??l', 'Ekim', 'Kas??m', 'Aral??k']}
                            previousTitle="??nceki"
                            nextTitle="??leri"
                            todayBackgroundColor="rgba(242,203,5,0.2)"
                            selectedDayColor="#ecd447"
                            allowRangeSelection={false}
                            startFromMonday={true}
                            onDateChange={this.onDateChange}
                        />
                    </MyModal>
                    <View style={styles.modalBack}>
                        <View style={styles.modalContent}>
                            <View style={{ width: '100%', height: 60, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
                                <TouchableOpacity onPress={() => this.setState({ rezervasyon: false })}>
                                    <Image source={icons.Back} style={{ width: 32, height: 32 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>Rezervasyon Olu??tur</Text>
                            </View>

                            <View style={{ paddingHorizontal: 10 }}>
                                <Text style={{ fontWeight: '500', fontSize: 18, marginBottom: 10 }}>Ad & Soyad</Text>
                                <CustomTextInput color={"#e6e5f3"} left={
                                    <Image source={icons.User2} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                }
                                    settings={{
                                        value: name,
                                        placeholder: ' Ad & Soyad', onChangeText: (text) => {
                                            this.setState({ name: text })
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />

                                <Text style={{ fontWeight: '500', fontSize: 18, marginVertical: 10 }}>Mail Adresi</Text>
                                <CustomTextInput color={"#e6e5f3"} left={
                                    <Image source={icons.Mail} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                }
                                    settings={{
                                        value: mail,
                                        placeholder: 'Mail Adresi', onChangeText: (text) => {
                                            this.setState({ mail: text })
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />

                                <Text style={{ fontWeight: '500', fontSize: 18, marginVertical: 10 }}>Telefon Numaras??</Text>
                                <CustomTextInput color={"#e6e5f3"} left={
                                    <Image source={icons.Phone} style={{ width: 32, height: 32, tintColor: 'black', marginRight: 5 }} />
                                }
                                    settings={{
                                        value: phone,
                                        placeholder: 'Telefon Numaras??', onChangeText: (text) => {
                                            this.setState({ phone: text })
                                        }
                                    }} style={styles.textInput} selectedStyle={styles.textInputSelected} />

                                <Text style={{ fontWeight: '500', fontSize: 18, marginVertical: 10 }}>Tarih</Text>

                                <TouchableOpacity style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} onPress={() => {
                                    this._datePicker.onShow()
                                }}>
                                    <View style={{ padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 75, marginRight: 20 }}>
                                        <Text>{date.format('DD')}</Text>
                                    </View>
                                    <View style={{ padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 75, marginRight: 20 }}>
                                        <Text>{date.format('MM')}</Text>
                                    </View>
                                    <View style={{ padding: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, alignItems: 'center', justifyContent: 'center', width: 75, }}>
                                        <Text>{date.format('YYYY')}</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ marginTop: 25, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.createRezervasyon()

                                    }}
                                        style={{ width: '80%', height: 50, borderWidth: 2, borderColor: '#27ae60', borderRadius: 25, backgroundColor: '#2ecc71', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: 'white' }}>G??nder</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    </View>
                </Modal>
                <Modal visible={history} animationType='slide' transparent={true}>
                    <View style={styles.modalBack}>
                        <View style={styles.modalContent}>
                            <View style={{ width: '100%', height: 60, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
                                <TouchableOpacity onPress={() => this.setState({ history: false })}>
                                    <Image source={icons.Back} style={{ width: 32, height: 32 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: '700', marginLeft: 20 }}>Rezervasyonlar??m</Text>
                            </View>

                            <ScrollView style={{flex:1,padding:10}}>
                                {
                                    my_rezers.map((item)=>{
                                        return this.itemRender(item)
                                    })
                                }
                            </ScrollView>

                        </View>
                    </View>
                </Modal>
                <MyModal ref={node => (this._helpModal = node)}>
                    <View style={styles.modalContentView}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Rezervasyon</Text>
                        <TouchableOpacity style={styles.helpButton} onPress={() => {
                            Linking.openURL('whatsapp://send?text=&phone=+905413083421')

                        }}>
                            <Image source={icons.Whatsapp} style={{ width: 32, height: 32, marginRight: 10 }} resizeMode='contain' />
                            <Text style={{ flex: 1 }}>Whatsappp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.helpButton} onPress={() => {
                            Linking.openURL('tel:05413083421')
                        }}>
                            <Image source={icons.Phone} style={{ width: 32, height: 32, marginRight: 10, tintColor: 'black' }} resizeMode='contain' />
                            <Text style={{ flex: 1 }}>Telefon</Text>
                        </TouchableOpacity>
                        <View style={styles.modalContentView}>
                            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Adres</Text>
                            <Text>ASM??N CAFE, ??stiklal caddesi Ayhan I????k Sokak No:15 ??stiklal caddesi, Ayhan I????k Sk. No:15, 34421</Text>
                        </View>
                    </View>
                </MyModal>
                <MyModal ref={node => (this._adressModal = node)}>
                    <View style={styles.modalContentView}>
                        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 5 }}>Ula????m</Text>
                        <Text>ASM??N CAFE, ??stiklal caddesi Ayhan I????k Sokak No:15 ??stiklal caddesi, Ayhan I????k Sk. No:15, 34421</Text>
                    </View>
                </MyModal>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 150, height: 150, backgroundColor: 'white', borderRadius: 75, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={icons.LogoFulllGif} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{ padding: 20, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.5)', marginTop: 20 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700', textAlign: 'center', color: 'white' }}>Fal Asmin</Text>
                    </View>
                </View>


                <View style={{ flex: 0.9, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ about: true })
                        }}
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 60, width: '80%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={icons.About} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' }}>Hakk??m??zda</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ showImage: true })
                        }}
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 60, width: '80%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={icons.Galery} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' }}>Galeri</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({ name: '', phone: '', mail: '', rezervasyon: true })
                        }}
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 60, width: '55%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={icons.Help} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' }}>Rezervasyon</Text>
                        </TouchableOpacity>
                        <View style={{ width: '25%', height: 60, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                this.setState({ history: true })
                            }}
                                style={{ backgroundColor: 'white', borderRadius: 15, height: 60, width: '80%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Image source={icons.History} style={{ width: 40, height: 40, marginHorizontal: 10 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            this._helpModal.onShow()
                        }}
                            style={{ backgroundColor: 'white', borderRadius: 15, height: 60, width: '80%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                            <Image source={icons.Maps} style={{ width: 50, height: 50, marginHorizontal: 10 }} />
                            <Text style={{ fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' }}>Ula????m</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ImageBackground>
        )
    }
}
