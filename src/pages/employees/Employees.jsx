import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Button, Card, Table, Tag } from "antd";
import { Link } from "react-router-dom";
import { CardExtra } from "../../components/CardExtra";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { NewEmployees } from "./NewEmployees";

const columns = [
  {
    title: "User Id",
    dataIndex: "userId",
    key: "userId",
    render: (userId) => <Link to={`/employees/${userId}`}>{userId}</Link>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
    render: (roles) => (
      <>
        {roles.map((role) => (
          <Tag color="blue">{role}</Tag>
        ))}
      </>
    ),
  },
];

const CustomExtra = ({ setShow }) => (
  <>
    <Button
      onClick={() => {
        setShow((show) => !show);
      }}
      type="primary"
      style={{ marginRight: "1em", minWidth: "8em" }}
    >
      <PlusCircleOutlined /> New
    </Button>
    <CardExtra />
  </>
);

export const Employees = () => {
  const employeesRef = useFirestore().collection("employees");

  const employees = useFirestoreCollectionData(employeesRef);

  const [show, setShow] = useState(false);

  const closeDrawer = () => {
    setShow(false);
  };

  return (
    <Card
      title="Employees"
      extra={<CustomExtra show={show} setShow={setShow} />}
    >
      <Table dataSource={employees} columns={columns} />
      <NewEmployees show={show} closeDrawer={closeDrawer} />
    </Card>
  );
};
