import React from "react";
import { Auth, Hub } from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";   //withAuthenticator
import { BrowserRouter as Router, Route } from 'react-router-dom';

import  HomePage  from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import  MarketPage  from "./pages/MarketPage";
import Navbar from "./components/Navbar";

import "./App.css";
// import { SectionHeader } from "aws-amplify-react/dist/AmplifyUI";
import { isThisYear } from "date-fns";


class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount(){
    console.dir(AmplifyTheme);
    this.getUserData();
    Hub.listen('auth', this, 'onHUbCapsule');

  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({user}) : this.setState({user : null })


  }

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log('signed in')
        isThisYear.getUserData()
        
        break;
      case "signUp":
        console.log('signed up');
        break;
      case "signOut":
        console.log('signed out');
        this.setState({user: null});
        break;

      default:
        return;
        // break;
    }
    // capsule.payload.event
  }

  render() {
    const {user} = this.state;

    //<div>App</div>;
    return !user ? (
      <Authenticator theme={theme}/>
    ) : (
      <Router>
        <>
          {/* <HomePage/> */}
          {/* navbar */}
          <Navbar />
          {/* Routes */}
          <div className= "app-container">
            <Route exact path= "/" Component = { HomePage } />
            <Route path = "/profile" Component = {ProfilePage}/>
            {/* .params.marketId */}
            <Route path = "/markets/:marketId" Component={({ match }) => <MarketPage marketId = {match.params.marketId} /> }/>    


          </div>

        </>

      </Router>
      );
  }
} // end class 

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  },
  button: {
    backgroundColor: "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"

  },
  sectionHeader:{
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
};

// export default withAuthenticator( App, true, [], null, theme);   // { includeGreetings: true}
export default App;

