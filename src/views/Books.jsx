import { Suspense } from "react";
import Loading from "../components/Loading";
import BookList from "../components/BookList";

const Books = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BookList />
      </Suspense>
    </div>
  );
};

export default Books;
