import React, { useState } from "react";
import { Tab, Button, Grid } from "@mui/material";
import { TabList, TabContext, TabPanel } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';

export const Closable2 = () => {
    // Corregido: selectedTab (ortografía)
    const [selectedTab, setSelectedTab] = useState('1');
    const [tabs, setTabs] = useState([]);
    const [tabIndex, setTabIndex] = useState(2);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // Función genérica para crear pestañas (combinada para evitar repetición)
    const createBox = (color) => {
        const id = `${tabIndex}`;
        const newTab = {
            value: id,
            label: `${color.charAt(0).toUpperCase() + color.slice(1)} box ${id}`,
            color: color // Guardamos el color como dato, no como componente
        };

        setTabs([...tabs, newTab]);
        setSelectedTab(id);
        setTabIndex(tabIndex + 1);
    };

    const handleTabClose = (event, valueToRemove) => {
        // Evitar que el clic en la "X" también dispare el cambio de pestaña de MUI
        event.stopPropagation();

        const tabIndexToRemove = tabs.findIndex(t => t.value === valueToRemove);
        const newTabs = tabs.filter(t => t.value !== valueToRemove);

        console.log("NewTabs = ",newTabs)
        // Lógica para decidir a qué pestaña saltar
        if (selectedTab === valueToRemove) {
            if (newTabs.length === 0) {
                // Si no quedan más pestañas dinámicas, volver a la principal
                setSelectedTab('1');
            } else {
                // Intentar saltar a la pestaña de la izquierda, si no existe, a la derecha
                const nextTab = newTabs[tabIndexToRemove - 1] || newTabs[0];
                setSelectedTab(nextTab ? nextTab.value : '1');
            }
        }

        setTabs(newTabs);
    };

    return (
        <TabContext value={selectedTab}>
            <TabList onChange={handleChange} aria-label="Dynamic tabs">
                <Tab label="Inicio" value="1" />

                {tabs.map((tab) => (
                    <Tab 
                        key={tab.value}
                        value={tab.value}
                        label={tab.label}
                        iconPosition="end"
                        icon={
                            <CloseIcon 
                                fontSize="small" 
                                onClick={(e) => handleTabClose(e, tab.value)} 
                            />
                        } 
                    />
                ))}
            </TabList>

            <TabPanel value="1">
                <Grid container spacing={2}>
                    <Grid item>
                        <Button onClick={() => createBox('blue')} variant="contained" color="primary">
                            Create Blue Box
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => createBox('red')} variant="contained" color="secondary">
                            Create Red Box
                        </Button>
                    </Grid>
                </Grid>
            </TabPanel>

            {/* Renderizado simplificado de paneles */}
            {tabs.map((tab) => (
                <TabPanel key={tab.value} value={tab.value}>
                    <div style={{
                        height: '300px', 
                        width: '300px', 
                        backgroundColor: tab.color 
                    }} />
                </TabPanel>
            ))}
        </TabContext>
    );
};