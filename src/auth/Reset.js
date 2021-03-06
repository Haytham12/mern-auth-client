import React, { useState, useEffect } from "react";
import jwt from 'jsonwebtoken'
import Layout from "../core/layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Reset = ({match}) => {
    //props.match from react router dom
  const [values, setValues] = useState({
    name: "",
    token: '',
    newPassword: '',
    buttonText: "Reset Password",
  });
  useEffect(() => {
      let token = match.params.token
      let {name} = jwt.decode(token)
      if(token){
          setValues({...values, name, token})
      }
  }, [])
  const { name, token, newPassword, buttonText } = values;
  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message)
        setValues({...values, buttonText: 'Password Reseted!'})
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        setValues({ ...values, buttonText: "Reset Password" });
        toast.error(error.response.data.error);
      });
  };
  const resetPasswordForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          className="form-control"
          required
        />
      </div>
      
      <button className="btn btn-primary btn-sm" onClick={clickSubmit}>
        {buttonText}
      </button>
    </form>
  );
  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Hey {name} Type new password</h1>
        {resetPasswordForm()}
      </div>
    </Layout>
  );
};

export default Reset;
