import { Circle, G, Image } from 'react-native-svg'
import icons from '../../../icons'

const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
            <G
                key={index}
                x={labelCentroid[ 0 ]}
                y={labelCentroid[ 1 ]}
                onPress={()=>{
                    data.onPress()
                }}
            >
                <Circle
                    r={30}
                    fill={'white'}
                />
                <Image
                    x={-20}
                    y={-20}
                    width={40}
                    height={40}
                    preserveAspectRatio="xMidYMid slice"
                    opacity="1"
                    href={data.image}
                />
            </G>
        )
    })
}

export default Labels