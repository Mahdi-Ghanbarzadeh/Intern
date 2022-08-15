// 7
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Switch,
  Rate,
  Radio,
  Space,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
import IPut from "iput";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// const CustomInput = ({ value, onChange }) => {
//   console.log(value, onChange);
//   return <input value={value} onChange={onChange} />;
// };

const CustomInput = (props) => {
  console.log(props);
  return <input value={props.value} onChange={props.onChange} />;
};

const CustomIP = (props) => {
  console.log(props);
  return <IPut defaultValue={props.value} onChange={props.onChange} />;
  // return <input value={value} onChange={onChange} />;
};

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="98">+98</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="Rial">ريال</Option>
        <Option value="USD">$</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <div className="App">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "98",
          custom: 102030,
          ip: "111.111.111.010",
        }}
        scrollToFirstError
      >
        <Form.Item name="email" label="E-mail">
          <Input />
        </Form.Item>

        <Form.Item label="Custom" name="custom">
          <CustomInput />
        </Form.Item>

        <Form.Item label="IP" name="ip">
          <CustomIP />
        </Form.Item>

        <Form.Item name="phone" label="Phone Number">
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item name="gender" label="Gender[only one]">
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="select-multiple" label="Select[multiple]">
          <Select mode="multiple" placeholder="Please select favourite colors">
            <Option value="red">Red</Option>
            <Option value="green">Green</Option>
            <Option value="blue">Blue</Option>
          </Select>
        </Form.Item>

        <Form.Item label="InputNumber">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={10} />
          </Form.Item>
          <span className="ant-form-text"> machines</span>
        </Form.Item>

        <Form.Item name="switch" label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
