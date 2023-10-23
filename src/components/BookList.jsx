import { Suspense, useState, useEffect } from "react";
import Loading from "./Loading";
import { getBooks } from "../utils";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Libros</h1>
      {books.map((book) => {
        return (
          <Suspense fallback={<Loading />} key={book.id}>
            <p>{book.title}</p>
          </Suspense>
        );
      })}
    </div>
  );
};

export default BookList;
