import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Inventory from "../inventory/Index";

const AdminPageTabs = () => {
  return (
    <div className="container">
      <Tabs
        defaultActiveKey="Inventory"
        transition={true}
        id="noanim-tab-example"
        className="mb-3 "
      >
        <Tab eventKey="Dashboard" title="Dashboard">
          <div className="row">
            <div className="col-12 coming_soon text-center p-5">
              <h2 className="py-5">Coming soon</h2>
            </div>
          </div>
        </Tab>
        <Tab eventKey="Inventory" title="Inventory">
          <Inventory />
        </Tab>
        <Tab eventKey="Sales" title="Sales">
          <div className="row">
            <div className="col-12 coming_soon text-center p-5">
              <h2 className="py-5">Coming soon</h2>
            </div>
          </div>
        </Tab>
        <Tab eventKey="Customers" title="Customers">
          <div className="row">
            <div className="col-12 coming_soon text-center p-5">
              <h2 className="py-5">Coming soon</h2>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminPageTabs;
