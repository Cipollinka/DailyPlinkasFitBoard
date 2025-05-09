import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const CancelSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Rect width={32} height={32} fill="#747480" fillOpacity={0.5} rx={16} />
        <Path
            fill="#EBEBF5"
            fillOpacity={0.6}
            d="M9.89 20.634c-.384.384-.392 1.066.008 1.465.407.4 1.089.392 1.465.016L16 17.477l4.63 4.63a1.053 1.053 0 0 0 1.465-.008c.4-.407.4-1.073.008-1.465l-4.63-4.63 4.63-4.638c.392-.392.4-1.066-.008-1.465-.4-.4-1.073-.4-1.465-.008l-4.63 4.63-4.638-4.63c-.376-.384-1.066-.4-1.465.008-.4.4-.392 1.089-.008 1.465l4.63 4.638-4.63 4.63Z"
        />
    </Svg>
);
export default CancelSVG;
