import React from 'react';
import RouterWrap from "./Router";
import GlobalStyles from "./css/GlobalStyles"
// import RouterWrap from "./Router";

function App() {
  return (
    <div className="wrapper">
        <RouterWrap/>   
        <GlobalStyles/>
    </div>
  )
}

export default App;
