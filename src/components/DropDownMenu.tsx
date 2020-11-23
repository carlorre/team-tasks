import React, { FormEvent, useState, Dispatch, SetStateAction, useRef } from 'react';
import { firestore } from "../firebase";
import firebase from 'firebase/app'
import { StyledDropDownContainer, StyledDropDownNav, StyledDropDownButton } from "./DropDownMenu.styled";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";
interface Props {
  setHideComplete: Dispatch<SetStateAction<boolean>>,
  hideComplete: boolean,
  list: any,
}

const DropDownMenu:React.FC<Props> = ({setHideComplete, hideComplete, list, }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const taskRef = firestore.collection("tasks");
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    taskRef.doc(list.id).update({
      sharedWith: firebase.firestore.FieldValue.arrayUnion(email),
    });
    setEmail("");
  };

  const handleDelete = () => {
    
    if (window.confirm('Are you sure you want to delete this list?')) {
      taskRef.doc(list.id).delete();
    }
    return
  };

  return (
    <StyledDropDownContainer>
      <StyledDropDownButton onClick={() => setIsActive(!isActive)}><i className="fas fa-cog"></i></StyledDropDownButton>
      <StyledDropDownNav ref={dropdownRef} active={isActive}>
        <ul>
          <li>
            <button onClick={() => setHideComplete(!hideComplete)}><i className="fas fa-eye-slash"></i></button>
          </li>
          <li>

        <form onSubmit={handleSubmit} style={{display: "flex"}}>
          <input
            placeholder="valid email adress"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            />
          <button type='submit'><i className="fas fa-user-friends"></i></button>
        </form>
      </li>
      <li>
      <button onClick={handleDelete}>Delete</button>
      </li>
        </ul>
        </StyledDropDownNav>
    </StyledDropDownContainer>
  );
}

export default DropDownMenu;
