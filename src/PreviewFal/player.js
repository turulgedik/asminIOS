import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import icons from '../icons'
import { styles } from './styles'
import { Audio } from 'expo-av';
import { falAction } from '../redux/actions/fal'
import { RECORD_PERMISSION, RECORD_PLAY, RECORD_RESET, RECORD_SET } from '../redux/actions/types'

export class Player extends Component {

    state = {
        loading: false,
        loaded: false,
        play: false,
        progress: 0,
        sound: null,
        totalDurationMilis: 0,
        totalDuration: '--:--',
        currentDurationMilis: 0,
        currentDuration: '--:--',
        stopRec: false,
        saveState: false
    }

    componentWillUnmount() {
        const { sound, record } = this.state
        const { falAction } = this.props
        if (sound)
            sound.unloadAsync()

        this.stopRec()
        falAction(RECORD_RESET, '')
    }

    componentDidMount() {
        const { record, falAction } = this.props

        if (record) {
            console.log(record.getURI())
            this.loadPlayer(record.getURI())
        }
    }

    getCurrentDuraMili = () => {
        return this.state.currentDurationMilis
    }

    async loadPlayer(link) {
        console.log('link',link)
        //alert('Loading Sound');
        this.setState({ loading: true })
        try {
            const { sound, status } = await Audio.Sound.createAsync({ uri: link });
            await sound.setVolumeAsync(1)
            await sound.playAsync();
            this.setState({ loading: false, loaded: true, play: true, sound })
            //sound.setIsLoopingAsync(true)
            sound.setOnPlaybackStatusUpdate((res) => {
                const { currentDurationMilis } = this.state
                const { totalDuration, type, maxDuration } = this.props
                const percent = Math.round((currentDurationMilis / (type === 'audio' ? totalDuration : maxDuration)) * 100)
                this.setState({ currentDurationMilis: res.positionMillis, currentDuration: this.durationConvert(res.positionMillis), progress: percent }, () => {

                })
            })
            console.log('Playing Sound');
            //console.log('sound', sound)
            
        } catch (error) {
            alert(error)
            console.log('error play',error)
        }
    }

    async pausePlayer() {
        const { sound } = this.state
        if (sound) {
            this.setState({ play: false })
            await sound.pauseAsync()
        }
    }

    async startPlayer() {
        const { sound } = this.state
        if (sound) {
            this.setState({ play: true })
            await sound.playAsync()
        }
    }

    durationConvert = (milis) => {
        const minutes = milis / 1000 / 60
        const minutesDisplay = Math.floor(minutes)
        const seconds = Math.round((minutes - minutesDisplay) * 60)
        const secondDisplay = seconds < 10 ? `0${seconds}` : seconds
        return `${minutesDisplay}:${secondDisplay}`
    }

    async recording() {
        console.log('record')
        const { maxDuration, falAction } = this.props

        try {
            const permission = await Audio.requestPermissionsAsync()
            if (permission.status === 'granted') {
                falAction(RECORD_PERMISSION, true)
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const { recording } = await Audio.Recording.createAsync(
                    Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
                );
                recording.setOnRecordingStatusUpdate((res) => {
                    const { currentDurationMilis } = this.state
                    const percent = Math.round((currentDurationMilis / maxDuration) * 100)
                    this.setState({ currentDurationMilis: res.durationMillis, currentDuration: this.durationConvert(res.durationMillis), progress: percent })
                    if (res.durationMillis >= (maxDuration / 10))
                        this.setState({ save: true })
                    if (res.durationMillis >= maxDuration)
                        this.saveSound()
                })
                falAction(RECORD_SET, recording)
                falAction(RECORD_PLAY, true)
            } else
                falAction(RECORD_PERMISSION, false)
        } catch (error) {
            alert(error)
            console.log('err', error)
        }
    }

    async stopRec() {
        const { record, falAction } = this.props
        if (record !== null) {
            falAction(RECORD_PLAY, false)
            await record.stopAndUnloadAsync()
        }
    }

    async pauseRec() {
        const { record, falAction } = this.props
        if (record !== null) {
            falAction(RECORD_PLAY, false)
            await record.pauseAsync()
        }
    }

    async startRec() {
        const { record, falAction } = this.props
        if (record !== null) {
            falAction(RECORD_PLAY, true)
            await record.startAsync()
        }
    }

    async saveSound() {
        const { record } = this.props
        this.setState({ stopRec: true })
        //const {sound}=await record.createNewLoadedSoundAsync()
        this.stopRec()
        this.loadPlayer(record.getURI())
    }

    render() {
        const { loading, loaded, play, progress, currentDuration, sound, save } = this.state
        const { link, type, rec, record, maxDuration, permission, sendButton, totalDuration } = this.props
        return (
            <View>
                {
                    type === 'record' && rec && !save ?
                        <View style={{ height: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#9b59b6' }}>
                            <Text style={{ color: 'white' }}>Kayıt Süresi 5 Dakikadan Az Olamaz!</Text>
                        </View> : null
                }
                <View style={{ width: '100%', marginBottom: 10, height: 100, backgroundColor: '#f0e178', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.progress, { width: progress + '%', backgroundColor: type === 'record' && save && !sound ? '#2ecc71' : '#9b59b6' }]} />
                    <TouchableOpacity style={styles.playButton} onPress={() => {
                        if (type === 'audio' || sound) {
                            if (!loaded)
                                this.loadPlayer(link)
                            else if (play)
                                this.pausePlayer()
                            else
                                this.startPlayer()
                        } else {
                            if (!record)
                                this.recording()
                            else if (rec)
                                this.pauseRec()
                            else
                                this.startRec()
                        }
                    }}>
                        <Image source={type === 'audio' || sound ? (play ? icons.Pause : icons.Play) : (rec ? icons.Pause : icons.Play)} style={{ width: 45, height: 45 }} />
                    </TouchableOpacity>
                    {
                        !permission ?
                            <Text style={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: '700', marginRight: 10 }}>Mikrofon Erişimine İzin Vermeniz Gerekmektedir!</Text> : null
                    }
                    {
                        record && !sound ?
                            <TouchableOpacity style={[styles.playButton, { width: 50, height: 50, borderRadius: 25 }]} onPress={() => this.saveSound()}>
                                <Image source={icons.Stop} style={{ width: 32, height: 32 }} />
                            </TouchableOpacity> : null
                    }
                    <Text style={{ flex: !permission ? 0.5 : 1, color: 'white', textAlign: 'right', fontWeight: '700', marginRight: 10 }}>{currentDuration} / {type === 'audio' ? this.durationConvert(totalDuration) : this.durationConvert(maxDuration)}</Text>
                </View>
                {
                    type === 'record' ?
                        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <TouchableOpacity style={styles.sendButtom} onPress={() => {
                                if (sendButton)
                                    sendButton()
                            }} disabled={!save}>
                                <Text style={{ color: '#f0e178' }}>Gönder</Text>
                            </TouchableOpacity>
                        </View> : null
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    record: state.Record.recording,
    maxDuration: state.Record.maxDuration,
    permission: state.Record.permission,
    rec: state.Record.play,
})

const mapDispatchToProps = {
    falAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
