import { Card, Select, Form, Input, Button, DatePicker, Switch } from "antd";
import { useContext, useState } from "react";
import { DataContext } from "../services/DataService";
import { useFirestore, useUser } from "reactfire";
import { useHistory } from "react-router";

export const NewRegistration = () => {
  const user = useUser();

  const registrationsStore = useFirestore().collection("registrations");

  const history = useHistory();

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);

    await registrationsStore
      .add({
        ...values,
        purchaseDate,
        carryInTime,
        createdAt: Date.now(),
        uid: user.uid,
      })
      .then((res) => {
        console.log("reg success", res);
        history.push(`/registrations/${values.referenceNumber}`);
      })
      .catch((err) => {
        console.log("err in reg", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const { items } = useContext(DataContext);

  // eslint-disable-next-line no-unused-vars
  const [selectedItem, setSelectedItem] = useState(1);

  const [loading, setLoading] = useState(false);

  const [purchaseDate, setPurchaseDate] = useState(new Date());

  const [carryInTime, setCarryInTime] = useState(new Date());

  const handleChange = (value) => {
    setSelectedItem(value);
  };

  const initialValues = { referenceNumber: Date.now(), item: "1" };

  return (
    <div>
      <Card title="Registration Form">
        <Form
          name="registration form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Form.Item label="Reference number" name="referenceNumber">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Item"
            name="item"
            rules={[{ required: true, message: "Please select one item!" }]}
          >
            <Select onChange={handleChange}>
              {items.map((item) => (
                <Select.Option value={item.name} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Customer name"
            name="customerName"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Customer contact"
            name="customerContact"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Product model"
            name="productModel"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="IMEI 1 / Serial number 1"
            name="id1"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="IMEI 2 / Serial number 2"
            name="id2"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Purchase date" name="purchaseDate">
            <DatePicker
              onChange={(_, date) => {
                setPurchaseDate(date);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Carry-in time"
            name="carryInTime"
            rules={[{ required: true, message: "Required!" }]}
          >
            <DatePicker
              onChange={(_, date) => {
                setCarryInTime(date);
              }}
            />
          </Form.Item>

          <Form.Item
            label="In warranty ?"
            name="inWarranty"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Problem description"
            name="problemDescription"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Warranty applicable for this service ?"
            name="isWarrantyApplicable"
            rules={[{ required: true, message: "Required!" }]}
          >
            <Switch />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
