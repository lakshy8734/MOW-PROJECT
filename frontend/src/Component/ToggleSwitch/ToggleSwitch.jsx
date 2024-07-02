import React from "react";
import Switch from "react-switch";

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label>
      <Switch 
        onChange={onChange} 
        checked={checked} 
        offColor="#888" 
        onColor="#2196f3" 
        uncheckedIcon={false} 
        checkedIcon={false}
      />
    </label>
  );
};

export default ToggleSwitch;
