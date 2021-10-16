import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const CustomCard = ({ path, title }) => {
  return (
    <Col span={8}>
      <Link to={path}>
        <Card hoverable className="flex-center">
          <h3>{title}</h3>
        </Card>
      </Link>
    </Col>
  );
};

export const Home = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <CustomCard title={"Registrations"} path={"/registrations"} />
      </Row>
    </div>
  );
};
