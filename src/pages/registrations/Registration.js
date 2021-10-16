import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { ROLES } from "../../utils/constants";
import { CardExtra } from "../../components/CardExtra";

const RowCard = ({ title, value }) => {
  return (
    <>
      <Col span={12} style={{ textAlign: "right", padding: "1em" }}>
        {title}
      </Col>
      <Col span={12} style={{ padding: "1em" }}>
        <Typography.Title level={5}>{value}</Typography.Title>
      </Col>
    </>
  );
};

export const Registration = () => {
  const { referenceNumber } = useParams();

  const [loading, setLoading] = useState(true);

  const [userType, setUserType] = useState(ROLES.ENGINEER);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setSelectedUser(null);
  }, [userType]);

  const registrationRef = useFirestore()
    .collection("registrations")
    .where("referenceNumber", "==", parseInt(referenceNumber));

  const usersRef = useFirestore()
    .collection("employees")
    .where("roles", "array-contains", userType);

  const registration = useFirestoreCollectionData(registrationRef);

  const users = useFirestoreCollectionData(usersRef);

  useEffect(() => {
    if (registration) {
      setLoading(false);
    }
  }, [registration]);

  const value = registration.length > 0 ? registration[0] : null;

  const assignUser = async () => {
    setLoading(true);
    const currentUser = users.find((user) => user.name === selectedUser);
    const assignees = value?.assignees || [];
    const date = new Date();

    await registrationRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.update({
          assignees: [
            ...assignees,
            {
              ...currentUser,
              createdAt: date,
            },
          ],
          currentAssignee: selectedUser,
          updatedAt: date,
        });
      });
    });
    setLoading(false);
  };

  return (
    <div>
      {loading && <Spin />}
      <Card
        title={`Reference number : ${value?.referenceNumber}`}
        extra={<CardExtra title="Registrations" path="/registrations" />}
      >
        <h3>{value?.id}</h3>
        <Row>
          <Col span={10} style={{ padding: "2em" }}>
            <Card>
              <Row>
                <RowCard title="Item" value={value?.item} />
                <RowCard title="Customer name" value={value?.customerName} />
                <RowCard
                  title="Customer contact"
                  value={value?.customerContact}
                />
                <RowCard title="Product model" value={value?.productModel} />
                <RowCard title="IMEI 1 / Serial number 1" value={value?.id1} />
                <RowCard title="IMEI 2 / Serial number 2" value={value?.id2} />
                <RowCard title="Purchase date" value={value?.purchaseDate} />
                <RowCard title="Carry-in time" value={value?.carryInTime} />
                <RowCard
                  title="In warranty ?"
                  value={value?.inWarranty ? "Yes" : "No"}
                />
                <RowCard
                  title="Problem description"
                  value={value?.problemDescription}
                />
                <RowCard
                  title="Warranty applicable for this service ?"
                  value={value?.isWarrantyApplicable ? "Yes" : "No"}
                />
              </Row>
            </Card>
          </Col>
          <Col span={12} style={{ padding: "2em" }}>
            <Card
              title="Assignees"
              style={{
                maxHeight: "45vh",
                overflowY: "auto",
              }}
            >
              <List
                bordered
                dataSource={value?.assignees}
                renderItem={(item) => (
                  <List.Item
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {value?.currentAssignee === item.name && (
                      <Tag
                        style={{
                          alignSelf: "flex-end",
                        }}
                        color="geekblue"
                      >
                        Current
                      </Tag>
                    )}
                    <h2>{item.name}</h2>
                    <span>{item.createdAt.toDate().toDateString()}</span>
                  </List.Item>
                )}
              />
            </Card>
            <Card title=" Assign to employee">
              <label style={{ paddingRight: "2em" }}>User Role</label>
              <Select
                style={{ width: "100%" }}
                value={userType}
                onChange={setUserType}
              >
                {Object.entries(ROLES).map(([key, value]) => (
                  <Select.Option key={key} value={value}>
                    {value}
                  </Select.Option>
                ))}
              </Select>
              <Divider />
              <label>Select user to be assigned</label>
              <Select
                showSearch
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={selectedUser}
                onChange={setSelectedUser}
              >
                {users.map((user) => (
                  <Select.Option key={user.id} value={user.name}>
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
              <Button
                style={{ marginTop: "1em" }}
                type="primary"
                disabled={selectedUser === null || loading}
                loading={loading}
                onClick={assignUser}
              >
                Assign user
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
