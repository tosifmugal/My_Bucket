import React, { Fragment, useEffect } from "react";

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <div className="border shadow">
            <table className="productListTable">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col"> Role</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {users?.map((user, i) => {
                return (
                  <tbody>
                    <tr>
                      <td>{user?._id}</td>
                      <td>{user?.email}</td>

                      <td>{user?.name}</td>

                      <td>{user?.role}</td>
                      <td>
                        {" "}
                        <Link to={`/admin/user/${user._id}`}>
                          <EditIcon />
                        </Link>
                        <Button onClick={() => dispatch(deleteUser(user._id))}>
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
