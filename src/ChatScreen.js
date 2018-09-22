//@flow

import React, { Component } from "react";
import styled, { css } from "styled-components";
import { messages } from "./messages.js";
import phone from "./images/phone.svg";
import arrow from "./images/arrow-left2.svg";
import video from "./images/video-camera.svg";
import camera from "./images/camera-grey.svg";
import attachment from "./images/attachment.svg";
import happy from "./images/happy.svg";
import mic from "./images/mic.svg";

const StyledChatScreen = styled.div`
  background-color: #ece5dd;
  position: absolute;
  top: 0;
  z-index: 1;
  transform: scale(0);
  opacity: 0;
  transition: opacity 0.1s linear;
  ${props =>
    props.chatScreenPosition === "1" &&
    css`
      transform: none;
      opacity: 1;
    `};
`;

const ChatScreenHeader = styled.div`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  background: #075e54;
  position: fixed;
  height: 60px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
`;

const ChatScreenHeaderLeft = styled.div`
  flex-basis: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:first-child {
    padding-left: 10px;
    img {
      width: 20px;
    }
  }
  a:nth-child(2) {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  a:nth-child(3) {
    color: white;
    text-decoration: none;
  }
`;

const ChatScreenHeaderRight = styled.div`
  display: flex;
  flex-basis: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a img {
    height: 20px;
  }
`;

const OutgoingChatMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  span {
    max-width: 75%;
    margin-top: 7px;
    background: #dcf8c6;
    /* padding: 3px; */
    border-radius: 3px;
    /* max-width: -moz-fit-content; */
    /* max-width: -webkit-fit-content; */
  }
`;

const IncomingChatMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  span {
    margin-top: 7px;
    max-width: 75%;
    padding: 3px;
    border-radius: 3px;
    background: #fff;
    /* max-width: -moz-fit-content; */
    /* max-width: -webkit-fit-content; */
  }
`;

const StyledChatScreenFooter = styled.footer`
  background: #ece5dd;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  max-width: 450px;
  padding: 5px;
`;

const InputGroup = styled.form`
  flex: 0 1 80%;
  /* background-color: lightblue; */
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* align-content: center; */
  span {
    flex-basis: 14%;
    /* align-self: center; */
    /* flex-grow: 1; */
    /* flex-basis: 12%; */
    /* padding-top: 10px; */
    /* padding-bottom: 10px; */
    /* padding: 10px; */
    background-color: white;
    height: 40px;
    text-align: center;
    img { 
      margin-top: 10px;
      height: 20px; 
    }
    &:first-child {
    border-radius: 50% 0% 0% 50%;
    }
    &:last-child {
      border-radius: 0% 50% 50% 0%;
    }
    
  }
  input {
    /* https://stackoverflow.com/questions/46684636/html-inputs-ignore-flex-basis-css-property */
    flex-basis: 58%;
    min-width: 0
    appearance:none
    height: 40px;
    border: 0px;
    background-color: #fff;
    font-size: 1em;
    }
  }
`;

const RecordIcon = styled.div`
  flex: 0 1 20%;
  /* background-color: blue; */
  div {
    height: 50px;
    width: 50px;
    background-color: #075e54;
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 20px;
    }
  }
`;

const ChatScreenFooter = props => {
  return (
    <StyledChatScreenFooter>
      <InputGroup onSubmit={e => console.log(e.preventDefault())}>
        <span>
          <img src={happy} alt="" />
        </span>
        <input type="text" />
        <span>
          <img src={attachment} alt="" />
        </span>
        <span>
          <img src={camera} alt="" />
        </span>
      </InputGroup>
      <RecordIcon>
        {/* // conditionally render submit button */}
        <div>
          <img src={mic} alt="" />
        </div>
      </RecordIcon>
    </StyledChatScreenFooter>
  );
};

const SettingsIcon = styled.div`
  /* flex-basis: 10%; */
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  span {
    align-self: flex-end;
    width: 4px;
    height: 4px;
    margin: 1px;
    background: #fff;
    border-radius: 50%;
    display: block;
  }
`;

const ChatContent = styled.div`
  /* color: red; */
`;

const ChatMessage = props => {
  if (props.status === "outgoing") {
    return (
      <OutgoingChatMessage>
        <span>{props.phrase1}</span>
      </OutgoingChatMessage>
    );
  } else {
    return (
      <IncomingChatMessage>
        <span>{props.phrase1}</span>
      </IncomingChatMessage>
    );
  }
};

type State = {
  messages: Array<string>
};

type Props = {
  chatScreenPosition: string,
  closeChatScreen: Function
};

export class ChatScreen extends Component<Props, State> {
  state = {
    messages: []
  };
  componentDidMount() {
    this.setState({ messages: ["hello there"] });
  }
  render() {
    return (
      <StyledChatScreen chatScreenPosition={this.props.chatScreenPosition}>
        <ChatScreenHeader>
          <ChatScreenHeaderLeft>
            <a onClick={this.props.closeChatScreen}>
              <img src={arrow} alt="arrow left icon" />
            </a>
            <a>
              <img
                src="https://s3.amazonaws.com/uifaces/faces/twitter/gauchomatt/128.jpg"
                alt="user avatar"
              />
            </a>
            <a href="">pete</a>
          </ChatScreenHeaderLeft>
          <ChatScreenHeaderRight>
            <a>
              <img src={video} alt="phone icon" />
            </a>
            <a>
              <img src={phone} alt="phone icon" />
            </a>

            <SettingsIcon>
              <span />
              <span />
              <span />
            </SettingsIcon>
          </ChatScreenHeaderRight>
        </ChatScreenHeader>
        <ChatContent className="element">
          {messages.map(item => (
            <ChatMessage key={item.id} {...item} />
          ))}
        </ChatContent>
        <ChatScreenFooter />
      </StyledChatScreen>
    );
  }
}

export default ChatScreen;
