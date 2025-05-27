import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDIRpFQLtAABJDrKUJjfANRwSiyk8tKv1U",
  authDomain: "qr-code-c43a9.firebaseapp.com",
  projectId: "qr-code-c43a9",
  storageBucket: "qr-code-c43a9.appspot.com", // ✅ Fixed
  messagingSenderId: "425866313992",
  appId: "1:425866313992:web:2995237e96685a1aea6cbd",
  measurementId: "G-091Q858390"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add another link
document.getElementById("addLink").onclick = () => {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "link";
  input.placeholder = "Enter link...";
  document.getElementById("linkInputs").appendChild(input);
};

// Handle form submit
document.getElementById("linkForm").onsubmit = async (e) => {
  e.preventDefault();

  const links = Array.from(document.querySelectorAll(".link"))
    .map(input => input.value.trim())
    .filter(link => link !== "");

  if (links.length === 0) {
    alert("Please enter at least one link.");
    return;
  }

  const id = Date.now().toString();

  try {
    await setDoc(doc(db, "qrLinks", id), { links });
    const qrData = `${location.origin}/preview.html?id=${id}`;
    generateQRCode(qrData);
  } catch (error) {
    console.error("Error saving to Firebase:", error);
    alert("Failed to save links. Check console.");
  }
};

// Generate QR
function generateQRCode(text) {
  const qrDiv = document.getElementById("qrPreview");
  qrDiv.innerHTML = "";
  new QRCode(qrDiv, {
    text: text,
    width: 256,
    height: 256
  });
}
