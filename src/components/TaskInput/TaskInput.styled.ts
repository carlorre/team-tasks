import styled from "styled-components";

export const StyledInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const StyledForm = styled.form`
  display: flex;
  box-shadow: 0 0 1px grey;
  padding: 4px;
  background-color: white;
  border-radius: 10px;
  width: 60%;
`;

export const StyledInput = styled.input`
  font-size: 0.8rem;
  padding: 0 5px;
  flex-grow: 2;
  border: none;
  &:focus {
    outline: none
  }
`;

export const StyledButton = styled.button`
  border: none;
  background-color: white;
  font-size: 1.1rem;
  cursor: pointer;
  color: #9bb8cc;
  &:hover {
    color: dimgray;
  }
`;
