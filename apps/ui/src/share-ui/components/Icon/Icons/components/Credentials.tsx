/* eslint-disable */
/* tslint:disable */
import * as React from 'react'
export interface CredentialsProps extends React.SVGAttributes<SVGElement> {
  size?: string | number
}
const Credentials: React.FC<CredentialsProps> = ({ size, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 48 48'
    width={size || '48'}
    height={size || '48'}
    {...props}
  >
    <g xmlns='http://www.w3.org/2000/svg' transform='scale(1.5)'>
      <path d='M16 22a4 4 0 1 0-4-4 4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2 2 2 0 0 1 2-2M14 6h4v2h-4z'></path>
      <path d='M24 2H8a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h16a2.003 2.003 0 0 0 2-2V4a2 2 0 0 0-2-2m-4 26h-8v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm2 0v-2a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3v2H8V4h16v24z'></path>
    </g>
  </svg>
)
Credentials.displayName = 'Credentials'
export default Credentials
/* tslint:enable */
/* eslint-enable */
