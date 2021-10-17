import { Alert, Button, Drawer, Form, Input, Select } from "antd";
import { useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import { ROLES } from "../../utils/constants";

export const NewEmployees = ({ show, closeDrawer, user = null }) => {
  const auth = useAuth();

  const employeesRef = useFirestore().collection("employees");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initLoading = () => {
    setLoading(true);
    setError(null);
  };

  const createUser = async (userId, values) => {
    try {
      delete values.password;
      delete values.confirmPassword;
      await employeesRef.doc(userId).set({
        ...values,
        userId,
        createdAt: new Date(),
        id: Date.now(),
      });
      closeDrawer();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const userRegistration = async (values) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      );
      await createUser(response.user.uid, values);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const userUpdate = async (values) => {
    try {
      delete values.password;
      delete values.confirmPassword;
      await employeesRef.doc(user.userId).update({
        ...values,
        updatedAt: new Date(),
      });
      closeDrawer();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (values) => {
    initLoading();
    if (user) {
      await userUpdate(values);
    } else {
      await userRegistration(values);
    }
    setLoading(false);
  };

  return (
    <Drawer
      title={`${!user ? "Register new" : "Edit"} employee`}
      placement="right"
      width={500}
      onClose={closeDrawer}
      visible={show}
    >
      {error && (
        <Alert
          message={error}
          type="error"
          closable
          onClose={() => {
            setError(null);
          }}
        />
      )}
      <Form
        name="New employee form"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={user}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Required!" },
            {
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {!user && (
          <>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Required!" }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Roles"
          name="roles"
          rules={[
            {
              required: true,
              message: "Required!",
            },
          ]}
        >
          <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[","]}>
            {Object.entries(ROLES).map(([key, value]) => (
              <Select.Option key={key} value={value}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
