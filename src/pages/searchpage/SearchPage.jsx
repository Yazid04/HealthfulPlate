import React, { useState, useRef } from "react";
import NavBar from "../../components/Nav/Nav";
import { AiOutlineSearch, AiFillPlusCircle, AiOutlineCheck } from "react-icons/ai";
import { BsArrowDownCircle } from "react-icons/bs";
import { useGlobalContext } from "../context";
import Loading from "../../shared/Loading";
import Error from "../../shared/Error";
import NotFound from "../../shared/NotFound";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export const SearchPage = () => {
  const { dataState, setQuery } = useGlobalContext();
  const { data, error, isLoading } = dataState;
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const filtersParentRef = useRef(null);
  let addedFilters = [[], []];
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState([
    {
      id: "1",
      title: "Diets", // diet
      list: [
        { id: "101", name: "balanced", checked: false },
        { id: "102", name: "high-fiber", checked: false },
        { id: "103", name: "high-protein", checked: false },
        { id: "104", name: "low-carb", checked: false },
        { id: "105", name: "low-fat", checked: false },
        { id: "106", name: "low-sodium", checked: false },
      ],
    },
    {
      id: "2",
      title: "Health", // health
      list: [
        { id: "201", name: "alcohol-free", checked: false },
        { id: "202", name: "celery-free", checked: false },
        { id: "203", name: "crustacean-free", checked: false },
        { id: "204", name: "dairy-free", checked: false },
        { id: "205", name: "egg-free", checked: false },
        { id: "206", name: "fish-free", checked: false },
        { id: "207", name: "Gluten-free", checked: false },
        { id: "208", name: "keto-friendly", checked: false },
        { id: "209", name: "kidney-friendly", checked: false },
        { id: "210", name: "kosher", checked: false },
        { id: "211", name: "low-potassium", checked: false },
        { id: "212", name: "low-sugar", checked: false },
        { id: "213", name: "no-oil-added", checked: false },
        { id: "214", name: "peanut-free", checked: false },
        { id: "215", name: "pescatarian", checked: false },
        { id: "216", name: "pork-free", checked: false },
        { id: "217", name: "red-meat-free", checked: false },
        { id: "218", name: "sugra-consciuos", checked: false },
        { id: "219", name: "vegan", checked: false },
        { id: "220", name: "vegetarian", checked: false },
        { id: "221", name: "wheat-free", checked: false },
      ],
    },
  ]);

  const handleToggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleButtonClick = (buttonId) => {
    const updatedFilters = filters.map((filter) => {
      const updatedList = filter.list.map((item) => {
        if (item.id === buttonId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return { ...filter, list: updatedList };
    });
    setFilters(updatedFilters);
  };

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


  function checkAndModifyArray(word, array, type) {

    if(type === 'Diets'){
    // Get the index of the element
    const index = array[0].findIndex(item => item === word);

      // Create a new array based on the previous state
      const newArr = [...array[0]];
  
      // Check if the element already exists
      if (index !== -1) {
        newArr.splice(index, 1); // Remove the element from the array
      } else {
        newArr.push(word); // Add the element to the array
      }
      // Return the modified array as the new state
      return addedFilters[0] =  [...newArr];
    } else if(type === 'Health'){
      const index = array[1].findIndex(item => item === word);
  
      // Create a new array based on the previous state
      const newArr = [...array[1]];
  
      // Check if the element already exists
      if (index !== -1) {
        newArr.splice(index, 1); // Remove the element from the array
      } else {
        newArr.push(word); // Add the element to the array
      }
      return addedFilters[1] =  [...newArr];
    }
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
            <div className="add-filter-btn">
              <button className="filter-btn" onClick={handleToggleFilters}>
                Filter By <BsArrowDownCircle />{" "}
              </button>
            </div>
          </div>
          <div className={`filter-options ${isFiltersOpen ? "open-filters" : ""}`} ref={filtersParentRef}
          >
            {filters.map((filter) => {
              const { id, title, list } = filter;
              return (
                <div key={id} className={`filters`}>
                  <h2>{title}</h2>
                  <div className="single-filter-type">
                    {list.map((item) => {
                      const { id, checked, name } = item;
                      return (
                        <div
                          key={id}
                          className={`filter ${checked ? "checked" : ""}`}
                          onClick={() => [handleButtonClick(id), checkAndModifyArray(name, addedFilters, title)]}
                          >
                          {checked ? (
                            <AiOutlineCheck className="add-filter-icon" />
                          ) : (
                            <AiFillPlusCircle className="add-filter-icon" />
                          )}
                          <button>{name}</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
