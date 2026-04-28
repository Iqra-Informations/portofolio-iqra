import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: MASUKKAN KONFIGURASI FIREBASE ANDA DI SINI
const firebaseConfig = {
  apiKey: "API_KEY_ANDA",
  authDomain: "DOMAIN_ANDA.firebaseapp.com",
  projectId: "ID_PROYEK_ANDA",
  storageBucket: "BUCKET_ANDA.appspot.com",
  messagingSenderId: "SENDER_ID_ANDA",
  appId: "APP_ID_ANDA"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

function renderMessages(docs) {
    chatMessages.innerHTML = ''; 
    
    if (docs.length === 0) {
        chatMessages.innerHTML = '<p class="text-sm text-slate-500 text-center mt-10">Ruang chat masih kosong. Sapa saya!</p>';
        return;
    }

    docs.forEach(doc => {
        const data = doc.data();
        const text = data.text || '';
        const user = data.user || 'Guest';
        
        const msgDiv = document.createElement('div');
        // Styling bubble chat disesuaikan untuk dark mode
        msgDiv.className = 'text-sm bg-white/10 border border-white/5 p-3 rounded-xl w-fit max-w-[90%] text-slate-200';
        msgDiv.innerHTML = `<span class="font-bold text-blue-400 mr-2">${user}</span> ${text}`;
        
        chatMessages.appendChild(msgDiv);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const q = query(collection(db, "chats"), orderBy("createdAt", "asc"));
onSnapshot(q, (snapshot) => {
    renderMessages(snapshot.docs);
});

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = ''; 

    try {
        await addDoc(collection(db, "chats"), {
            text: text,
            user: "Guest",
            createdAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error: ", error);
        alert("Gagal mengirim. Cek aturan Firestore Anda.");
    }
});