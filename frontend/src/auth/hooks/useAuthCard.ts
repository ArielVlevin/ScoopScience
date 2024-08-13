import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import { USERNAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "@/utils/regex";

export function useAuthCard() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("register");

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    setErrors({});
    let foundError = false;
    if (activeTab === "register" && !USERNAME_REGEX.test(formData.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username:
          "Username must be at least 4 characters long and can only contain letters, numbers, and underscores.",
      }));
      foundError = true;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      foundError = true;
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 6 characters long and include at least one number and one special character.",
      }));
      foundError = true;
    }
    if (foundError) return;

    try {
      if (activeTab === "register") {
        //register
        await register(formData.username, formData.email, formData.password);
        navigate("/");
      } else {
        //login
        await login(formData.email, formData.password);
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };

  return {
    formData,
    activeTab,
    errors,
    setActiveTab,
    handleInputChange,
    handleSubmit,
  };
}
