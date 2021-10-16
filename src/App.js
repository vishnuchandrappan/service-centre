import "antd/dist/antd.css";
import { SuspenseWithPerf } from "reactfire";
import { Loading } from "./components/layout/Loading";
import { Routes } from "./components/routes/Routes";
import { DataService } from "./services/DataService";

function App() {
  return (
    <div className="App">
      <SuspenseWithPerf fallback={<Loading />}>
        <DataService>
          <Routes />
        </DataService>
      </SuspenseWithPerf>
    </div>
  );
}

export default App;
