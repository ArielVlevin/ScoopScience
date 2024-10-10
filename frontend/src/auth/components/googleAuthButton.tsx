import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { googleLogin } from "../services/login";

const GoogleAuthButton = () => {
  async function handleLogin(response: CredentialResponse) {
    if (response.credential) {
      const res = await googleLogin(response.credential);
      alert("Login successful");
      return res;
    } else {
      alert("Login failed");
    }
  }
  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const res = handleLogin(response);
      //const data = await res.json();
      console.log("Login success:", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginFailure = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="124765056070-m15sh763v83ukaf0vo3rn1gllps06e7p.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;
