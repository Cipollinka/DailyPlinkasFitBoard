import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ShareSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M18 15.223c-.891 0-1.693.375-2.262.973L9.086 12.94c.023-.153.039-.308.039-.468 0-.155-.015-.306-.037-.455l6.642-3.221c.57.603 1.375.982 2.27.982a3.125 3.125 0 1 0-3.125-3.125c0 .155.015.307.037.456l-6.642 3.22A3.113 3.113 0 0 0 6 9.349a3.125 3.125 0 1 0 0 6.25c.891 0 1.693-.376 2.262-.974l6.652 3.256a3.138 3.138 0 0 0-.039.468A3.125 3.125 0 1 0 18 15.223Z"
        />
    </Svg>
);
export default ShareSVG;
