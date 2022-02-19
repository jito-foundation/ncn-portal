import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../../../Config/FirebaseConfig";
import { useHistory } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";

const Inventorytable = () => {
  const history = useHistory();
  const db = firebase.database();
  const itemSelector = useSelector((state) => {
    return state.watchReducer.items;
  });

  const handleDelete = (id) => {
    db.ref(`Items/${id}`).remove();
  };

  const handleEdit = (id) => {
    history.push("/dashboard/" + id);
  };

  return (
    <div>
      <Table className="inventor_table" striped bordered hover>
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Seller Email</th>
            <th>Seller Number</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            <th>Reference #</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemSelector.map((item) => (
            <tr key={item.key}>
              <td>
                {item.inputValues.firstName} {item.inputValues.lastName}
              </td>
              <td>{item.inputValues.email}</td>
              <td>{item.inputValues.number}</td>
              <td>{item.inputValues.brand}</td>
              <td>{item.inputValues.model}</td>
              <td>{item.inputValues.price}</td>
              <td>{item.inputValues.reference}</td>
              <td>
                <button
                  className="icBtn"
                  onClick={() => handleDelete(item.key)}
                >
                  <MdDeleteForever />
                </button>
                <button className="icBtn" onClick={() => handleEdit(item.key)}>
                  <AiOutlineEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Inventorytable;
