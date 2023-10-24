import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";

function Profile() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      {user && (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          {user.user_books
            ? user.user_books.map((book) => {
                return <li key={book.id}>{book.title}</li>;
              })
            : ""}
        </div>
      )}
    </div>
  );
}

export default Profile;
