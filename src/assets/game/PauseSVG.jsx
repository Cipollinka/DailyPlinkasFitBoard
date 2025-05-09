import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const PauseSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13 13-5.832 13-13S23.168 3 16 3Zm-2 17a1 1 0 0 1-2 0v-8a1 1 0 0 1 2 0v8Zm6 0a1 1 0 0 1-2 0v-8a1 1 0 0 1 2 0v8Z"
        />
    </Svg>
);
export default PauseSVG;
