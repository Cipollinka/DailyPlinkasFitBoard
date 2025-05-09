import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const InfoSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M0 4a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4Zm17.86 9.176-4.58.574-.164.76.9.166c.588.14.704.352.576.938l-1.476 6.936c-.388 1.794.21 2.638 1.616 2.638 1.09 0 2.356-.504 2.93-1.196l.176-.832c-.4.352-.984.492-1.372.492-.55 0-.75-.386-.608-1.066l2.002-9.41ZM16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
    </Svg>
);
export default InfoSVG;
