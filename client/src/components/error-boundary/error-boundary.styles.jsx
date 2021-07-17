import styled from "styled-components";

export const ErrorImageOverlay = styled.div`
  height: 60vh;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: rgba(63, 98, 142, 1);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow-y: none;
  z-index: -1;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const ErrorImageTitle = styled.h2`
  font-size: 28px;
`;

export const ErrorImageText = styled.h3`
  font-size: 18px;
`;
