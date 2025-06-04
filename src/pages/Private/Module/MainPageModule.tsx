import { Box, Tab, Tabs, Typography } from "@mui/material"
import React from "react";
import { useNavigate } from "react-router-dom";

interface subModules{
    name: string;
    icon?: React.ReactElement;
    url?: string;
    component?: React.ReactNode;
}

interface MainPageModuleProps {
    title?: string;
    subModules?: subModules[];
    focusedSubModule?: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pb: 0 }}>
            <Typography component="div" sx={{pt:1}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function MainPageModule({ title, subModules, focusedSubModule }: MainPageModuleProps) {
    const [value, setValue] = React.useState(
      subModules?.findIndex((subModule) => subModule.name === focusedSubModule) || 0);
    const navigate = useNavigate();
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      console.log(event)
      setValue(newValue);
    };
  
    const handleClickNavegate = (url: string) => {
      navigate(url, { replace: true });
    };
  
    React.useEffect(() => {
        console.log('focusedSubModule', focusedSubModule);
        console.log('subModules', subModules);
      const index = value;
      if (index !== undefined && index !== -1) {
        setValue(index);
      }
    }, [focusedSubModule, subModules]);
  
    return (
      <div className="h-screen min-w-full border-black">
        <div className="flex flex-col h-16" id="header">
          <h1 className="text-3xl text-black">{title}</h1>
          <Tabs
            onChange={handleChange}
            value={value}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{
              backgroundColor: '#F5F5F5',
              rounded: '15px',
              minHeight: '30px',
              '& .MuiTab-root': {
                minHeight: '36px',
                padding: '0px 12px',
              },
            }}
          >
            {subModules?.map((subModule, index) => (
              <Tab
                key={index}
                onClick={() => handleClickNavegate(`/private/${subModule.url || ''}`)}
                iconPosition="start"
                label={subModule.name}
                icon={subModule.icon as React.ReactElement}
                disableFocusRipple
              />
            ))}
          </Tabs>
          {subModules?.map((subModule, index) => (
            <TabPanel value={value} index={index} dir="ltr" key={index}>
              {subModule.component}
            </TabPanel>
          ))}
        </div>
      </div>
    );
  }
  

export default MainPageModule