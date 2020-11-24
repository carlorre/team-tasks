import styled from 'styled-components'

export const StyledDropDownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(65, 65, 65);
`;

interface Props {
  active: boolean
}

export const StyledDropDownNav = styled.nav`
  background-color: white;
  border-radius: 10px;
  padding: 0 10px;
  position: absolute;
  top: 28px;
  right: 0px;
  width: 200px;
  box-shadow: 0 1px 10px lightgray;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  visibility: ${(props: Props) => props.active ? 'visible' : 'hidden'};
  opacity: ${(props: Props) => props.active ? 1 : 0};
`;

export const StyledDropDownButton = styled.button`
  color: rgb(65, 65, 65);
  background: white;
  cursor: pointer;
  display: flex;
  border: none;
  font-size: 1.3rem;
`;

export const StyledListRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export const StyledToolBarButtons = styled.button`
  color: rgb(65, 65, 65);
  border: none;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
  &:focus {
    outline: none
  }
`;

export const StyledButtonContainer = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  margin-left: 10px;
`;

export const StyledEmailInput = styled.input`
  padding: 4px;
  width: 100%;
  border-radius: 5px;
`;

