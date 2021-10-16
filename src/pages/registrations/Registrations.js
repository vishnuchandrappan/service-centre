import { Card, Table } from "antd";
import { Link } from "react-router-dom";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

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
];

export const Registrations = () => {
  const reference = useFirestore().collection("registrations");
  const registrations = useFirestoreCollectionData(reference);

  return (
    <Card title="Registrations">
      <Table dataSource={registrations} columns={columns} />
    </Card>
  );
};
