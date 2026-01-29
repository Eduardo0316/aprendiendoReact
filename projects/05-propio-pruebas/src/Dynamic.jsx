import React, { useState } from "react";
import { Tab, Button } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
export const Dynamic = () => {
    const [selectetTab, setSelectetTab] = useState('1');
    
    const [tabs, setTabs] = useState([]);
    const [panels, setPanels] = useState([]);
    const [tabIndex, setTabIndex] = useState(2)

    const handleChange = (event, newValue) => {
        setSelectetTab(newValue);
    };

    const createNewTab = () => {
        const newTab = {
            value: `${tabIndex}`,
            label: `Dynamic Tab ${tabIndex}`
        }

        setTabs([...tabs, newTab])

        setPanels([
            ...panels,{
                value: `${tabIndex}`,
                child: () =>
                    <div>
                        Hello, i am the dinamic tab number {tabIndex}
                    </div>
            }
        ])

        setSelectetTab(`${tabIndex}`)

        setTabIndex(tabIndex + 1)
    }

    return(
        <TabContext value={selectetTab}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Create new" value="1" />
                {tabs.map(tab => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}

            </TabList>
            <TabPanel value="1">
                <Button 
                variant="contained" 
                color="primary"
                onClick={createNewTab}>
                    Create Dynamic Tab
                </Button>
            </TabPanel>
            {panels.map(panel => (
                <TabPanel key={panel.value} value={panel.value}>
                    {panel.child()}
                </TabPanel>
            ))}
        </TabContext>
    );
}