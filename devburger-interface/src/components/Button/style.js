import styled from 'styled-components';

export const ContainerButton = styled.button`
  width: 100%;
  height: 52px;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.purple};
  font-family: 'Road Rage', sans-serif;
  font-size: 30px;
  color: #fff;

  &:hover {
    background-color: #6f357c;
    border: 1px dashed #fff;
  }
`;
