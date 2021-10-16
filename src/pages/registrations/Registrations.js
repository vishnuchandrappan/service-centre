import { Card, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { CardExtra } from "../../components/CardExtra";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Registration number",
    dataIndex: "referenceNumber",
    key: "referenceNumber",
    render: (referenceNumber) => (
      <Link to={`/registrations/${referenceNumber}`}>{referenceNumber}</Link>
    ),
  },
  {
    title: "Customer name",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Item",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "Model",
    dataIndex: "productModel",
    key: "productModel",
  },
  {
    title: "Assigned to",
    dataIndex: "currentAssignee",
    key: "currentAssignee",
    render: (currentAssignee) => currentAssignee || "Unassigned",
  },
];

const CustomExtra = ({ handleSearch }) => (
  <div style={{ display: "flex" }}>
    <Input.Search style={{ marginRight: "1em" }} onSearch={handleSearch} />
    <CardExtra />
  </div>
);

export const Registrations = () => {
  const reference = useFirestore().collection("registrations");
  const registrations = useFirestoreCollectionData(reference);

  const [key, setKey] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  const handleSearch = (key) => {
    setKey(key.toLowerCase());
  };

  useEffect(() => {
    if (key) {
      setFilteredRegistrations(
        registrations.filter(
          (registration) =>
            registration?.customerName.toLowerCase().includes(key) ||
            registration?.customerContact.toLowerCase().includes(key) ||
            registration?.referenceNumber.toString().toLowerCase().includes(key)
        )
      );
    } else {
      setFilteredRegistrations(registrations);
    }
  }, [key, registrations]);

  return (
    <Card
      title="Registrations"
      extra={<CustomExtra handleSearch={handleSearch} />}
    >
      <Table dataSource={filteredRegistrations} columns={columns} />
    </Card>
  );
};
