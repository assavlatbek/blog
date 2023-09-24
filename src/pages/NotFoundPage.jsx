import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container">
      Page not Found <Link to={"/"}>Back Home</Link>
    </div>
  );
}

export default NotFoundPage;
