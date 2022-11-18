import "./App.css";
import { Route, Switch } from "react-router-dom";
import Section from "./container/Section";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Header from "./container/header/Header";
import SetDefault from "./pages/SetDefaultProfile";
import Explore from "./pages/Explore";
import Footer from "./container/Footer";
import Upload from "./pages/Upload";
import ShowProfiles from "./pages/ShowProfiles";

function App() {
  return (
    <div className="gradient__bg">
      <Switch>
        <Route path="/" exact={true}>
          <Navbar />
          <Header />
          <Section />
          <Footer />
        </Route>

        <Route path="/createProfile">
          <Profile />
        </Route>
        <Route path="/setDefaultProfile">
          <SetDefault />
        </Route>

        <Route path="/explore">
          <Explore />
        </Route>

        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/profile/:handle">
          <ShowProfiles />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
