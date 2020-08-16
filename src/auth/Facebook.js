import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const Facebook = ({ informParent = (f) => f }) => {
  const responseFacebook = (response) => {
    console.log(response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken },
    })
      .then((response) => {
        console.log("FACEBOOK LOGIN SUCCESS", response);
        informParent(response);
      })
      .catch((error) => {
        console.log("FACEBOOK LOGIN ERROR", error.response);
      });
  };
  return (
    <div className="pb-3">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-primary btn-block lg">
            <i className="fa fa-facebook" ></i> Login with Facebook</button>
        )}
      />
    </div>
  );
};

export default Facebook;
