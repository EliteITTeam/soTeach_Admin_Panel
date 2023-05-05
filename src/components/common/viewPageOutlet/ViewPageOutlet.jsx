import React from "react";
import "./ViewPageOutlet.scss";
import Container from "../../container/Container";
import Grid from "../../grid/Grid";

import { BiSearch } from "react-icons/bi";

const ViewPageOutlet = (props) => {
  return (
    <>
      <div className="viewpage">
        <div className={`viewpage-hero ${props.className}`}>
          <div>
            <Container className="main">
              <Container className="half">
                <div className="center viewpage-hero-content ">
                  <h1 className="uppercase">{props.title}</h1>
                  <p>{props.summery}</p>
                </div>
              </Container>
            </Container>
          </div>
        </div>
        <div className="m-6">
          <Container className="main">
            <Container className="lg">
              <div
                className="align-item-right"
                style={{ marginBottom: "6rem" }}
              >
                <div className="searchbar">
                  <input type="text" placeholder="Browser" />
                  <div className="searchbar-icon">
                    <BiSearch />
                  </div>
                </div>
              </div>
              <Grid className="grid-4">{props.children}</Grid>
            </Container>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ViewPageOutlet;
