import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import { IMAGE_URL } from '../redux/actions/host'
import { styles } from './styles'
import ImageViewer from 'react-native-image-zoom-viewer';
import icons from '../icons'

export default class Cards extends Component {

    state = {
        images: [],
        showImage: false
    }

    render() {
        const { cards, enable, backImage } = this.props
        const { images, showImage } = this.state
        return (
            <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
                <Modal visible={showImage} transparent={true}>
                <ImageViewer enableSwipeDown={true} imageUrls={images} onSwipeDown={()=>{
                            this.setState({showImage:false})
                        }}/>
                </Modal>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: '700' }}>Seçilen Kartlar</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {
                        cards.map((x, i) => {

                            return (
                                <TouchableOpacity style={styles.tarotCard} onPress={() => {
                                    if (!enable)
                                        return
                                    let copy = []
                                    copy.push({ url: IMAGE_URL + x.image })
                                    this.setState({ images: copy, showImage: true })
                                }} key={i}>
                                    <Image source={enable ? { uri: IMAGE_URL + x.image } : backImage} style={{ width: '100%', height: 120, borderRadius: 15 }} />
                                    {
                                        enable ?
                                            <Text style={{ textAlign: 'center', marginTop: 10 }}>{x.name}</Text> : null
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

