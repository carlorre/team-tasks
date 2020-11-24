import styled from "styled-components";

interface Props {
  hideComplete: boolean,
  taskComplete: boolean
}

export const StyledTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
   display: ${(props:Props) => props.hideComplete && props.taskComplete ? "none" : "flex"};
  &:hover {
    box-shadow: 0 0 2px grey;
  }
`;

export const StyledTaskTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
 
`;

export const StyledTaskLeft = styled.div`
  display: flex;
  align-items: center;
  overflow-wrap: anywhere;

`;

export const StyledTaskText = styled.p`
  margin-left: 10px;
`;

export const StyledTaskRight = styled.div`
  margin-left: 10px;
  display: flex;
`;

interface DateProps {
  showCalendar: boolean
}

export const StyledDateInput = styled.input`
  padding: 3px;
  margin: 3px;
  margin-right: 10px;
  border-radius: 5px;
  width: 140px;
  display: ${(props: DateProps) => !props.showCalendar ? "none" : "flex"};
`;

export const StyledTaskBottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;


