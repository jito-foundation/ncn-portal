import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const HomeHeadLine = () => {
  return (
    <div className="headline_container ">
      <div className="headline_md">
        <Container>
          <Row>
            <Col xs={12} md={5}>
              <div className="headline_right_md">
                <h1 className="headline">Some Headline</h1>
                <p className="headline_prg1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae a quia distinctio corporis vitae molestias expedita
                  iste est sint asperiores. Iste quasi tempora maxime! Aut
                  maxime consequatur qui? Similique, dolore!
                </p>
                <p className="headline_prg1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae a quia distinctio corporis vitae molestias expedita
                  iste est sint asperiores. Iste quasi tempora maxime! Aut
                  maxime consequatur qui? Similique, dolore!
                </p>
              </div>
            </Col>
            <Col xs={6} md={7}>
              <img
                className="headline_img"
                src="https://cdn2.howtostartanllc.com/images/business-ideas/business-idea-images/watch.jpg"
                alt="..."
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomeHeadLine;
