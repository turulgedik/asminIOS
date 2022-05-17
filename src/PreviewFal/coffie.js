import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import { styles } from './styles'
import { IMAGE_URL } from '../redux/actions/host'
import ImageViewer from 'react-native-image-zoom-viewer';

export default class Coffie extends Component {
    state = {
        images: [],
        showImage: false
    }
    render() {
        const { item } = this.props
        const { images, showImage } = this.state
        return (
            <View style={{ paddingHorizontal: 10, paddingBottom: 20 }}>
                <Modal visible={showImage} transparent={true}>
                    <ImageViewer enableSwipeDown={true} imageUrls={images} onSwipeDown={() => {
                        this.setState({ showImage: false })
                    }} />
                </Modal>
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20 }}>Fincan Fotoğrafları</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {
                        item.image1 ?
                            <TouchableOpacity style={styles.photoItem} onPress={() => {
                                let copy = []
                                copy.push({ url: IMAGE_URL + item.image1 })
                                this.setState({ images: copy, showImage: true })
                            }}>
                                <Image source={{ uri: IMAGE_URL + item.image1 }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity> : null
                    }
                    {
                        item.image2 ?
                            <TouchableOpacity style={styles.photoItem} onPress={() => {
                                let copy = []
                                copy.push({ url: IMAGE_URL + item.image2 })
                                this.setState({ images: copy, showImage: true })
                             }}>
                                <Image source={{ uri: IMAGE_URL + item.image2 }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity> : null
                    }
                    {
                        item.image3 ?
                            <TouchableOpacity style={styles.photoItem} onPress={() => { 
                                let copy = []
                                copy.push({ url: IMAGE_URL + item.image3 })
                                this.setState({ images: copy, showImage: true })
                            }}>
                                <Image source={{ uri: IMAGE_URL + item.image3 }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity> : null
                    }
                    {
                        item.image4 ?
                            <TouchableOpacity style={styles.photoItem} onPress={() => {
                                let copy = []
                                copy.push({ url: IMAGE_URL + item.image4 })
                                this.setState({ images: copy, showImage: true })
                             }}>
                                <Image source={{ uri: IMAGE_URL + item.image4 }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity> : null
                    }
                    {
                        item.image5 ?
                            <TouchableOpacity style={styles.photoItem} onPress={() => {
                                let copy = []
                                copy.push({ url: IMAGE_URL + item.image5 })
                                this.setState({ images: copy, showImage: true })
                             }}>
                                <Image source={{ uri: IMAGE_URL + item.image5 }} style={{ width: '100%', height: '100%' }} />
                            </TouchableOpacity> : null
                    }

                </View>
            </View>
        )
    }
}

