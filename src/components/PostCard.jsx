import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function PostCard({ post }) {
  const [errorImages, setErrorImages] = useState({});

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };
  const redirectToBlog = (id) => {
    window.location.href = "/blog/" + id;
  };

  return (
    <div className="post" key={post._id}>
      <div className="post-header">
        <LazyLoadImage
          effect="blur"
          onClick={() => redirectToBlog(post._id)}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
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
        <h1 className="post-title">{post.title}.</h1>
        <p className="post-descr">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident.
        </p>
      </div>
    </div>
  );
}

export default PostCard;
