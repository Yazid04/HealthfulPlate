import React from "react";
import "./styles/styles.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/homepage/Home.jsx";
import { SearchPage } from "./pages/searchpage/SearchPage.jsx";
import Error from "./pages/errorPage/Error";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;

/*
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
*/
