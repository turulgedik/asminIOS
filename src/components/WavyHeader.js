import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';


export default function WavyHeader({ customStyles }) {
    return (
      <View style={customStyles}>
        <View style={{ backgroundColor: '#9b59b6', height: 75 }}>
          <Svg
            height={100}
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', top: 70, }}
          >
            <Path
              fill="#9b59b6"
              d="M0,64L40,64C80,64,160,64,240,64C320,64,400,64,480,101.3C560,139,640,213,720,234.7C800,256,880,224,960,176C1040,128,1120,64,1200,85.3C1280,107,1360,213,1400,266.7L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            />
          </Svg>
        </View>
      </View>
    );
  }