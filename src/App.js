import React, { Component } from "react";
// import Beginner from "./components/Beginner";
import Intermediate from "./components/Intermediate";
import Advanced from "./components/Advanced";
import Custom from "./components/Custom";
import "./styles.css";
import Logo from "./self_improvement-white-18dp.svg";
import arrow from "./arrow_drop_down-24px (1).svg";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("in constructor");
    // create three state variables.
    // apiData is an array to hold our JSON data
    // isFetched indicates if the API call has finished
    // errorMsg is either null (none) or there is some error
    //isBeginner/isIntermediate property begins set to false
    this.state = {
      apiData: [],
      apiDataBeginner: [],
      apiDataIntermediate: [],
      apiDataAdvanced: [],
      isFetched: false,
      errorMsg: null,
      isBeginner: false,
      isIntermediate: false,
      isAdvanced: false,
      isGoToRoutine: false,
      routineArray: []
    };

    this.toggleBeginner = this.toggleBeginner.bind(this);
    this.toggleIntermediate = this.toggleIntermediate.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.toggleRoutine = this.toggleRoutine.bind(this);
    this.pickBeginner = this.pickBeginner.bind(this);
  }

  //****************Toggle functions triggered on button click, isBeginner/isIntermediate/isAdvanced/isGoToRoutine toggle:false/true*********************//
  toggleBeginner = () => {
    this.setState({ isIntermediate: false });
    this.setState({ isAdvanced: false });
    this.setState({ isGoToRoutine: false });
    this.setState((state) => ({ isBeginner: !state.isBeginner }));
  };

  toggleIntermediate = () => {
    this.setState({ isBeginner: false });
    this.setState({ isAdvanced: false });
    this.setState({ isGoToRoutine: false });
    this.setState((state) => ({ isIntermediate: !state.isIntermediate }));
  };

  toggleAdvanced = () => {
    this.setState({ isBeginner: false });
    this.setState({ isIntermediate: false });
    this.setState({ isGoToRoutine: false });
    this.setState((state) => ({ isAdvanced: !state.isAdvanced }));
  };

  toggleRoutine = () => {
    this.setState({ isBeginner: false });
    this.setState({ isIntermediate: false });
    this.setState({ isAdvanced: false });
    this.setState((state) => ({ isGoToRoutine: !state.isGoToRoutine }));
  };
  //****************function called on button click, isBeginner/isIntermediate = true*********************//

  //***********************Custom Routine****************************//
  //function gets the id of the object you select, is later used in filter function//
  getID(idToFind) {
    return function (bodyObject) {
      return bodyObject.id === idToFind;
    };
  }

  pickBeginner(bodyID) {
    let foundBodObj = this.state.apiDataBeginner.filter(this.getID(bodyID));
    this.setState({
      routineArray: this.state.routineArray.concat(foundBodObj)
    });
  }

  //*********************************************************//

  //****************API calls starts here********************//
  // componentDidMount() is invoked immediately after a
  // component is mounted (inserted into the tree)
  async componentDidMount() {
    try {
      const API_URL =
        "https://raw.githubusercontent.com/jphoulihan/yoga-app/main/yoga.json"; //Needs to be updated
      // Fetch or access the service at the API_URL address
      const response = await fetch(API_URL);
      // wait for the response. When it arrives, store the JSON version
      // of the response in this variable.
      const jsonResult = await response.json();

      // update the state variables correctly.
      //access different parts of the json array by initializing this.setState and creating key:value pairs.
      this.setState({ apiDataAll: jsonResult });
      this.setState({ apiDataBeginner: jsonResult.beginner });
      this.setState({ apiDataIntermediate: jsonResult.intermediate });
      this.setState({ apiDataAdvanced: jsonResult.advanced });

      this.setState({ isFetched: true });
    } catch (error) {
      // In the case of an error ...
      this.setState({ isFetched: false });
      // This will be used to display error message.
      this.setState({ errorMsg: error });
    } // end of try catch
  } // end of componentDidMount()

  // PAY ATTENTION to the JSON returned. We need to be able to
  // access specific properties from the JSON returned.
  // Notice that this time we have three possible returns for our
  // render. This is conditional rendering based on some conditions
  render() {
    if (this.state.errorMsg) {
      return (
        <div className="error">
          <h1>An error has occured in the API call</h1>
        </div>
      ); // end of return.
    } else if (this.state.isFetched === false) {
      return (
        <div className="fetching">
          <h1>We are loading your API request</h1>
        </div>
      ); // end of return
    } else {
      // we have no errors and we have data
      //****************API calls end here********************//

      //****************App return starts here********************//
      return (
        <div className="App">
          {/*start of drop down button menu*/}

          <img class="logo" src={Logo} alt="this is the logo" />

          <h1 class="display-1">Quick Stretch</h1>

          <p class="lead">Take a moment and find the stretch that suits you</p>

          <button
            className="dropdownbtn"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Please select your level &nbsp;{" "}
            <img class="arrow" src={arrow} alt="dropdown arrow" />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              onClick={this.toggleBeginner}
              className="dropdown-item"
              type="button"
            >
              Beginner
            </button>
            <button
              onClick={this.toggleIntermediate}
              className="dropdown-item"
              type="button"
            >
              Intermediate
            </button>
            <button
              onClick={this.toggleAdvanced}
              className="dropdown-item"
              type="button"
            >
              Advanced
            </button>
            <button
              onClick={this.toggleRoutine}
              className="dropdown-item"
              type="button"
            >
              Your Custom Routine
            </button>
          </div>
          {/*end of drop down button menu*/}
          <br />
          <br />
          {/*The below ternary operator works as follows. On Beginner button click it turns the isBeginner value to true. If the isBeginner is true 
          the Beginner Componenent is called. Click the Beginner button again and it returns to false, in which case nothing is mapped.
          Syntactically the ternary does this... is true ? do something : else something. First condition is executed after ? second condition after :*/}
          {this.state.isBeginner ? (
            <Beginner
              mapObjectBeginner={this.state.apiDataBeginner}
              pickBeginner={this.pickBeginner}
            />
          ) : null}
          {/*Beginner map ternary statement triggered by a drop down button click*/}

          {/*card container starts with map function*/}
          {/*The below ternary operator works as follows. On Intermediate button click it turns the isIntermediate value to true. If the isIntermedate is true 
          the Intermediate Componenent is called. Click the Intermediate button again and it returns to false, in which case nothing is mapped.
          Conceptually the ternary does this... is true ? do something : else something. First condition is executed after ? second condition after :*/}
          {this.state.isIntermediate ? (
            <Intermediate
              mapObjectIntermediate={this.state.apiDataIntermediate}
            />
          ) : null}
          {/*End of intermediate map ternary statement triggered by a drop down button click*/}
          {/*card container starts with map function*/}
          {this.state.isAdvanced ? (
            <Advanced mapObjectAdvanced={this.state.apiDataAdvanced} />
          ) : null}
          {/*card container routine starts with map function*/}
          {this.state.isGoToRoutine ? (
            <Custom mapObjectCustom={this.state.routineArray} />
          ) : null}
          <div>
            {/*card container starts with map function*/}
            <br></br>
            <p className="footer">
              <small>This app was created by Team Silver.</small>
              <br />
              <small> Greta, Anna, John and Cathal </small>
            </p>
          </div>
        </div>
      ); // end of return
    } // end of the else statement.
  } // end of render()
} // end of App class

//******************************************* */
class Beginner extends Component {
  render() {
    // const customItems = this.props.customItems;
    //this const declaration connects this Beginner class to the App class. It is the way to pass the//
    //apiDataBeginner state to call the map function on it from within this component//
    const mapBeginner = this.props.mapObjectBeginner;
    const onPick = this.props.pickBeginner;

    return (
      <div className="card-group">
        {mapBeginner.map((person) => (
          <div className="card text-center">
            <div class="card">
              <div className="card-body">
                <img
                  className="card-img-top"
                  alt="yogapic"
                  src={person.imgURL}
                  key={person.id}
                />
                <br />
                <br />
                <h3 className="card-title">{person.body_part}</h3>
                <h5 className="car-title">{person.position}</h5>
                <p className="card-text">{person.description}</p>

                <audio controls autoplay>
                  <source src={person.audio} />
                </audio>
                <button
                  onClick={() => onPick(person.id)}
                  type="button"
                  class="btn btn-primary btn-lg btn-block"
                >
                  Add to Routine
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
//**************End of Beginner Component**********************//
export default App;
