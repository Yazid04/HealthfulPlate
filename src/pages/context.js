import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_EDAMAM_APIKEY;
  const APP_ID = process.env.REACT_APP_EDAMAM_APPID;
  const [query, setQuery] = useState("pasta");
  const [addedFilters, setAddedFilters] = useState([[], []]);
  const [dataState, setDataState] = useState({
    isLoading: false,
    error: { hasError: false, msg: "" },
    data: null,
  });
  const BASE_URL = "https://api.edamam.com/api/recipes/v2?type=public&";
  const BaseUrlWithIds = `${BASE_URL}q=${query.length < 1 ? 'pizza' : query}&app_id=${APP_ID}&app_key=${API_KEY}`
  const SEARCH_ENDPOINT = `${BaseUrlWithIds}${addedFilters[0].length < 1 ? "" : addedFilters[0].map(diet => `&diet=${diet}`).join("")}${addedFilters[1].length < 1 ? "" : addedFilters[1].map(health => `&health=${health}`).join("")}`
 
  /*const SEARCH_ENDPOINT = `${BASE_URL}q=${query}&app_id=${APP_ID}&app_key=${API_KEY}
  //${addedFilters.diets.length < 1 ? "": `${addedFilters.diets.map((diet) => "&" + diet)}`}
  //${addedFilters.allergies.length < 1? "": `${addedFilters.allergies.map((allergy) => "&health=" + allergy)}`}`;


  const SEARCH_ENDPOINT = `${BASE_URL}q=${query}&app_id=${APP_ID}&app_key=${API_KEY}
  ${addedFilters.length < 1 ? "" : addedFilters.map(filter => `&health=${filter}`).join("")}`;
*/


  const searchRecipes = useCallback(async () => {
    setDataState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    try {
      const response = await axios.get(SEARCH_ENDPOINT);
      setDataState((prevState) => ({
        ...prevState,
        data: response.data,
      }));
    } catch (e) {
      console.log(e);
      setDataState((prevState) => ({
        ...prevState,
        error: { hasError: true, msg: e },
      }));
    } finally {
      setDataState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, [SEARCH_ENDPOINT]);

  useEffect(() => {
    searchRecipes();
  }, [query, searchRecipes]);


  //console.log(addedFilters);

  return (
    <AppContext.Provider
      value={{
        dataState,
        setQuery,
        setAddedFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
