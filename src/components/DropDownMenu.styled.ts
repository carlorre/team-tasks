import styled from 'styled-components'

export const StyledDropDownContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  active: boolean
}

export const StyledDropDownNav = styled.nav`
  background: #ffffff;
  border-radius: 10px;
  padding: 10px;
  position: absolute;
  top: 30px;
  right: 5px;
  width: 200px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
 
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

  visibility: ${(props: Props) => props.active ? 'visible' : 'hidden'};
  opacity: ${(props: Props) => props.active ? 1 : 0};
`;

export const StyledDropDownButton = styled.button`
    background: #ffffff;
  border-radius: 90px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  margin-left: auto; /* Strictly for positioning */
`;