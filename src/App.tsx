import { useState } from "react";
import { notification } from "antd";
import ItemSetting from "./components/ItemSetting";
import Section from "./components/Section";
import "antd/dist/antd.css";

const App = () => {
  const [commuTime, setCommuTime] = useState(30);

  async function handleWaitTimeChange(newVal: number) {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    if (result) {
      setCommuTime(newVal);
      notification.success({
        message: "设置成功",
        description: `上班通勤时间: ${newVal} s`,
      });
      return true;
    } else {
      return false;
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <Section
        desc={[
          "有范围限制，尝试输入一个小于 5 或者大于 120 的值，看看会发生什么",
          "默认步长为 5，尝试用键盘上下方向键来修改数值",
          "确认按钮背后的 hanlder 返回是 Promsie, 在设置过程中按钮自带 Loading, 如果出现错误有自动错误提示",
        ]}
      >
        <ItemSetting
          title="上班通勤时间"
          value={commuTime}
          numberConfig={{
            unit: "分钟",
            min: 5,
            max: 120,
            step: 5,
          }}
          placeholder="请输入有效数字"
          onConfirm={handleWaitTimeChange}
        />
      </Section>
    </div>
  );
};

export default App;
