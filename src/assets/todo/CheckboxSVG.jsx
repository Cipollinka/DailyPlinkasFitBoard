import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const CheckboxSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M20 2H5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V5c0-1.657-1.345-3-3-3Zm.75 18a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75V5A.75.75 0 0 1 5 4.25h15a.75.75 0 0 1 .75.75v15Z"
        />
    </Svg>
);
export default CheckboxSVG;
