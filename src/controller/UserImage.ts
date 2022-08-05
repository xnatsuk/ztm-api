import { Request, Response } from "express";
import axios from "axios";

export async function handleApiCall(request: Request, response: Response) {
  const API_URL = "https://api.clarifai.com/v2/models/face-detection/outputs";
  const USER_ID = process.env.USER_ID;
  const PAT = process.env.PAT;
  const APP_ID = process.env.APP_ID;

  const imageUrl: string = request.body.imageUrl;

  axios.defaults.headers.common["Authorization"] = `Key ${PAT}`;

  return await axios
    .post(API_URL, {
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [{ data: { image: { url: imageUrl } } }],
    })
    .then((output) => response.status(200).json(output.data))
    .catch(() =>
      response.status(400).json({ message: "Error during Clarifai API call" })
    );
}
