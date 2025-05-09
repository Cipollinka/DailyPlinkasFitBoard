import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const TimeSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M12 2.75c-5.385 0-9.75 4.365-9.75 9.75 0 5.384 4.365 9.75 9.75 9.75 5.384 0 9.75-4.366 9.75-9.75 0-5.385-4.366-9.75-9.75-9.75ZM16.5 14H12a.75.75 0 0 1-.75-.75V6.5a.75.75 0 1 1 1.5 0v6h3.75a.75.75 0 1 1 0 1.5Z"
        />
    </Svg>
);
export default TimeSVG;
