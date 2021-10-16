import { Link } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CardExtra = ({ path = "/", title = "Home" }) => {
  return (
    <Link to={path}>
      <Button type="primary">
        <ArrowLeftOutlined /> {title}
      </Button>
    </Link>
  );
};
