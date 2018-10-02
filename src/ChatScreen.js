//@flow

import React, { Component } from "react";
import styled, { css } from "styled-components";
import { messages } from "./messages.js";
import ChatScreenFooter from "./ChatScreenFooter";
import phone from "./images/phone.svg";
import arrow from "./images/arrow-left2.svg";
import video from "./images/video-camera.svg";
// import "./chatscreen.css";
// import

const StyledChatScreen = styled.div`
  background-color: #ece5dd;
  position: absolute;
  top: 0;
  z-index: 1;
  /* box-shadow: 0px 0px 50px lightgrey; */
  /* transform: scale(0);
  opacity: 0;
  transition: opacity 0.1s linear;
  ${props =>
    props.chatScreenPosition === "1" &&
    css`
      transform: none;
      opacity: 1;
    `}; */
`;

const ChatScreenHeader = styled.div`
  display: flex;
  color: white;
  z-index: 1;
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

const StyledChatMessage = styled.div`
  display: flex;
  justify-content: ${props =>
    props.status === "incoming" ? "flex-start" : "flex-end"};
  

  span {
    background-color: ${props =>
      props.status === "incoming" ? "#fff" : "#dcf8c6"};
    margin-top: 7px;
    max-width: 75%;
    border-radius: ${props =>
      props.status === "incoming" ? "0px 3px 3px 3px" : "3px 0px 3px 3px"};
    padding: 5px;
    span {
      padding: 0px;
      color: #858B90;
      float: right;
      font-size: .8em;
    }
  }
    /* max-width: -moz-fit-content; */
    /* max-width: -webkit-fit-content; */
  }
`;

const ArrowLeft = styled.div`
  position: relative;
  top: 7px;
  width: 0;
  height: 0;
  border-top: 0px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 15px solid #fff;
`;

const ArrowRight = styled.div`
  position: relative;
  top: 7px;
  width: 0;
  height: 0;
  border-top: 0px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 15px solid #dcf8c6;
`;

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
  padding-top: 60px;
  padding-bottom: 50px;
  padding-right: 5px;
  padding-left: 5px;
`;

const ChatMessage = ({ status, phrase1 }) => {
  return (
    <StyledChatMessage status={status}>
      {status === "incoming" && <ArrowLeft />}
      <span>
        {phrase1}
        <span>25:34</span>
      </span>
      {status === "outgoing" && <ArrowRight />}
    </StyledChatMessage>
  );
};

type State = {
  messages: Array<string>
};

type Props = {
  chatScreenPosition: string,
  closeChatScreen: Function
};
class ChatScreen extends Component<Props, State> {
  myRef = React.createRef();
  chatRef = React.createRef();
  inputRef = React.createRef();
  state = {
    messages: []
  };

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
    this.forceUpdate();
  }
  render() {
    return (
      <StyledChatScreen
        className="chatscreen"
        ref={this.myRef}
        // chatScreenPosition={this.props.chatScreenPosition}
      >
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
            <span>pete</span>
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
        <ChatContent ref={this.chatRef} className="element">
          {/* < onClick={this.handleScroll}>scroll down</button> */}
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
