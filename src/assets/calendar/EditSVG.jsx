import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
const EditSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#fff"
                fillRule="evenodd"
                d="M0 15.778V20h4.222L16.444 7.667l-4.222-4.223L0 15.778ZM19.667 4.444a1.074 1.074 0 0 0 0-1.555L17.11.333a1.074 1.074 0 0 0-1.555 0l-2 2 4.222 4.223 1.889-2.112Z"
                clipRule="evenodd"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h20v20H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);
export default EditSVG;
