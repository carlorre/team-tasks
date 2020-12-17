import React, {
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { firestore } from "../../firebase";
import firebase from "firebase/app";
import {
  StyledDropDownContainer,
  StyledDropDownNav,
  StyledDropDownButton,
  StyledListRow,
  StyledToolBarButtons,
  StyledButtonContainer,
  StyledEmailInput,
} from "./DropDownMenu.styled";
import { useDetectOutsideClick } from "../../hooks/useDetectOutsideClick";
import { StyledDeleteButton } from "../SharedStyles";
import { IList } from "../../types/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

interface Props {
  setHideComplete: Dispatch<SetStateAction<boolean>>;
  hideComplete: boolean;
  list: IList;
}

const DropDownMenu: React.FC<Props> = ({
  setHideComplete,
  hideComplete,
  list,
}) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const taskRef = firestore.collection("tasks");
  const [emailToShare, setEmailToShare] = useState("");
  const email = useAuthState(auth)[0].email;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emailToShare === email) return;
    taskRef.doc(list.id).update({
      sharedWith: firebase.firestore.FieldValue.arrayUnion(emailToShare),
    });
    setEmailToShare("");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      taskRef.doc(list.id).delete();
    }
    return;
  };

  return (
    <StyledDropDownContainer>
      <StyledDropDownButton onClick={() => setIsActive(!isActive)}>
        <i className="fas fa-cog"></i>
      </StyledDropDownButton>
      <StyledDropDownNav ref={dropdownRef} active={isActive}>
        <ul>
          <StyledListRow>
            <p>Delete List</p>
            <StyledButtonContainer>
              <StyledDeleteButton onClick={handleDelete}>
                <i className="far fa-trash-alt"></i>
              </StyledDeleteButton>
            </StyledButtonContainer>
          </StyledListRow>

          <StyledListRow>
            {hideComplete ? <p>Show Completed</p> : <p>Hide Completed</p>}
            <StyledButtonContainer>
              <StyledToolBarButtons
                onClick={() => setHideComplete(!hideComplete)}
              >
                {hideComplete ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </StyledToolBarButtons>
            </StyledButtonContainer>
          </StyledListRow>

          <StyledListRow>
            <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <StyledEmailInput
                placeholder="Share by email"
                value={emailToShare}
                type="email"
                onChange={(e) => setEmailToShare(e.target.value)}
              />
              <StyledButtonContainer>
                <StyledToolBarButtons type="submit">
                  <i className="fas fa-user-friends"></i>
                </StyledToolBarButtons>
              </StyledButtonContainer>
            </form>
          </StyledListRow>

          <StyledListRow></StyledListRow>
        </ul>
      </StyledDropDownNav>
    </StyledDropDownContainer>
  );
};

export default DropDownMenu;
