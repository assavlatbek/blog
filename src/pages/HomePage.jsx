import React, { useEffect, useState } from "react";

import request from "../server";

function HomePage() {
  const [data, setData] = useState([]);
  const [heroBg, setHeroBg] = useState("");

  async function getData() {
    try {
      const res = await request.get("post/lastone");
      setData([res.data]);
      setHeroBg(
        `https://blog-backend-production-a0a8.up.railway.app/upload/${res.data.photo._id}.png`
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

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
    </>
  );
}

export default HomePage;
