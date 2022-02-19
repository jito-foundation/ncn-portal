import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppNavbar from "../Components/Navbar/Navbar";
import AdminPageTabs from "../Pages/adminDashboard/adminPageTabs";
import EditItem from "../Pages/adminDashboard/inventory/editItem";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Singup/Signup";
import Detail from "../Pages/Detail";
import NotifyContextProvider from "../context/notifyContext";
import NotifyMsg from "../utils/Notification";

const AppRouter = ({ isUser, cUser }) => {
  return (
    <Router>
      <NotifyContextProvider>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login">{isUser ? <Redirect to="/" /> : <Login />}</Route>
          <Route exact path="/signup">
            {isUser ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path="/dashboard">
            {isUser && cUser.admin ? <AdminPageTabs /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/dashboard/:id">
            {isUser && cUser.admin ? <EditItem /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/productDetail/:id" component={Detail} />
        </Switch>
        <NotifyMsg />
      </NotifyContextProvider>
    </Router>
  );
};

export default AppRouter;
