
import React from 'react';

function App() {
  const user = localStorage.getItem('user') || 'Quang';
  return (
    <div>
      <h1>Chào mừng {user} đến với App học từ vựng!</h1>
      <ul>
        <li>📘 Học từ</li>
        <li>🎴 Flashcard</li>
        <li>❓ Quiz</li>
        <li>💬 Luyện hội thoại</li>
      </ul>
    </div>
  );
}

export default App;
