import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
 import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from './components/Chat'


function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
               <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
// import React, { useState } from 'react';
// import Picker from 'emoji-picker-react';

// const App = () => {
//   const [chosenEmoji, setChosenEmoji] = useState(null);

//   const onEmojiClick = (event, emojiObject) => {
//     setChosenEmoji(emojiObject);
//   };

//   return (
//     <div>
//       {chosenEmoji ? (
//         <span>You chose: {chosenEmoji.emoji}</span>
//       ) : (
//         <span>No emoji Chosen</span>
//       )}
//       <Picker onEmojiClick={onEmojiClick} />
//     </div>
//   );
// };
// import Emoji from "react-emoji-render";

// <Emoji text="This ❤️ sentence includes :+1: a variety of emoji types :)" />;

// // or as a child
// <Emoji>
//   This ❤️ sentence includes :+1: a variety of emoji types :)
// <Emoji/>
// export default App;
// import EmojiPicker from 'emoji-picker-react';

// function App() {
//   return (
//     <div>
//       <EmojiPicker />
//     </div>
//   );
// }
//  export default App;