import "./App.css";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import Context from "./Context";
import Home from "./views/Home";

function App() {
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    const data = localStorage.getItem("email");
    if (data) setUsuario({ email: data });
  }, []);

  return (
    <ChakraProvider>
      <Context.Provider value={{ usuario, setUsuario }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </ChakraProvider>
  );
}

export default App;
