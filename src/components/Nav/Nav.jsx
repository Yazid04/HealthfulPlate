import React, { useState, useId, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [links, setLinks] = useState([
    {
      id: useId(),
      name: "Home",
      icon: null,
      linkAddress: "",
      clicked: true,
    },
    {
      id: useId(),
      name: "Services",
      icon: null,
      linkAddress: "Services",
      clicked: false,
    },
    {
      id: useId(),
      name: "Contact us",
      icon: false,
      linkAddress: "Contact",
      clicked: false,
    },
    {
      id: useId(),
      name: "Search",
      icon: <AiOutlineSearch />,
      linkAddress: "Search",
      clicked: false,
    },
  ]);

  const handleBtnsChange = (id) => {
    setLinks((prevState) => {
      const newObj = prevState.map((btn) => {
        if (btn.id === id) return { ...btn, clicked: true };
        else return { ...btn, clicked: false };
      });
      return newObj;
    });
  };

  const handleScrollBarToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isNavOpen) {
        setIsNavOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavOpen]);

  return (
    <>
      <section className={`nav-wrapper`}>
        <div className="nav-wrapper-center">
          <h1 className="header">
            <Link to={`/`}> <span>Healthful</span>plate</Link>
          </h1>
          <div
            className="hamburger-icon"
            onClick={() => handleScrollBarToggle()}
          >
            <GiHamburgerMenu />
          </div>
          <div className="links">
            {links.map((link) => {
              if (link.name === "Search") {
                return (
                  <div key={link.id} type="button" href="#" className="link">
                    <Link to={`/${link.linkAddress}`}>{link.icon}</Link>
                  </div>
                );
              } else {
                return (
                  <button key={link.id} type="button" href="#" className="link">
                    <Link to={`/${link.linkAddress}`}>{link.name}</Link>
                  </button>
                );
              }
            })}
          </div>
        </div>
      </section>
      <div
        className={`mobile-links ${isNavOpen ? "show-links" : "hide-links"}`}
      >
        <ul className={`links`}>
          {links.map((link) => {
            const { id, icon, name, clicked, linkAddress } = link;
            return (
              <Link key={id} to={`/${linkAddress}`}>
                <li
                  className={`${clicked ? "btn-clicked" : ""}`}
                  onClick={() => handleBtnsChange(id)}
                >
                  <button
                    type="button"
                    href="#"
                    className={`link ${name === "Search" ? "search" : ""}`}
                  >
                    {name !== "Search" ? (
                      name
                    ) : (
                      <div className="search-icon">{icon}</div>
                    )}
                    {icon && <p>{name}</p>}
                  </button>
                </li>
              </Link>
            );
          })}
          <div className="close-btn" onClick={() => setIsNavOpen(false)}>
            <span className="close-icon">X</span>
          </div>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
