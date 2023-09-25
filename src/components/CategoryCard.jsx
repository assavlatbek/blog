import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const CategoryCard = ({ el }) => {
  return (
    <div className="category">
      <Link to={`/category/${el.name}`}>
        <LazyLoadImage
          width={"100%"}
          height={"300px"}
          effect="blur"
          style={{ objectFit: "cover" }}
          src={
            el.photo
              ? `https://blog-backend-production-a0a8.up.railway.app/upload/${
                  el.photo._id
                }.${el.photo.name.slice(-3)}`
              : "https://savlatbek-coder.netlify.app/images/me.jpg"
          }
        />
      </Link>
      <div className="category-body">
        <h3 className="category-title">{el.name}</h3>
        <h3 className="post-descr">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cum ad
          culpa officia.
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;
