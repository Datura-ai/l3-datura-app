/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface KeyProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Key: React.FC<KeyProps> = ({ size, ...props }) => (
  <svg
    width='30px'
    height='22px'
    viewBox='-1 0 24 12'
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g id='Icons' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
      <g id='Rounded' transform='translate(-135.000000, -1266.000000)'>
        <g id='Communication' transform='translate(100.000000, 1162.000000)'>
          <g id='-Round-/-Communication-/-vpn_key' transform='translate(34.000000, 98.000000)'>
            <g>
              <polygon id='Path' points='0 0 24 0 24 24 0 24'></polygon>
              <path
                d='M12.65,10 C11.7,7.31 8.9,5.5 5.77,6.12 C3.48,6.58 1.62,8.41 1.14,10.7 C0.32,14.57 3.26,18 7,18 C9.61,18 11.83,16.33 12.65,14 L17,14 L17,16 C17,17.1 17.9,18 19,18 C20.1,18 21,17.1 21,16 L21,14 C22.1,14 23,13.1 23,12 C23,10.9 22.1,10 21,10 L12.65,10 Z M7,14 C5.9,14 5,13.1 5,12 C5,10.9 5.9,10 7,10 C8.1,10 9,10.9 9,12 C9,13.1 8.1,14 7,14 Z'
                id='🔹Icon-Color'
                fill='#1D1D1D'
              ></path>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
Key.displayName = 'Key'
export default Key
/* tslint:enable */
/* eslint-enable */
