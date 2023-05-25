import React from "react";
import { GoLocation } from "react-icons/go";
import { IoIosCall } from "react-icons/io";
import {
  AiOutlineMail,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  const gmailHref = "mailto:yazidramadan04@gmail.com";
  return (
    <section className="footer-wrapper">
      <main className="footer-center">
        <div className="footer-sub contact-info">
          <div className="info">
            <div className="icon">
              <GoLocation />
            </div>
            <div>
              <p>
                ciapus street{" "}
                <div className="city-country">Bogor, Indonesia</div>
              </p>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <IoIosCall />
            </div>
            <div>
              <p>+6281325885795</p>
            </div>
          </div>
          <div className="info">
            <div className="icon">
              <AiOutlineMail />
            </div>
            <div>
              <a href={gmailHref}>Yazidramadan04@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="footer-sub about-info">
          <div className="about">About the company</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            deleniti libero hic necessitatibus consequatur eligendi?
          </p>
          <div className="icons">
            <div>
              <AiFillFacebook className="icon" />
            </div>
            <div>
              <AiFillTwitterSquare className="icon" />
            </div>
            <div>
              <AiFillLinkedin className="icon" />
            </div>
            <div>
              <FaGithubSquare className="icon" />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Footer;
