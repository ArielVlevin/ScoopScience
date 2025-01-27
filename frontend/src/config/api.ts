import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl)
  throw new Error("VITE_API_URL is not defined in the environment variables.");

const api = axios.create({
  baseURL: `${apiUrl}/api`,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    //const { logout } = useAuth();
    //const navigate = useNavigate();
    if (error.response?.status === 401) {
      console.error("Unauthorized access - maybe token expired.");
      // await logout();
      //  navigate("/auth");
    }
    return Promise.reject(error);
  }
);

export default api;
