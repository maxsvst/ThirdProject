import React from "react";

import { MenuItem, Menu, Button } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export const Settings = ({
  onTogglePelpableTemperature,
  isPalableTemperatureVisible,
  onToggleSunriseTime,
  isSunriseTimeVisible,
  onToggleSunsetTime,
  isSunsetTimeVisible,
}) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Настройки
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() => {
                onTogglePelpableTemperature();
              }}
            >
              {isPalableTemperatureVisible}
            </MenuItem>

            <MenuItem
              onClick={() => {
                onToggleSunriseTime();
              }}
            >
              {isSunriseTimeVisible}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onToggleSunsetTime();
              }}
            >
              {isSunsetTimeVisible}
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
