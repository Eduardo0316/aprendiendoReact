import React, { useState } from "react";
import { Tab, Button, Grid } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';

export const Closable = () => {
    const [selectetTab, setSelectetTab] = useState('1');
    
    const [tabs, setTabs] = useState([]);
    const [panels, setPanels] = useState([]);
    const [tabIndex, setTabIndex] = useState(2)

    const handleChange = (event, newValue) => {
        setSelectetTab(newValue);
    };

    const handleTabOptions = () => {
        setSelectetTab(`${tabIndex}`)
        setTabIndex(tabIndex + 1)
    }

    const createBlueBox = () => {
        const newTab = {
            value: `${tabIndex}`,
            label: `Blue box ${tabIndex}`
        }

        setTabs([...tabs, newTab])

        setPanels([
            ...panels,{
                value: `${tabIndex}`,
                child: () =>
                    <div style={{height: '300px', width: '300px', backgroundColor: 'blue'}} />
            }
        ])

        handleTabOptions();
    }

    const createRedBox = () => {
        const newTab = {
            value: `${tabIndex}`,
            label: `Red box ${tabIndex}`
        }

        setTabs([...tabs, newTab])

        setPanels([
            ...panels,{
                value: `${tabIndex}`,
                child: () =>
                    <div style={{height: '300px', width: '300px', backgroundColor: 'red'}} />
            }
        ])

        handleTabOptions();
    }

    const handleTabClose = (value) => {
        const tabArr = tabs.filter(t => t.value !== value)
        setTabs(tabArr)

        const panelArr = panels.filter(p => p.value !== value)
        setPanels(panelArr)

        setSelectetTab('1')
    }

    return(
        <TabContext value={selectetTab}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="New Closable Tab" value="1" />

                {tabs.map(tab => (
                    <Tab 
                        icon={
                            <CloseIcon onClick={() => handleTabClose(tab.value)} />
                        } 
                        iconPosition="end"
                        key={tab.value} 
                        label={tab.label} 
                        value={tab.value} 
                    />
                ))}

            </TabList>


            <TabPanel value="1">
                <Grid container spacing={2}>
                    <Grid>
                        <Button
                            onClick={createBlueBox}
                            variant="contained" color="primary">
                                Create Blue Box
                            </Button>
                    </Grid>
                    <Grid>
                        <Button
                            onClick={createRedBox}
                            variant="contained" color="secondary">
                                Create Red Box
                            </Button>
                    </Grid>
                </Grid>
            </TabPanel>
            {panels.map(panel => (
                <TabPanel key={panel.value} value={panel.value}>
                    {panel.child()}
                </TabPanel>
            ))}
        </TabContext>
    );
}