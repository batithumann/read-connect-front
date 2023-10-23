import { Suspense } from "react";
import Loading from "../components/Loading";
import BookList from "../components/BookList";
import { useSearchParams } from "react-router-dom";

const Books = () => {
  const [params] = useSearchParams();
  const search = params.get("search");

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BookList search={search} />
      </Suspense>
    </div>
  );
};

export default Books;
