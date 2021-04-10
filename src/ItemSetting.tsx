import React, { FC, useState, useEffect } from "react";
import { InputNumber, Input, Button, Typography, Select, Modal, Tooltip } from "antd";
import If from "./If";
import "./ItemSetting.css";

const { Text } = Typography;

interface Props {
  title: string;
  value: number | string;
  onConfirm: (value: any, unit?: any) => Promise<boolean>;
  numberConfig?: {
    step?: number;
    // 当前的单位
    unit?: string;
    // 允许有多个单位, 用户可以自由选择
    units?: string[];
    // min 和 max 都既可以是 number 又可以是一个函数
    // 如果是函数，会根据单位的不同动态返回 min 或者 max
    min?: number | ((unit: string) => number);
    max?: number | ((unit: string) => number);
    // 当数值超出范围可以给出一个自定义的警告消息
    outofRangeWarning?: string;
  };
  placeholder?: string;
  // 是否可编辑
  editable?: boolean;
  // 如果 editable 是 false 的话，可以提供一个不允许编辑的理由 (whycantedit => Why can't edit)
  whycantedit?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

const ItemSetting: FC<Props> = ({
  title,
  value,
  onConfirm,
  numberConfig = {
    step: 1,
  },
  placeholder = "",
  editable = true,
  whycantedit = "",
  style = {},
  inputStyle = { width: 140 },
}) => {
  const { units, unit, min, max, step, outofRangeWarning } = numberConfig;
  // state
  const [currentValue, setCurrentValue] = useState<string | number>(value);
  const [currentUnit, setCurrentUnit] = useState(unit);
  const [editting, setEditting] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    setCurrentUnit(unit);
  }, [unit]);

  function renderUnit() {
    // only render <Select /> when it has multiple units and is editting
    if (units && editting) {
      return (
        <Select
          value={currentUnit}
          onChange={val => setCurrentUnit(val.toString())}
          style={{ marginLeft: 6 }}
          size="large"
        >
          {units.map(ele => (
            <Select.Option key={ele} value={ele}>
              {ele}
            </Select.Option>
          ))}
        </Select>
      );
    } else {
      return <Text style={{ marginLeft: 12, fontSize: 20 }}>{unit}</Text>;
    }
  }

  function handleConfirm() {
    if (typeof value === "number") {
      const currentNumber = Number(currentValue);
      if (min !== undefined) {
        let minVal = typeof min === "number" ? min : min(currentUnit as string);
        if (currentNumber < minVal) {
          Modal.warn({
            title: outofRangeWarning || `不可小于${minVal}${currentUnit}`,
          });
          return;
        }
      }

      if (max !== undefined) {
        let maxVal = typeof max === "number" ? max : max(currentUnit as string);
        if (currentNumber > maxVal) {
          Modal.warn({
            title: outofRangeWarning || `不可大于${maxVal}${currentUnit}`,
          });
          return;
        }
      }
    }
    setUpdating(true);
    onConfirm(currentValue, currentUnit).then(success => {
      setUpdating(false);
      if (success) setEditting(false);
    });
  }

  function handleCancel() {
    setCurrentValue(value);
    setCurrentUnit(unit);
    setEditting(false);
  }

  return (
    <div style={style}>
      <h2 className="item-setting-head">{title}</h2>
      <div className="item-setting-body">
        <div className="item-setting-body-left">
          <If condition={editting}>
            <If condition={typeof value === "number"}>
              <InputNumber
                autoFocus
                size="large"
                step={step}
                value={currentValue as number}
                onChange={current => {
                  if (typeof current != "number") return;
                  setCurrentValue(current);
                }}
                placeholder={placeholder}
                style={inputStyle}
              />
            </If>
            <If condition={typeof value === "string"}>
              <Input
                autoFocus
                size="large"
                value={currentValue}
                onChange={e => setCurrentValue(e.target.value)}
                placeholder={placeholder}
                style={inputStyle}
              />
            </If>
          </If>
          <If condition={!editting}>
            <Text style={{ fontSize: 28 }}>{value}</Text>
          </If>
          {renderUnit()}
        </div>

        <div className="item-setting-body-right">
          <If condition={!editable}>
            <Tooltip placement="right" title={whycantedit || "不可修改"}>
              <Button type="text" size="large" disabled>
                修改
              </Button>
            </Tooltip>
          </If>

          <If condition={editable}>
            <If condition={editting}>
              <Button size="large" type="primary" loading={updating} onClick={handleConfirm}>
                确认
              </Button>
              <Button onClick={handleCancel} size="large" style={{ marginLeft: 10 }}>
                取消
              </Button>
            </If>
            <If condition={!editting}>
              <Button type="link" size="large" onClick={() => setEditting(true)}>
                修改
              </Button>
            </If>
          </If>
        </div>
      </div>
    </div>
  );
};

export default ItemSetting;
