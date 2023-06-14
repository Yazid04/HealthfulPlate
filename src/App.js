import React from "react";
import "./styles/styles.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/homepage/Home.jsx";
import { SearchPage } from "./pages/searchpage/SearchPage.jsx";
import Error from "./pages/errorPage/Error";
import RecipePage from "./pages/singleRecipe/RecipePage";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="/Search/:id" element={<RecipePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;