import { Suspense } from "react";
import Loading from "../components/Loading";
import BookList from "../components/BookList";
import { useSearchParams } from "react-router-dom";

const Books = ({ advanced = false }) => {
  const [params] = useSearchParams();
  const search = params.get("search");
  const title = params.get("title");
  const author = params.get("author");
  const category = params.get("category");
  const dateMin = params.get("dateMin");
  const dateMax = params.get("dateMax");
  const pageMin = params.get("pageMin");
  const pageMax = params.get("pageMax");
  const filters = {
    title,
    author,
    category,
    dateMin,
    dateMax,
    pageMin,
    pageMax,
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BookList search={search} filters={filters} advanced={advanced} />
      </Suspense>
    </div>
  );
};

export default Books;
