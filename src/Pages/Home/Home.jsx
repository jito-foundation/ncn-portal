import React from "react";
import SubNavbar from "../../Components/Navbar/SubNavbar";
import ProfileHeader from "../../Components/ProfileHeader/ProfileHeader";
import HomeHeadLine from "./HomeHeadLine";
import "./Home.css";
import WatchCard from "../../Components/Card/Card";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { useSelector } from "react-redux";

const Home = () => {

  const itemSelector = useSelector((state)=>{
    return state.watchReducer.items
  })

  return (
    <div>
      <ProfileHeader />
      <SubNavbar />
      <HomeHeadLine />
      {/* <div className="watch_card_container"> */}
      <Container>
        <Row className="flex-wrap">
          {itemSelector.length ? itemSelector.map((items) => (
            <Col className="px-1" xs={6} sm={6} md={4} lg={3} key={items.key} >
              <WatchCard data={items} />
            </Col>
          )) :   null }
        </Row>
        <Row>
          <div className="homeSignUps">
            <Col>
              <div className="leftHead">
                <h1>Some Heading</h1>
              </div>
            </Col>
            <Col>
              <div className="rightBtn">
                <Link className="link_btn" to="/signup">
                  Sign up
                </Link>
              </div>
            </Col>
          </div>
        </Row>
      </Container>
    <Footer />
      {/* </div> */}
    </div>
  );
};

export default Home;
