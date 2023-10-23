import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Context from "../Context";

function Profile() {
  const { user, setUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          {user.user_books
            ? user.user_books.map((book) => {
                return <li key={book.id}>{book.title}</li>;
              })
            : ""}
        </div>
      ) : (
        "Ocurrió un error"
      )}
    </div>
  );
}

export default Profile;
