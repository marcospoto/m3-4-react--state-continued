import React from "react";

import data from "../data";
import Typeahead from "./Typeahead";

import GlobalStyles from "./GlobalStyles";

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <Typeahead
        suggestions={data.books}
        handleSelect={(suggestion) => {
          window.alert(suggestion);
        }}
      />
    </>
  );
};

export default App;
