import React, { useContext } from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import getMenuItem from '../../helpers/getMenuItem';
import { theme } from 'antd';
import Theme from '../../context/ThemeContext';

const ThemeSwitch = () => {
  const token = theme.useToken().token;

  const context = useContext(Theme);

  const color = token.colorText;
  const svg = () => (
    <svg id="SvgjsSvg1001" xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" version="1.1" color="yellow">
      <defs id="SvgjsDefs1002"></defs>
      <g id="SvgjsG1008">
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" width="14px" height="14px">
          <path
            d="M463.81,505.38H48.19A41.62,41.62,0,0,1,6.62,463.81V48.19A41.62,41.62,0,0,1,48.19,6.62H463.81a41.62,41.62,0,0,1,41.57,41.57V463.81A41.62,41.62,0,0,1,463.81,505.38ZM48.19,27.41A20.8,20.8,0,0,0,27.41,48.19V463.81a20.8,20.8,0,0,0,20.78,20.78H463.81a20.8,20.8,0,0,0,20.78-20.78V48.19a20.8,20.8,0,0,0-20.78-20.78Z"
            fill={color}
          ></path>
          <path
            d="M181.55 340.85a10.35 10.35 0 01-7.3-3 111.44 111.44 0 01-21.3-29.1A115 115 0 01140.3 256c0-63.77 51.92-115.65 115.75-115.65a114.83 114.83 0 0181.74 33.91 10.39 10.39 0 11-14.69 14.69A95 95 0 00171.48 299.34a90.49 90.49 0 0017.37 23.73 10.39 10.39 0 01-7.3 17.78zM199 128.78a10.39 10.39 0 01-9.6-6.42l-21.53-52a10.39 10.39 0 1119.2-8l21.53 52a10.41 10.41 0 01-9.6 14.37zM66.41 344.92a10.39 10.39 0 01-4-20l52-21.53a10.39 10.39 0 018 19.2l-52 21.53A10.38 10.38 0 0166.41 344.92zM118.38 209.39a10.3 10.3 0 01-4-.79l-52-21.53a10.39 10.39 0 018-19.2l52 21.53a10.39 10.39 0 01-4 20zM313 128.78a10.41 10.41 0 01-9.6-14.37l21.53-52a10.39 10.39 0 1119.2 8l-21.53 52A10.39 10.39 0 01313 128.78z"
            fill={color}
          ></path>
          <path
            d="M26.16 496.23a10.4 10.4 0 01-7.34-17.74L478.49 18.82a10.39 10.39 0 1114.69 14.69L33.51 493.18A10.37 10.37 0 0126.16 496.23zM363.14 452.31a103.37 103.37 0 01-35.92-200.25A10.39 10.39 0 01339 268.2 74.69 74.69 0 00444 372.9a10.39 10.39 0 0116.2 11.7 101.61 101.61 0 01-24 37.49h0A103 103 0 01363.14 452.31zM305.62 289.8c-.29.27-.58.55-.86.84A82.56 82.56 0 00421.52 407.39h0l1-1A95.48 95.48 0 01305.62 289.8z"
            fill={color}
          ></path>
        </svg>
      </g>
    </svg>
  );
  const DayNightIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={svg} {...props} />;
  return getMenuItem(`Switch to ${context.dark ? 'light' : 'dark'}`, 'switchTheme', <DayNightIcon />);
};

export default ThemeSwitch;
