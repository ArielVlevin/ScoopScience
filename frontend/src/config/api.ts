import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
