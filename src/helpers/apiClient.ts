import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ApiPaths } from "../constants/paths";

const baseURL = process.env.API_BASE_URL;

const httpClient = axios.create({
  baseURL: baseURL,
});
const mock = new MockAdapter(httpClient, { delayResponse: 1000 });

type ApiClient = {
  post: <T, D>(url: string, data?: D) => Promise<T>;
};

const apiClient: ApiClient = {
  post: async <T, D>(url: string, data?: D) => {
    const response = await httpClient.post<T>(url, data);
    return response.data;
  },
};

mock.onPost(ApiPaths.AddCard).reply(
  () =>
    new Promise((resolve, reject) => {
      const random = Math.random();
      if (random > 0.4) {
        resolve([200, { code: 200, message: "Your card has been added" }]);
      } else if (random > 0.1) {
        reject({ code: 400, message: "Bad request" });
      } else {
        reject({ code: 500, message: "Internal server error" });
      }
    })
);

export default apiClient;
