import { Suspense, useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import Loading from "./Loading";
import { getBooks, getBooksAdvanced } from "../utils";
import BookCard from "./BookCard";

const BookList = ({ search, filters, advanced }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (advanced) {
      getBooksAdvanced(filters)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => console.log(error));
    } else
      getBooks(search)
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => console.log(error));
  }, [search, filters, advanced]);

  return (
    <div>
      <Container maxW="900px">
        {books.map((book) => {
          return (
            <Suspense fallback={<Loading />} key={book.id}>
              <BookCard book={book} />
            </Suspense>
          );
        })}
      </Container>
    </div>
  );
};

export default BookList;
