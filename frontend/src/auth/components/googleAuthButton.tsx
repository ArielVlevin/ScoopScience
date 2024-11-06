import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const GoogleAuthButton = () => {
  const navigate = useNavigate();
  const { loginGoogle } = useAuth();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      await loginGoogle(response.credential as string);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginFailure = () => {
    alert("Google Login failed! try again");
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
