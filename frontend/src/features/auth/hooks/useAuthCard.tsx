import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function useAuthCard() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("register");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    setError(null); // Reset error state
    try {
      if (activeTab === "register") {
        await register(formData.username, formData.email, formData.password);
        console.log(formData.username, " registered successfully");
        navigate("/");
      }
    } catch (err) {
      setError(
        "Failed to authenticate. Please check your credentials and try again."
      );
    }
  };

  return {
    formData,
    activeTab,
    error,
    setActiveTab,
    handleInputChange,
    handleSubmit,
  };
}
