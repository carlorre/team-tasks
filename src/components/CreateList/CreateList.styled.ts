import styled from 'styled-components'

export const StyledForm = styled.form`
  display: flex;
  margin-top: 40px;
  box-shadow: 0 0 1px grey;
  padding: 4px;
  background-color: white;
  border-radius: 10px;
  width: 90vw;
  max-width: 300px;
`;

export const StyledInput = styled.input`
  font-size: 0.9rem;
  padding: 5px;
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
