// app/api/users/route.js

import { ourFilmFirestore } from "@/app/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

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

export async function POST(request: any) {
  try {
    // 요청에서 JSON 데이터 가져오기
    const body = await request.json();
    const { name } = body;
    // Firestore에서 'users' 컬렉션에 문서 추가
    const userCollection = collection(ourFilmFirestore, "user");
    const docRef = await addDoc(userCollection, {
      name,
      createdAt: new Date(), // 생성 시간 추가
    });

    // 성공적으로 추가되면 응답
    return new Response(
      JSON.stringify({ message: "User added", id: docRef.id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return new Response(
      JSON.stringify({ message: "Error adding user", error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
