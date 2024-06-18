import { useState } from 'react'

import { StyledHorizontalDivider } from 'routes/ChatRouteLayout'

import TabList from 'share-ui/components/Tabs/TabList/TabList'
import Tab from 'share-ui/components/Tabs/Tab/Tab'
import TabsContext from 'share-ui/components/Tabs/TabsContext/TabsContext'
import TabPanels from 'share-ui/components/Tabs/TabPanels/TabPanels'
import TabPanel from 'share-ui/components/Tabs/TabPanel/TabPanel'
import General from './panels/General'

const PodDetails = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
  }

  return (
    <>
      <TabList size='small' activeTabId={activeTab} noBorder>
        <Tab onClick={() => handleTabClick(0)}>General</Tab>
        <Tab onClick={() => handleTabClick(1)}>Settings</Tab>
        <Tab onClick={() => handleTabClick(2)}>Logs</Tab>
      </TabList>

      <StyledHorizontalDivider />

      <TabsContext activeTabId={activeTab}>
        <TabPanels noAnimation>
          <TabPanel>
            <General />
          </TabPanel>
        </TabPanels>
      </TabsContext>
    </>
  )
}

export default PodDetails
