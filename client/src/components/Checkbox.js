import React from 'react'
import styled from 'styled-components'

const Checkbox = ({ className, checked, ...props }) => (
    <CheckboxContainer className={className}>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
            <Icon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </Icon>
        </StyledCheckbox>
    </CheckboxContainer>
)

export default Checkbox;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding: 1em 1em 0.5em 0;
`

const Icon = styled.svg`
  fill: none;
  stroke: #1B3D4A;
  stroke-width: 2px;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.5px;
  width: 0.5px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #1B3D4A;
  background: transparent;
  border-radius: 50%;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`