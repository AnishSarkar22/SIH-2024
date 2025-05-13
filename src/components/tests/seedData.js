// seedData.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  try {
    // Create test users
    const users = [
      {
        id: "mentor1",
        name: "John Mentor",
        type: "mentor",
      },
      {
        id: "mentee1",
        name: "Alice Student",
        type: "mentee",
      },
    ];

    // Add users
    for (const user of users) {
      await setDoc(doc(db, "users", user.id), {
        name: user.name,
        type: user.type,
      });
    }

    // Create a chat
    const chatId = "chat1";
    await setDoc(doc(db, "chats", chatId), {
      last_message: {
        content: "Hello, when can we start?",
        timestamp: serverTimestamp(),
      },
    });

    // Create a session
    await addDoc(collection(db, "sessions"), {
      mentor_id: "mentor1",
      mentee_id: "mentee1",
      chat_id: chatId,
      status: "booked",
      created_at: serverTimestamp(),
    });

    console.log("Test data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Run the seeding
seedDatabase();

async function verifySeededData() {
  try {
    // Check users
    const usersSnapshot = await getDocs(collection(db, "users"));
    console.log("\n=== Users ===");
    usersSnapshot.forEach((doc) => {
      console.log(`ID: ${doc.id}`, doc.data());
    });

    // Check chat
    const chatDoc = await getDoc(doc(db, "chats", "chat1"));
    console.log("\n=== Chat ===");
    console.log("ID: chat1", chatDoc.data());

    // Check sessions
    const sessionsSnapshot = await getDocs(collection(db, "sessions"));
    console.log("\n=== Sessions ===");
    sessionsSnapshot.forEach((doc) => {
      console.log(`ID: ${doc.id}`, doc.data());
    });
  } catch (error) {
    console.error("Error verifying data:", error);
  }
}

// Modify the end of the file
async function main() {
  await seedDatabase();
  await verifySeededData();
}

main();
