import React, { useState } from "react";
import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Dynamic } from "./Dynamic";
import { Closable } from "./Closable";
import { Closable2 } from "./Closable2";

export const Layout = () => {
    const [selectetTab, setSelectetTab] = useState('1');
    const handleChange = (event, newValue) => {
        setSelectetTab(newValue);
    };

    return(
        <TabContext value={selectetTab}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Static" value="1" />
                <Tab label="Dynamic" value="2" />
                <Tab label="Closable" value="3" />
            </TabList>
            <TabPanel value="1">Static</TabPanel>
            <TabPanel value="2">
                <Dynamic />
            </TabPanel>
            <TabPanel value="3">
                <Closable2 />
            </TabPanel>
            <Closable2 />
        </TabContext>
    );
}