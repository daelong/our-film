// app/api/users/route.js

import { ourFilmFirestore } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const userCollection = collection(ourFilmFirestore, "user");
    const userSnapshot = await getDocs(userCollection);
    const users = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("users", users);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to fetch users", error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
