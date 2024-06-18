import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import twilio from "twilio";
dotenv.config({ path: ".env" });
import { notFoundError, errorHundler } from "./middlewares/error-handler.js";
const app = express();
const port = process.env.PORT || 9090;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(notFoundError);
app.use(errorHundler);

async function sendSMS() {
  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  return client.messages
    .create({
      body: "Hey this is a message",
      to: "+21627711622",
      from: "+12098502984",
    })
    .then((message) => console.log(message, "Message sent"))
    .catch((err) => {
      console.log(err, "Message NOT sent");
    });
}
sendSMS();
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
