import "./App.css";

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider, theme } from "@chakra-ui/react";

import Navigation from "./components/Navigation";
import Context from "./Context";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Register from "./views/Register";
import Books from "./views/Books";
import Search from "./views/Search";
import BookDetails from "./views/BookDetails";

function App() {
  const [user, setUser] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Context.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/search" element={<Books advanced={true} />} />
            <Route path="/books/details/:book_id" element={<BookDetails />} />
            <Route path="/search" element={<Search />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </ChakraProvider>
  );
}

export default App;
