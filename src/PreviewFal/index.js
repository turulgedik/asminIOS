import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { getForm, loginGraphql } from '../Apollo/Api/fal'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'
import Svg, { Ellipse } from 'react-native-svg'
import icons from '../icons'
import { FAL_STATUS, Gender, Love_Type } from '../types'
import { connect } from 'react-redux'
import Moment from 'moment'
import Coffie from './coffie'
import Cards from './cards'
import Water from './water'
import Player from './player'
import { IMAGE_URL,MEDIA_URL } from '../redux/actions/host'
import CustomTextInput from '../components/TextInput'
import { createComment, createRate, createMessage, falAction } from '../redux/actions/fal'
import Toast from 'react-native-toast-message'
import { RECORD_PLAY } from '../redux/actions/types'
import Alert from '../components/Alert'

const { width, height } = Dimensions.get('window')

export class PreviewFal extends Component {

    state = {
        item: null,
        messageText: '',
        commentText: ''
    }
    async componentDidUpdate(prevProp, prevState) {
        const { user, auth, csrf } = this.props
        if (user !== prevProp.user) {
            await loginGraphql(auth.token,csrf)
            const result = await getForm(params.id)
            this.setState({ item: result.form })
        }
    }

    async componentDidMount() {
        const { user, auth, route, csrf } = this.props
        const { params } = route
        if (!params)
            return
        if (user) {
            await loginGraphql(auth.token,csrf)
            const result = await getForm(params.id)
            this.setState({ item: result.form })
        }

    }

    calculateAge = (date) => {
        const year = new Date(date).getFullYear()
        const age = new Date().getFullYear() - year
        return age
    }

    createComment = () => {
        const { createComment } = this.props
        const { item, commentText } = this.state

        let copyItem = [...item.comments]

        const data = {
            form: item.id,
            comment: commentText
        }

        createComment(data, (json) => {
            if (json.ok) {

                const copyData = {
                    id: json.id,
                    comment: commentText,
                    account: item.account,
                    createDate: json.createDate
                }

                copyItem.push(copyData)
                this.setState({ item: { ...item, comments: copyItem }, commentText: '' })

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: json.message,
                    visibilityTime: 7000
                })
            }
        })
    }

    createRate = (rate) => {
        const { createRate, user } = this.props
        const { item } = this.state

        if (item.rate > 0)
            return

        if (item.to.account.id === user.id)
            return

        createRate({ form: item.id, rate }, (json) => {
            if (json.ok)
                this.setState({ item: { ...item, rate } })
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: json.message,
                    visibilityTime: 7000
                })
            }

        })

    }

    async createMessage() {
        const { createMessage, record, navigation } = this.props
        const { item, messageText } = this.state

        if (item.answerType === 'write' && messageText.length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Hata!',
                text2: 'Mesaj Alanı Boş Bırakılamaz!',
                visibilityTime: 7000
            })

            return
        }
        if (item.answerType === 'mic' && !record) {
            Toast.show({
                type: 'error',
                text1: 'Hata!',
                text2: 'Lütfen Ses Kaydı Oluşturun!',
                visibilityTime: 7000
            })

            return
        }

        const data = new FormData()
        data.append('form', item.id)
        data.append('text', messageText)

        if (item.answerType === 'mic') {
            falAction(RECORD_PLAY, false)
            try {
                await record.stopAndUnloadAsync()
            } catch (error) {
                
            }
            data.append('duration',record._finalDurationMillis)
            data.append('file', { uri: record.getURI(), name: item.id + '.m4a', type: 'audio/x-m4a' })
        } else {
            data.append('duration',0)
            data.append('file', null)
        }

        createMessage(data, (json) => {
            if (!json.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Hata!',
                    text2: json.message,
                    visibilityTime: 7000
                })
            } else {
                this._myAlert.setTitle('Onaulandı!')
                this._myAlert.setMessage('Mesajınız Gönderildi!')
                this._myAlert.setConfirmText('Tamam')
                this._myAlert.confirmHandler(() => {
                    navigation.navigate('StaffHome')
                })
                this._myAlert.show()
            }
        })

    }

    messageBoxRender = () => {
        const { messageText } = this.state
        const { user } = this.props
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <View style={{ width: '90%' }}>
                    <Text style={{ marginBottom: 5 }}>Cevabınızı Yazın</Text>
                    <CustomTextInput color={"#e6e5f3"}
                        settings={{
                            value: messageText,
                            placeholder: '', onChangeText: (text) => {
                                this.setState({ messageText: text })
                            },
                            multiline: true,
                            maxLength: user.user_type === 2 ? 500 : 1000
                        }} style={[styles.textInput, { height: 150 }]} selectedStyle={[styles.textInputSelected, { height: 150 }]} />
                    <Text style={{ marginTop: 5, textAlign: 'right', color: '#c1c1c1' }}>{messageText.length} / {user.user_type === 2 ? 500 : 1000}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <TouchableOpacity style={styles.sendButtom} onPress={()=>this.createMessage()}>
                        <Text style={{ color: '#f0e178' }}>Gönder</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    messageBoxControl = () => {
        const { item, messageText } = this.state
        const { user } = this.props

        if (item.messages.length === 0) {
            if (item.answerType === 'write' && user.user_type !== 2) {
                return this.messageBoxRender()
            }
            else if (item.answerType === 'mic' && user.user_type !== 2) {
                return (
                    <View>
                        <Text style={{ marginLeft: 20, marginBottom: 5 }}>Sesli Cevap</Text>
                        <Player type='record' sendButton={()=>this.createMessage()} />

                    </View>
                )
            }
        } else {
            if (item.messages.length % 2 === 0 && user.user_type !== 2)
                this.messageBoxRender()
            else if (item.messages.length % 2 === 1 && user.user_type === 2)
                this.messageBoxRender()
        }

    }

    render() {
        const { navigation, route, user } = this.props
        const { item, messageText, commentText } = this.state
        console.log('item', item)
        return (
            item === null ? <View /> :
                <KeyboardAvoidingView
                    behavior={"height"}
                    style={styles.background}
                >
                    <Alert ref={node => (this._myAlert = node)} />
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        <Svg width='100%' height={100}>
                            <Ellipse rx={width} ry={100} fill="#9b59b6" cx={width / 2} cy="0" />
                        </Svg>
                        <View style={styles.header}>
                            <TouchableOpacity style={{ width: 75, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                                <Image source={icons.Back} style={{ width: 32, height: 32, tintColor: 'white' }} resizeMode='contain' />
                            </TouchableOpacity>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Fal</Text>
                            </View>
                            <View style={{ width: 75, flexDirection: 'row', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={icons.Coin} style={{ width: 22, height: 22, tintColor: '#f0e178', marginRight: 5 }} resizeMode='contain' />
                                <Text style={{ color: 'white' }}>{item.coin}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginVertical: 20, marginHorizontal: 10 }}>
                            <Text style={{ fontWeight: '700', fontSize: 20, flex: 1 }}>Kişisel Bilgiler</Text>
                            <Text style={{ fontWeight: '500', fontSize: 15 }}>{Moment(new Date(item.createDate)).format('YYYY-MM-DD hh:mm')}</Text>
                        </View>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>İsim</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.name}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Soyisim</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.surname}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Cinsiyet</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        Gender.find(g => g.id === item.gender).name
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Doğum Tarihi</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.bDay}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Burç</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.horoscope ?
                                            item.horoscope.name : 'Boş'
                                    }
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Yaş</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        this.calculateAge(item.bDay)
                                    }
                                </Text>
                            </View>
                        </View>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partnerin Adı</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.partName}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partnerin Anne Adı</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.partMomName
                                    }
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partnerin Yaşı</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.partBday ?
                                            this.calculateAge(item.partBday) : '--'
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partnerin D. Tarihi</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.partBday ?
                                            item.partBday : 'Boş'
                                    }
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partnerin Burcu</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.partHoroscope ?
                                            item.partHoroscope.name : 'Boş'
                                    }
                                </Text>
                            </View>

                        </View>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Hakkında Açıklama</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.info
                                    }
                                </Text>
                            </View>

                        </View>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Partner Hakkında Açıklama</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.partInfo
                                    }
                                </Text>
                            </View>

                        </View>

                        <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 20, marginHorizontal: 10 }}>Fal Bilgileri</Text>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Fal Türü</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.type.name
                                    }
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Cevap Tipi</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        item.answerType === 'mic' ? 'Sesli' : item.answerType === 'write' ? 'Yazılı' : '--'
                                    }
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Durumu</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                                    {
                                        FAL_STATUS[item.status]
                                    }
                                </Text>
                            </View>


                        </View>
                        <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 20, marginHorizontal: 10 }}>{user.id === item.account.id ? 'Yorumcu' : 'Oluşturan'} Bilgileri</Text>

                        <View style={styles.block}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Kullanıcı Adı</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        user.id === item.account.id ? item.to.account.username : item.account.username
                                    }
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>İsim</Text>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                    {
                                        user.id === item.account.id ? item.to.account.firstName : item.account.firstName
                                    }
                                </Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 13 }}>Soyisim</Text>
                                <Text style={{ fontSize: 15, fontWeight: '700' }}>
                                    {
                                        user.id === item.account.id ? item.to.account.lastName : item.account.lastName
                                    }
                                </Text>
                            </View>

                        </View>

                        {
                            item.type.type === 'coffie' ?
                                <Coffie item={item.coffie[0]} /> :
                                item.type.type === 'tarot' ?
                                    <Cards cards={item.tarot[0].cards} enable={user.id === item.account.id ? false : true} backImage={icons.CartBack} /> :
                                    item.type.type === 'katina' ?
                                        <Cards cards={item.katina[0].cards} enable={user.id === item.account.id ? false : true} backImage={icons.KatinaBack} /> :
                                        item.type.type === 'iskambil' ?
                                            <Cards cards={item.iskambil[0].cards} enable={user.id === item.account.id ? false : true} backImage={icons.IskambilBack} /> :
                                            item.type.type === 'water' ?
                                                <Water item={item.water[0]} /> :
                                                item.type.type === 'star' ?
                                                    <View style={styles.block}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ fontSize: 13 }}>Anne Adı</Text>
                                                            <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                                                {
                                                                    item.star[0].momName
                                                                }
                                                            </Text>
                                                        </View>

                                                        <View style={{ flex: 2 }}>

                                                        </View>


                                                    </View> : null
                        }
                        <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 20, marginHorizontal: 10 }}>Cevaplar</Text>
                        {
                            item.messages.map((message, i) => {
                                return (
                                    <View style={[styles.block, { flexDirection: 'column' }]} key={i}>
                                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{ fontSize: 13 }}>Kim : </Text>
                                            <Text style={{ flex: 1, fontSize: 18, fontWeight: '700' }}>{message.account.firstName + ' ' + message.account.lastName}</Text>
                                            <Text style={{ fontWeight: '500', fontSize: 15 }}>{Moment(new Date(message.createDate)).format('YYYY-MM-DD hh:mm')}</Text>
                                        </View>
                                        <Text style={{ fontSize: 13 }}>{message.text}</Text>
                                        {
                                            message.file ?
                                                <Player link={MEDIA_URL + message.file} type='audio' totalDuration={message.duration} /> : null
                                        }
                                    </View>
                                )
                            })
                        }

                        {
                            this.messageBoxControl()
                        }
                        {
                            item.messages.length > 0 ?
                                <View>
                                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 20, marginHorizontal: 10 }}>Yorumlar</Text>
                                    {
                                        item.comments.map((comment, i) => {
                                            return (
                                                <View style={[styles.block, { flexDirection: 'column' }]} key={i}>
                                                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                        <Text style={{ flex: 1, fontSize: 18, }}>{comment.account.firstName + ' ' + comment.account.lastName}</Text>
                                                        <Text style={{ fontWeight: '500', fontSize: 15 }}>{Moment(new Date(comment.createDate)).format('YYYY-MM-DD hh:mm')}</Text>
                                                    </View>
                                                    <Text style={{ fontSize: 13 }}>{comment.comment}</Text>
                                                </View>
                                            )
                                        })
                                    }

                                    {
                                        item.comments.length === 0 && item.to.account.id !== user.id ?
                                            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                                <View style={{ width: '90%' }}>
                                                    <CustomTextInput color={"#e6e5f3"}
                                                        right={
                                                            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => {
                                                                this.createComment()
                                                            }}>
                                                                <Text>Gönder</Text>
                                                            </TouchableOpacity>
                                                        }
                                                        settings={{
                                                            value: commentText,
                                                            placeholder: 'Yorum Yap', onChangeText: (text) => {
                                                                this.setState({ commentText: text })
                                                            },
                                                            maxLength: 120
                                                        }} style={[styles.textInput]} selectedStyle={[styles.textInputSelected]} />
                                                </View>
                                            </View> : null
                                    }

                                    <Text style={{ fontWeight: '700', fontSize: 20, marginVertical: 20, marginHorizontal: 10 }}>{user.id === item.to.account.id ? 'Oy' : 'Yorumcuyu Oyla'}</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.createRate(1)}>
                                            <Image source={item.rate >= 1 ? icons.Star : icons.Rate} style={{ width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.createRate(2)}>
                                            <Image source={item.rate >= 2 ? icons.Star : icons.Rate} style={{ width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.createRate(3)}>
                                            <Image source={item.rate >= 3 ? icons.Star : icons.Rate} style={{ width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.createRate(4)}>
                                            <Image source={item.rate >= 4 ? icons.Star : icons.Rate} style={{ width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.createRate(5)}>
                                            <Image source={item.rate >= 5 ? icons.Star : icons.Rate} style={{ width: 32, height: 32 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                        }

                    </ScrollView>
                    <StatusBar hidden={true} />
                </KeyboardAvoidingView>
        )
    }
}


const mapStateToProps = (state) => ({
    user: state.User.user,
    record: state.Record.recording,
    auth: state.User.auth,
    csrf: state.User.csrf,

})

const mapDispatchToProps = {
    createComment,
    createRate,
    createMessage,
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewFal)
