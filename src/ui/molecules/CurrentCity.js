import React from 'react'
import { Icon } from "react-icons-kit";
import { androidAdd } from "react-icons-kit/ionicons/androidAdd";

export default function CurrentCity({ addCityToSavedCities, currentCity }) {
    return (
        <div className="flex items-center">
            <Icon
                className="mr-4 
                 cursor-pointer"
                onClick={addCityToSavedCities}
                icon={androidAdd}
                size={60}
            />
            <span
                className="font-sans 
                 font-bold
                 text-6xl
                 inline-block"
            >
                {currentCity}
            </span>
        </div>
    )
}
