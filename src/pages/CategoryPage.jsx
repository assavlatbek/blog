import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server";
import PostCard from "../components/PostCard";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await request.get(`post`);
      const filteredPosts = await res.data.data.filter(
        (post) => post.category.name === category
      );
      setFilteredData(filteredPosts);
    } catch (error) {
      toast.error("server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(`post?search=${e.target.value}`);
      setFilteredData(res.data.data);
    } catch (error) {
      toast.error("Not Found bro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="category-sec-header">
        <div className="category-sec-header-content">
          <h1 className="header-title">{category}</h1>
          <p className="header-descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, amet.
            Necessitatibus ea optio esse, voluptates nobis veniam cumque culpa!
            Voluptatum nihil impedit.
          </p>
          <h3 className="header-camb">
            Blog {">"} {category}
          </h3>
        </div>
      </div>
      <div className="container cat-posts">
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : filteredData.length ? (
          filteredData.map((post, i) => <PostCard key={i} post={post} />)
        ) : (
          <h3 className="err-not-found">Not Found</h3>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
