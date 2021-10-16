import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const CustomCard = ({ path, title }) => {
  return (
    <Col sm={24} md={11} lg={7} style={{ minHeight: "4em" }}>
      <Link to={path}>
        <Card hoverable className="flex-center">
          <h3>{title}</h3>
        </Card>
      </Link>
    </Col>
  );
};

const cards = [
  {
    path: "/registrations",
    title: "Registrations",
  },
  {
    path: "/registrations/new",
    title: "New Registration",
  },
  {
    path: "/employees",
    title: "Employee management",
  },
];

export const Home = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row justify="space-between">
        {cards.map((card) => (
          <CustomCard {...card} key={card.title} />
        ))}
      </Row>
    </div>
  );
};
