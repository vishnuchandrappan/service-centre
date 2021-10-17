import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { Button, Card, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { CardExtra } from "../../components/CardExtra";
import { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { NewEmployees } from "./NewEmployees";

const CustomExtra = ({ handleNew, handleSearch }) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <Input.Search
      onSearch={handleSearch}
      placeholder="Search name, userId or email"
      style={{ marginRight: "1em" }}
    />
    <Button
      onClick={handleNew}
      type="primary"
      style={{ marginRight: "1em", minWidth: "8em" }}
    >
      <PlusCircleOutlined /> New
    </Button>
    <CardExtra />
  </div>
);

export const Employees = () => {
  const employeesRef = useFirestore().collection("employees");

  const employees = useFirestoreCollectionData(employeesRef);

  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (userId) => {
    setShow(true);
    setSelectedUser(filteredEmployees.find((user) => user.userId === userId));
  };

  const handleNew = () => {
    setShow(true);
    setSelectedUser(null);
  };

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
      title: "Email",
      dataIndex: "email",
      key: "email",
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
    {
      title: "Actions",
      dataIndex: "userId",
      key: "actions",
      render: (userId) => (
        <>
          <Link to={`/employees/${userId}`}>
            <Tooltip title="View employee profile">
              <Button
                type="primary"
                style={{ marginRight: "1em" }}
                icon={<EyeOutlined />}
              />
            </Tooltip>
          </Link>
          <Tooltip
            onClick={() => {
              handleEdit(userId);
            }}
            title="Edit employee profile"
          >
            <Button
              type="primary"
              style={{ marginRight: "1em" }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete employee profile">
            <Popconfirm
              title="Are you sure to delete this employee?"
              onConfirm={() => {
                deleteUser(userId);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                style={{ marginRight: "1em" }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const deleteUser = async (userId) => {
    try {
      await employeesRef.doc(userId).delete();
    } catch (error) {
      console.log("error in deleting user", error);
    }
  };

  const [key, setKey] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    if (key) {
      setFilteredEmployees(
        employees.filter((employee) => {
          return (
            employee.name?.toLowerCase().includes(key) ||
            employee.userId?.includes(key) ||
            employee.email?.includes(key)
          );
        })
      );
    } else {
      setFilteredEmployees(employees);
    }
  }, [key, employees]);

  const handleSearch = (key) => {
    setKey(key);
  };

  const closeDrawer = () => {
    setShow(false);
    setSelectedUser(null);
  };

  return (
    <Card
      title="Employees"
      extra={<CustomExtra handleSearch={handleSearch} handleNew={handleNew} />}
    >
      <Table dataSource={filteredEmployees} columns={columns} />

      {/* new user */}
      <NewEmployees show={show && !selectedUser} closeDrawer={closeDrawer} />

      {/* edit user */}
      {selectedUser && (
        <NewEmployees
          show={show && selectedUser}
          user={selectedUser}
          closeDrawer={closeDrawer}
        />
      )}
    </Card>
  );
};
