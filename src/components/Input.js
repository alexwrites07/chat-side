import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import klklkl from "../img/klklkl.png";
import mnb from "../img/ert.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
// import { EditorState, convertToRaw } from "draft-js";
// import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
// // import Editor from "draft-js-plugins-editor";


// import {emailData, projects} from './mentions';
import "@draft-js-plugins/mention/lib/plugin.css";

import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import JoditEditor from "jodit-react";
import JoditEditor from 'jodit-pro-react';
// import Jodit from "jodit-react";
import { useRef } from "react"
import Picker from 'emoji-picker-react';
// import { Jodit } from 'jodit-pro-react';
const Input = () => {
  // const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [showPicker, setShowPicker] = useState(false);
 
  const onEmojiClick = (event, emojiObject) => {
    setContent(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
//   const [content, setContent] = useState('');

//   const config = useMemo(
//       {
//           readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//         //   placeholder: placeholder || 'Start typings...'
//       },
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                content,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          content,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        content,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        content,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setContent('');
    setImg(null);
  };
//   const editor = Jodit.make('#editor', {
// 	emoji: {
// 		data: () =>
// 			fetch('https://some.com/emoji.json').then((res) => res.json())
// 	}
// });



 

  return (
    <div className="input">
     
      
    <JoditEditor
			ref={editor}
          
             value={content}
             onChange={setContent}
        />
           
           
            

   
      <div className="send">
      <img
          className="emoji-icon"
          src={klklkl}
          
          onClick={() => setShowPicker(val => !val)} />
        {showPicker && <Picker
          pickerStyle={{ width: '100%' }}
          onEmojiClick={onEmojiClick} />}
        <img src={Attach} alt="" />
        
        <input
                 type="file"
                 onChange={(e) => setImg(e.target.files[0])}
                 style={{ display: "none" }}
                 id="file"
                 
        />
      
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <img src = {mnb} alt =""/>
        <button onClick={handleSend}>Send</button>
        
	
     
      
           </div>
    </div>

    )};


export default Input;
