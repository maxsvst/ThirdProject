import React from "react";

import { MenuItem, Menu, Button } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

export const SavedCities = ({
  savedLocations,
  getWeatherData,
  deleteFromSavedCityList,
}) => {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Сохранённые города
          </Button>
          <Menu {...bindMenu(popupState)}>
            {savedLocations?.map((item) => {
              return (
                <div key={item.value} className="flex flex-row">
                  <MenuItem
                    onClick={() => getWeatherData(item.label)}
                    value={item.value}
                  >
                    {item.label}{" "}
                  </MenuItem>
                  <Button
                    className="hover:text-[#E02424]"
                    onClick={() => deleteFromSavedCityList(item.value)}
                  >
                    &times;
                  </Button>
                </div>
              );
            })}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};
