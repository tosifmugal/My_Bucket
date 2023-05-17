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
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />

        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <div className="border shadow">
            <table className="productListTable">
              <thead>
                <tr>
                  <th scope="col"> ID</th>
                  <th scope="col">status</th>
                  <th scope="col">items Qty</th>
                  <th scope="col"> Amount</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {orders?.map((item, i) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item?._id}</td>
                      <td>{item?.orderStatus}</td>

                      <td>{item?.orderItems?.length}</td>

                      <td>{item?.totalPrice}</td>
                      <td>
                        {" "}
                        <Link to={`/admin/order/${item._id}`}>
                          <EditIcon />
                        </Link>
                        <Button onClick={() => dispatch(deleteOrder(item._id))}>
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

export default OrderList;
