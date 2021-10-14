import "antd/dist/antd.css";
import { SuspenseWithPerf } from "reactfire";
import { AppLayout } from "./components/layout/AppLayout";
import { Loading } from "./components/layout/Loading";
import { Routes } from "./components/routes/Routes";

function App() {
  return (
    <div className="App">
      <SuspenseWithPerf fallback={<Loading />}>
        <AppLayout>
          <Routes />
        </AppLayout>
      </SuspenseWithPerf>
    </div>
  );
}

export default App;
