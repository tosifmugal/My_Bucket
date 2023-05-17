import React, { Fragment, useEffect } from "react";

import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <div className="border shadow">
            <table className="productListTable">
              <thead>
                <tr>
                  <th scope="col"> ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">stock</th>
                  <th scope="col"> Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {products?.map((item, i) => {
                return (
                  <tbody>
                    <tr>
                      <td>{item?._id}</td>

                      <td>{item?.name}</td>
                      <td>{item?.Stock}</td>

                      <td>{item?.price}</td>
                      <td>
                        {" "}
                        <Link to={`/admin/product/${item._id}`}>
                          <EditIcon />
                        </Link>
                        <Button
                          onClick={() => dispatch(deleteProduct(item._id))}
                        >
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

export default ProductList;
