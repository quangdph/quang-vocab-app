
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "fake-auth-domain.firebaseapp.com",
  projectId: "quang-app",
  storageBucket: "fake-bucket",
  messagingSenderId: "fake-msg",
  appId: "fake-app-id"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const ALLOWED_USERS = ['quangdph@gmail.com'];

function App() {
  const [user, setUser] = useState(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setAllowed(ALLOWED_USERS.includes(u.email));
      } else {
        setUser(null);
        setAllowed(false);
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  if (!user) {
    return <button onClick={handleLogin}>Đăng nhập bằng Google</button>;
  }

  if (!allowed) {
    return (
      <div>
        <p>Xin lỗi, bạn không có quyền truy cập app này.</p>
        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Chào {user.displayName}!</h1>
      <p>Bạn đã đăng nhập với quyền admin.</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
