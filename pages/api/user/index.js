import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (session) {
    if (request.method === "GET") {
      const user = await User.findOne({ email: session.user.email });
      console.log("BACKEND: ", user);
      if (user === null) {
        response.status(404).json({ status: "no user found" });
      } else {
        response.status(200).json(user);
      }
    }

    if (request.method === "POST") {
      try {
        const userData = request.body;
        console.log(userData);
        const user = new User(userData);
        await user.save();
        return response.status(201).json({ status: "User created!" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: error.message });
      }
    }

    if (request.method === "PUT") {
      try {
        const userData = request.body;
        await User.findOneAndUpdate({ email: session.user.email }, userData);
        response.status(201).json({ status: "User updated!" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: error.message });
      }
    }

    if (request.method === "DELETE") {
      try {
        await User.findOneAndDelete({ email: session.user.email });
        response.status(200).json({ status: "User deleted!" });
      } catch (error) {
        console.log(error);
        response.status(400).json({ message: error.message });
      }
    }
  }
}
