import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineCloudOff } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

const Error = () => {
  return (
    <article className="error-page-wrapper">
      <main className="page-center">
        <h1 className="header">Opps, it's a dead end :(</h1>
        {<MdOutlineCloudOff className="icon" />}
        <div>
          <Link className="icons" to={"/"}>
            Back to Home Page
            <BsArrowRight />
          </Link>
        </div>
      </main>
    </article>
  );
};

export default Error;
