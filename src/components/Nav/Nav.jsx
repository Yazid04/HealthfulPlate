import React, { useState, useId } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
//import './_navStyles.scss';

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const links = [
    {
      id: useId(),
      name: "Home",
      icon: false,
    },
    {
      id: useId(),
      name: "Services",
      icon: false,
    },
    {
      id: useId(),
      name: "Contact us",
      icon: false,
    },
    {
      id: useId(),
      name: "Search",
      icon: <AiOutlineSearch />,
    },
  ];



  return (
    <>
      <section className={`nav-wrapper`}>
        <div className="nav-wrapper-center">
          <h1 className="header">
            <span>Healthful</span>plate
          </h1>
          <div className="hamburger-icon" onClick={() => setIsNavOpen((prev) => !prev)}>
            <GiHamburgerMenu />
          </div>
          <div className="links">
            <button type="button" href="#" className="link">
              Home
            </button>
            <button type="button" href="#" className="link">
              services
            </button>
            <button type="button" href="#" className="link">
              contact us
            </button>
            <div type="button" href="#" className="link">
              <AiOutlineSearch />
            </div>
          </div>
        </div>
      </section>
      <div className={`mobile-links ${isNavOpen ? 'show-links' : 'hide-links'}`}>
        <ul className={`links`}>
          {links.map((link) => {
            const { id, icon, name } = link;
            return (
              <li key={id}>
                <button type="button" href="#" className={`link ${name === 'Search' ? 'search' : ''}`}>
                  {name !== 'Search' ? name : (
                    <div className="search-icon">{icon}</div>
                  )}
                  {icon && (
                    <p>{name}</p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};



export default NavBar;
