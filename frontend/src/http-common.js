import axios from "axios";

export default axios.create({
  //baseURL: "https://eu-west-1.aws.data.mongodb-api.com/app/application-0-rutpd/endpoint/",
  baseURL:"http://localhost:5050/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});