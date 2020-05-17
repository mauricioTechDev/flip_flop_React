import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  HashRouter
} from "react-router-dom";

import { toast } from "react-toastify";

//components

import Login from "./components/Login";
import Register from "./components/Register";
import Confirmation from "./components/Confirmation";
import Dashboard from "./components/dashboard/Dashboard";
import Landing from "./components/Landing";
import IndividualUserPostedImg from "./components/dashboard/pictureUploads/IndividualUserPostedImg"
import NewsFeed from './components/dashboard/newsFeed/NewsFeed'
import IndividualPicture from './components/dashboard/newsFeed/IndividualPicture'
import CommentReplies from './components/dashboard/commentReplies/CommentReplies';
import FriendsPage from './components/dashboard/userInfo/friends/FriendsPage'

toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Fragment>
      <HashRouter>
        <div className="container-fluid bg-dark pb-5 pl-5 pr-5 pt-5">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !isAuthenticated ? (
                  <Landing {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={props =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={props =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/confirmation/:id"
              render={props =>
                !isAuthenticated ? (
                  <Confirmation {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={props =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard/:imgId"
              render={props =>
                isAuthenticated ? (
                  <IndividualUserPostedImg {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/dashboard/newsfeed/:id"
              render={props =>
                isAuthenticated ? (
                  <NewsFeed {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/individualPicture/:imgId"
              render={props =>
                isAuthenticated ? (
                  <IndividualPicture {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/commentReply/:comments_id"
              render={props =>
                isAuthenticated ? (
                  <CommentReplies {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/friend/:friendId"
              render={props =>
                isAuthenticated ? (
                  <FriendsPage {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </HashRouter>
    </Fragment>
  );
}

export default App;
