import React, { Fragment, useEffect } from "react";

import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction.js";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  // const url = `/order/${orders.orderItems._id}`;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <div>
            <h1 id="myOrdersHeading">All Orders</h1>

            <div className="border shadow">
              <table className="myOrdersTable ">
                <thead className="new">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Status</th>
                    <th scope="col">Items Qty</th>
                    <th scope="col"> Amount</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                {orders?.map((o, i) => {
                  return (
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?._id}</td>
                        <td>{o?.orderStatus}</td>
                        <td>{o?.orderItems.length}</td>

                        <td>{o?.totalPrice}</td>
                        <td>
                          {" "}
                          <Link to={"/order"}>
                            <LaunchIcon />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
