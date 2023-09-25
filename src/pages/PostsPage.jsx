import { useEffect, useState } from "react";
import request from "../server";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Number of items to display per page

  async function getPosts(page) {
    try {
      setLoading(true);
      const res = await request.get(`post?page=${page}&limit=${itemsPerPage}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  const maxPage = Math.ceil(totalPost / itemsPerPage);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(`post?search=${e.target.value}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found bro");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <section>
      <div className="container">
        <br />
        <br />
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="section-title">All posts ({totalPost})</h1>
        </div>
        <hr />
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : posts.length ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <h3 className="err-not-found">Not Found</h3>
        )}
        {posts.length ? (
          <div className="pagination-buttons">
            <button
              className={
                currentPage === 1
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={prevPageFunc}
            >
              {"<"}
            </button>
            {Array.from({ length: maxPage }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? "pagination-button active-page"
                    : "pagination-button"
                }
              >
                {index + 1}
              </button>
            ))}
            <button
              className={
                currentPage === maxPage
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={nextPageFunc}
            >
              {">"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PostsPage;
