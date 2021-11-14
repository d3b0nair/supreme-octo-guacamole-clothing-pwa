import styled from "styled-components";

export const MenuItemContainer = styled.div`
  height: ${({ size }) => (size ? "380px" : "240px")};
  min-width: 30%;
  overflow: hidden;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 7.5px 15px;
  overflow: hidden;
  border: 6px solid rgba(255, 255, 255, 1);
  box-shadow: 1px -6px 20px 0px rgb(171 106 250 / 68%), 0 5px 15px #f9b1ba91;
  &:hover {
    cursor: pointer;
    & .background-image {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
  }
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    height: 250px;
    margin: 0 7.5px 20px;
  }
`;

MenuItemContainer.displayName = "MenuItemContainer";

export const BackgroundImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
`;

BackgroundImageContainer.displayName = "BackgroundImageContainer";

export const ContentContainer = styled.div`
  height: 6em;
  width: 9em;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(255, 255, 255, 1);
  position: absolute;
  backdrop-filter: blur(3px);
  border-radius: 10px;
  span {
    font-weight: bold;
    color: transparent;
    background-image: linear-gradient(
      90deg,
      #ff6e7f 0%,
      #ff6e7f 50%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 100%
    );
    background-repeat: repeat;
    background-size: 200%;
    background-position: 100% 0;
    -webkit-background-clip: text;
    background-clip: text;
    transition: background-position 300ms;
  }
  &:hover span {
    background-position: 0 0;

    &::before {
      transform-origin: 0 0;
      transform: scale3d(1, 1, 1);
    }
  }
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.25);
    transition: transform 0.6s cubic-bezier(0.25, 0.45, 0.45, 0.95),
      background 1s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }
  @media screen and (max-width: 800px) {
    width: 50%;
  }
  @media screen and (max-width: 300px) {
    width: 60%;
    &:hover {
    transform: scale(1.10);
  }
  }
`;

export const ContentTitle = styled.span`
  margin-bottom: 6px;
  font-size: 22px;
  font-weight: 700;
  @media screen and (max-width: 800px) {
    font-size: 28px;
  }
`;

export const ContentSubtitle = styled.span`
  font-size: 16px;

  @media screen and (max-width: 800px) {
    font-size: 20px;
  }
`;
