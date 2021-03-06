import React, { FormEvent, useState } from "react";
import { firestore } from "../../firebase";
import { v4 as uuid } from "uuid";
import { StyledForm, StyledButton, StyledInput } from "./CreateList.styled";

interface Props {
  user: any;
}

const CreateList: React.FC<Props> = ({ user }) => {
  const [list, setList] = useState("");
  const taskRef = firestore.collection("tasks");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (list === "") return;
    let id = uuid();
    setList("");
    await taskRef.doc(id).set({
      title: list,
      owner: user.uid,
      sharedWith: [],
      tasks: [],
      id,
    });
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Create a new list"
          value={list}
          onChange={(e) => setList(e.target.value)}
        />
        <StyledButton type="submit">
          <i className="fas fa-plus-circle"></i>
        </StyledButton>
      </StyledForm>
    </div>
  );
};

export default CreateList;
