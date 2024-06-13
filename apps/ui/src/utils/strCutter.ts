export default (str: string | number, len = 20, point?: boolean | string) => (
    typeof str === 'string' && str.length > len
      ? `${str.substr(0, len)}${point && `${typeof point === 'string' ? `... ${point}` : '...'}`}`
      : str
  )
  