import React from "react";
import styled from "styled-components";

export function Dropdown(props) {
    return (
        <DropdownWrapper action={props.action}>
            <StyledSelect id="services" name="services">
                {props.children}
            </StyledSelect>
        </DropdownWrapper>
    );
}

export function Option(props) {
    return (
        <StyledOption selected={props.selected}>
            {props.value}
        </StyledOption>
    );
}



export const DropdownWrapper = styled.form`
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const StyledSelect = styled.select`
  max-width: 75%;
  height: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

export const StyledOption = styled.option`
  color: ${(props) => (props.selected ? "lightgrey" : "black")};
`;

