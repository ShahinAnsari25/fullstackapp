import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./Componants/SideBar";
import Header from "./Componants/Header";
import Dashboard from "./Componants/Dashboard";
import PeopleDirectory from "./Componants/PeopleDirectory";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <div
          className="sideBarandContentSection flex"
          style={{
            minHeight: "calc(100vh - 84px)",
          }}
        >
          <div className="sideBar w-[17%] h-full">
            <SideBar></SideBar>
          </div>
          <div className="PeopleDirectoryDashboard border border-borderPeopleDirectory m-5 rounded-xl overflow-auto w-[85%]">
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/peopleDirectory"
                element={<PeopleDirectory />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
