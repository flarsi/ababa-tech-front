import React, { useState } from "react";
import "./TabBar.css";

type TabBarProps = {
  tabs: { content: JSX.Element; label: string }[];
};
function TabBar({ tabs }: TabBarProps) {
  const [checked, setChecked] = useState<number>(0);
  return (
    <div className="tabs">
      {tabs.map(({ content, label }, index) => (
        <div className="tab" key={index}>
          <input
            type="radio"
            id="tab-1"
            name="tabs"
            onChange={() => {}}
            checked={checked === index}
          />
          <label htmlFor="tab-1" onClick={() => setChecked(index)}>
            {label}
          </label>
          <div className="tab-content">{content}</div>
        </div>
      ))}
    </div>
  );
}

export default TabBar;
