import { useEffect, useState } from "react";
import request from "../server";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [errorImages, setErrorImages] = useState({});

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };
  const redirectToBlog = (id) => {
    window.location.href = "blog/" + id;
  };

  async function getPosts() {
    try {
      const res = await request.get(`post`);
      setPosts(res.data.data);
    } catch (error) {
      toast.error("Server error");
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <div className="container">
        <br />
        <br />
        <input type="search" placeholder="Search" className="post-search" />
        <h1 className="section-title">All posts</h1>
        <hr />
        <br />
        {posts.map((post) => (
          <div className="post" key={post._id}>
            <div className="post-header">
              <LazyLoadImage
                effect="blur"
                onClick={() => redirectToBlog(post._id)}
                style={{ objectFit: "cover", cursor: "pointer" }}
                onError={() => handleImageError(post._id)}
                src={
                  errorImages[post._id]
                    ? "https://savlatbek-coder.netlify.app/images/me.jpg"
                    : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                        post.photo._id
                      }.${post.photo.name.slice(-3)}`
                }
              />
            </div>
            <div className="post-body">
              <p className="hero-category">
                {post.category ? post.category.name : "Coding"}
              </p>
              <h1 className="post-title">
                {post.category ? post.category.name : "Coding"},{" "}
                {post.category !== null
                  ? post.category.description.slice(0, 76)
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit nulla adipisci corporis."}
              </h1>
              <p className="post-descr">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostsPage;
