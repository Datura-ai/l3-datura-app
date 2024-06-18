import React from "react"

export const regions = [
  "Any",
  "CA-MTL-1",
  "CA-MTL-2",
  "CA-MTL-3",
  "EU-NL-1",
  "EU-RO-1",
  "EUR-IS-1",
  "EUR-IS-2",
  "SEA-SG-1",
  "US-CA-1",
  "US-GA-1",
  "US-KS-2",
  "US-OR-1",
  "US-TX-3"
]

export const cudaVersions = [
  "11.8",
  "12.0",
  "12.1",
  "12.2",
  "12.3",
  "12.4"
]

export const ramGpuMarks = [
  { label: '8', value: '8' },
  { label: '16', value: '16' },
  { label: '24', value: '24' },
  { label: '48', value: '48' },
  { label: '80', value: "80" },
  { label: '100', value: '100' },
]

export const discTypeMarks = [
  { label: 'SSD', value: 'ssd' },
  { label: 'NVME', value: 'nvme' },
]

export const sliderMarks = [
  { value: 0, label: 'Any' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 8, label: '8' },
  { value: 10, label: '10' },
]

const useFilter = () => {
    const [filter, setFilter] = React.useState({
        cloud: 'Secure Cloud',
        region: 'Any',
        cudaVersion: 'Any'
    })

    return {
        filter,
        setFilter,
    }
}


export default useFilter