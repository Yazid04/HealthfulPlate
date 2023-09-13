import React, { useState } from "react";
import NavBar from "../../components/Nav/Nav";
import { AiOutlineSearch } from "react-icons/ai";
import { useGlobalContext } from "../context";
import Loading from "../../shared/Loading";
import Error from "../../shared/Error";
import NotFound from "../../shared/NotFound";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export const SearchPage = () => {
  const { dataState, setQuery } = useGlobalContext();
  const { data, error, isLoading } = dataState;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  function extractIdFromString(inputString) {
    const indexOfUnderscore = inputString.lastIndexOf("_");
    if (indexOfUnderscore !== -1) {
      return inputString.slice(indexOfUnderscore + 1);
    } else {
      return null; // Return null if no underscore is found
    }
  }

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    // continue here  
  };

  return (
    <>
      <NavBar />
      <section className="search-wrapper">
        <main className="search-input-parent">
          <div className="center">
            <div className="searchBar-center">
              <input
                type="search"
                className="input"
                placeholder="type a query to search"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
              />
              <div
                className="icon-wrapper"
                onClick={(e) => handleQuerySubmit(e)}
              >
                <AiOutlineSearch className="search-icon" />
              </div>
            </div>
          </div>
        </main>
        <>
        {isLoading ? (
          <Loading />
        ) : error.hasError ? (
          <Error />
        ) : data?.hits.length < 1 ? (
          <NotFound />
        ) : (
         <main className="search-results-parent">
            {data?.hits?.map((item) => {
              const { image, healthLabels, label, uri } = item.recipe;
              const id = extractIdFromString(uri);
              return (
                <div key={id} className="recipe-parent">
                  <Link to={`/Search/${id}`}>
                    <div className="sub-recipe img">
                      <img src={image} alt="name" />
                    </div>
                    <div className="sub-recipe info">
                      <div className="recipe-name">
                        <h3 className="recipe-name">{label}</h3>
                      </div>
                      <div className="recipe-info">
                        <p>
                          {healthLabels?.map((label, idx) => {
                            return idx < 10 ? (
                              <span className="label" key={label}>
                                • {label}{" "}
                              </span>
                            ) : (
                              ""
                            );
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </main>
        )}
        </>
      </section>
      <Footer />
    </>
  );
};
