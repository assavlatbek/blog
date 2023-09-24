import React, { useEffect, useState } from "react";

import request from "../server";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Cookies from "js-cookie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { TOKEN } from "../constant/";

function HomePage() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [heroBg, setHeroBg] = useState("");

  async function getData() {
    try {
      const res = await request.get("post/lastone");
      setData([res.data]);
      setHeroBg(
        `https://blog-backend-production-a0a8.up.railway.app/upload/${res.data.photo._id}.png`
      );
    } catch (error) {
      toast.error("Server Error");
    }
  }

  async function getPosts() {
    const headers = {
      Cookie: `Cookie_1=value; TOKEN=${Cookies.get(TOKEN)}`,
      "Cache-Control": `no-cache`,
      "Postman-Token": `<calculated when request is sent>`,
    };
    try {
      const res = await request.get("post/lastones", { headers });
      setPosts(res.data);
    } catch (error) {
      toast.error("Server Error");
    }
  }

  useEffect(() => {
    getData();
    getPosts();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero">
          <div className="container">
            {data.map((el) => (
              <>
                <p className="hero-category">
                  Posted on <b>{el.category.name}</b>
                </p>
                <h1 className="hero-title">
                  {el.category.name}, {el.category.description.slice(0, 36)}.
                </h1>
                <p className="hero-detail">
                  By{" "}
                  <span className="text-yellow">
                    {el.user.first_name} {el.user.last_name}
                  </span>{" "}
                  |{" "}
                  {new Date(el.category.updatedAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p className="hero-descr">{el.category.description}</p>

                <button className="btn btn-yellow">Read More {">"}</button>
              </>
            ))}
          </div>
        </div>
      </section>
      <section className="popular-posts container">
        <h1 className="section-title">Most Popular</h1>
        <Carousel
          itemClass="container"
          responsive={responsive}
          swipeable={false}
          draggable={false}
          showDots={false}
          ssr={false}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={200}
          keyBoardControl={true}
        >
          {posts.map((post) => (
            <div className="popular-posts">
              <LazyLoadImage
                width={"100%"}
                height={"318px"}
                style={{ objectFit: "cover" }}
                effect="blur"
                src={
                  post.photo
                    ? `https://blog-backend-production-a0a8.up.railway.app/upload/${
                        post.photo._id
                      }.${post.photo.name.slice(-3)}`
                    : "https://savlatbek-coder.netlify.app/images/me.jpg"
                }
              />
              <p className="hero-detail my-2">
                By{" "}
                <span className="text-yellow">
                  {post.user.first_name} {post.user.last_name}
                </span>{" "}
                |{" "}
                {new Date(
                  post.category
                    ? post.category.updatedAt
                    : "2009-07-11T00:00:00.000Z"
                ).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h1 className="post-title">
                {post.category ? post.category.name : "Coding"},{" "}
                {post.category
                  ? post.category.description.slice(0, 36)
                  : "Lorem ipsum dolor sit amet consectetur ad"}
              </h1>
              <p className="post-descr">
                {post.category
                  ? post.category.description
                  : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}
              </p>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
}

export default HomePage;
