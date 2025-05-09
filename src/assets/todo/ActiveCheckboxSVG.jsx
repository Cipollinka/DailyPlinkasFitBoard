import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const ActiveCheckboxSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Path
            fill="#FB0A75"
            d="M20 2H5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V5c0-1.657-1.345-3-3-3Zm-2.072 8.428-6 6c-.258.258-.59.384-.928.384-.338 0-.672-.127-.929-.383l-3-3A1.314 1.314 0 0 1 8.93 11.57L11 13.644l5.072-5.072a1.314 1.314 0 0 1 1.858 0c.51.51.51 1.345-.002 1.856Z"
        />
    </Svg>
);
export default ActiveCheckboxSVG;
