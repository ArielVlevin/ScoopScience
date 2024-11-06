import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const apiUrl = "http://127.0.0.1:3000/api"; //"https://api.scoopscience.com/api";
const api = axios.create({
  baseURL: apiUrl,
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
