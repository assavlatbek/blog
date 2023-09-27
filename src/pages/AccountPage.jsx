import React, { useContext, useEffect, useState } from "react";
import { TOKEN } from "../constant";
import Cookies from "js-cookie";
import request from "../server/index";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [changedData, setChangedData] = useState({});

  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/login");
  };

  const getInfo = async () => {
    try {
      const res = await request("auth/me");
      setData(res.data);
      setChangedData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await request.put("auth/details", changedData);
      toast.success("Successfull changed");
    } catch (error) {
      toast.error("Invalid");
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="container">
      <h1 className="form-title">Account</h1>
      <form className="form" onSubmit={submit}>
        <input
          type="text"
          onChange={(e) => {
            setChangedData({ ...data, [e.target.name]: e.target.value });
          }}
          value={changedData.first_name}
          name="first_name"
          placeholder="Firstname"
          className="form-input"
        />
        <input
          type="text"
          onChange={(e) => {
            setChangedData({ ...data, [e.target.name]: e.target.value });
          }}
          value={changedData.last_name}
          name="last_name"
          placeholder="Lastname"
          className="form-input"
        />
        <input
          type="text"
          onChange={(e) => {
            setChangedData({ ...data, [e.target.name]: e.target.value });
          }}
          value={changedData.username}
          name="username"
          placeholder="Username"
          className="form-input"
        />
        <button className="btn-yellow">Update</button>
      </form>
      <center style={{ margin: "20px 0" }}>
        <button className="btn-white" onClick={logout}>
          Log out
        </button>
      </center>
    </div>
  );
}

export default AccountPage;
