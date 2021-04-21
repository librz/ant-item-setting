import { useState } from "react";
import { notification } from "antd";
import ItemSetting from "./components/ItemSetting";
import Section from "./components/Section";
import "antd/dist/antd.css";

type Unit = "小时" | "天";

const App = () => {
  const [commuTime, setCommuTime] = useState(30);

  const [leaveTime, setLeaveTime] = useState(4);
  const [leaveUnit, setLeaveUnit] = useState<Unit>("小时");

  const [requestor, setRequestor] = useState("柯南");

  async function handleCommuTimeChange(newVal: number) {
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

  async function handleLeaveTimeChange(newVal: number, unit: Unit) {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
    if (result) {
      setLeaveTime(newVal);
      setLeaveUnit(unit);
      notification.success({
        message: "设置成功",
        description: `请假时间: ${newVal} ${unit}`,
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
          "确认按钮背后的 hanlder 的返回类型是 Promsie<Boolean>, 在设置过程中按钮自带 Loading, 如果出现错误有自动错误提示",
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
          onConfirm={handleCommuTimeChange}
        />
      </Section>

      <Section
        desc={[
          "用户可以改变单位, 最大值和最小值时可设为函数，这样可以根据单位灵活适配",
        ]}
      >
        <ItemSetting
          title="请假时间"
          value={leaveTime}
          onConfirm={handleLeaveTimeChange}
          numberConfig={{
            units: ["小时", "天"],
            unit: leaveUnit,
            min: (unit: string) => {
              if (unit === "小时") return 4;
              else return 0.5;
            },
            max: (unit: string) => {
              if (unit === "小时") return 100 * 8;
              else return 100;
            },
            outofRangeWarning: "必须在 4 小时 ~ 100 天(100 * 8 小时)之间",
          }}
          placeholder="请输入请假时间"
        />
      </Section>

      <Section desc={["不单单是数字，还可以设置普通的文本"]}>
        <ItemSetting
          title="请假人"
          value={requestor}
          onConfirm={async (newVal: string) => {
            await new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });
            setRequestor(newVal);
            return Promise.resolve(true);
          }}
        />
      </Section>

      <Section desc={["设置组件为只读"]}>
        <ItemSetting
          title="审批人"
          value="怪盗基德"
          editable={false}
          whycantedit="该组件被设置为不可修改"
          onConfirm={() => Promise.resolve(true)}
        />
      </Section>
    </div>
  );
};

export default App;
