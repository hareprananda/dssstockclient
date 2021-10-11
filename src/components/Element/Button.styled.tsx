import styled from "styled-components";

interface Props {
  padding?: string;
}

const Button = styled.button<Props>`
  padding: ${({ padding }) => padding || "7px 10px"};
  display: flex;
  border-radius: 10px;
  align-items: center;
  &:active {
    opacity: 0.7;
  }
`;

export default Button;
