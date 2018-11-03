//@flow

import React from "react";
import { injectGlobal } from "styled-components";
import styled from "styled-components";
import HeaderNav from "./HeaderNav";
import HeaderTop from "./HeaderTop";
import MainCarousel from "./MainCarousel";
import ChatScreen from "./ChatScreen";

injectGlobal`
   *, *:before, *:after {
    box-sizing: border-box;
  }
   body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background-color: #f1f1f2;
   }
`;

const StyledApp = styled.div`
  max-width: 450px;
  margin: 0 auto;
  position: relative;
`;

type State = {
  viewState: string,
  chatScreenIsVisible: boolean,
  currentChatId: number,
  searchTerm: string,
  searchInputIsvisible: boolean
};

class App extends React.Component<null, State> {
  state = {
    viewState: "2",
    chatScreenIsVisible: false,
    currentChatId: 0,
    searchTerm: "",
    searchInputIsvisible: false
  };

  showSearchInput = () => {
    this.setState({ searchInputIsvisible: true, viewState: "2" });
  };

  closeSearchInput = () => {
    this.setState({ searchInputIsvisible: false, searchTerm: "" });
  };

  handleSearchtermChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  changeViewState = (event: SyntheticInputEvent<HTMLDataListElement>) => {
    const newState = event.target.dataset.nav;
    this.setState({ viewState: newState });
  };

  showChatScreen = (id: number) => {
    this.setState({ chatScreenIsVisible: true, currentChatId: id });
  };

  closeChatScreen = () => {
    this.setState({ chatScreenIsVisible: false, currentChatId: 0 });
  };

  render() {
    return (
      <StyledApp>
        <HeaderTop
          searchTerm={this.state.searchTerm}
          handleSearchtermChange={this.handleSearchtermChange}
          showSearchInput={this.showSearchInput}
          closeSearchInput={this.closeSearchInput}
          searchInputIsvisible={this.state.searchInputIsvisible}
        />
        <HeaderNav
          viewState={this.state.viewState}
          changeViewState={this.changeViewState}
        />
        <MainCarousel
          showChatScreen={this.showChatScreen}
          viewState={this.state.viewState}
          searchTerm={this.state.searchTerm}
        />

        {this.state.chatScreenIsVisible && (
          <ChatScreen
            currentChatId={this.state.currentChatId}
            closeChatScreen={this.closeChatScreen}
          />
        )}
      </StyledApp>
    );
  }
}

export default App;
