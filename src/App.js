// 10
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
  Upload,
  DatePicker,
  TimePicker,
  Avatar,
  Typography,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  InboxOutlined,
  UploadOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./App.css";
const { Option } = Select;
const { RangePicker } = DatePicker;

const residences = [
  {
    value: "iran",
    label: "Iran",
    children: [
      {
        value: "isfahan",
        label: "Isfahan",
        children: [
          {
            value: "isfahan",
            label: "Isfahan",
          },
        ],
      },
      { value: "tehran", label: "Tehran" },
    ],
  },
  {
    value: "netherland",
    label: "Netherland",
    children: [
      {
        value: "limburg",
        label: "Limburg",
      },
    ],
  },
];

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};

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

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({ form, visible }) => {
  const prevVisibleRef = useRef();
  useEffect(() => {
    prevVisibleRef.current = visible;
  }, [visible]);
  const prevVisible = prevVisibleRef.current;
  useEffect(() => {
    if (!visible && prevVisible) {
      form.resetFields();
    }
  }, [form, prevVisible, visible]);
};

const ModalForm = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  useResetFormOnCloseModal({
    form,
    visible,
  });

  const onOk = () => {
    form.submit();
  };

  return (
    <Modal title="Add User" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item
          name="name"
          label="User Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="User Age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const App = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const showUserModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

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
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          if (name === "userForm") {
            const { register } = forms;
            const users = register.getFieldValue("users") || [];
            register.setFieldsValue({
              users: [...users, values],
            });
            setVisible(false);
          }
        }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "98",
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please select Country!",
              },
            ]}
          >
            <Select placeholder="select your country">
              <Option value="Iran">Iran</Option>
              <Option value="Netherland">Netherland</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Please select City!",
              },
            ]}
          >
            <Select placeholder="select your city">
              <Option value="Tehran">Tehran</Option>
              <Option value="Isfahan">Isfahan</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="countryCity"
            label="Country - City"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select your habitual residence!",
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <Form.Item
            name="group"
            label="Group Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User List"
            shouldUpdate={(prevValues, curValues) =>
              prevValues.users !== curValues.users
            }
          >
            {({ getFieldValue }) => {
              const users = getFieldValue("users") || [];
              return users.length ? (
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="user">
                      <Avatar icon={<UserOutlined />} />
                      {user.name} - {user.age}
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Text className="ant-form-text" type="secondary">
                  ( <SmileOutlined /> No user yet. )
                </Typography.Text>
              );
            }}
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="button"
              style={{
                margin: "0 8px",
              }}
              onClick={showUserModal}
            >
              Add User
            </Button>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <ModalForm visible={visible} onCancel={hideUserModal} />
        </Form>
      </Form.Provider>
    </div>
  );
};

export default App;
