import React, { useState } from "react";
import { notification } from "antd";
import ItemSetting from "./ItemSetting";
import "antd/dist/antd.css";

const App = () => {
  const [waitTime, setWaitTime] = useState(60);

  async function handleWaitTimeChange(newVal: number) {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    if (result) {
      setWaitTime(newVal);
      notification.success({
        message: "设置成功",
        description: `实时博弈的房间等待时长: ${newVal} s`,
      });
      return true;
    } else {
      return false;
    }
  }

  return (
    <div style={{ padding: 50 }}>
      <ItemSetting
        title="实时博弈的房间等待时长"
        value={waitTime}
        numberConfig={{
          unit: "秒",
          min: 10,
          max: 120,
          step: 5,
        }}
        placeholder="10~120秒"
        onConfirm={handleWaitTimeChange}
        style={{ marginBottom: 60 }}
      />
    </div>
  );
};

export default App;
