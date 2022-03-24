import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Scooter from './pages/Scooter/Scooter'
// import PayrollLoader from './pages/PayrollLoader/PayrollLoader'

import "./style.scss";
import "../node_modules/highlight.js/scss/a11y-dark.scss"

// const Home = () => {
//   return (
//     <div>
//       <ul>
//         <li><Link to="/scooter">Scooter Interaction Demo</Link></li>
//         <li><Link to="/payroll-loader">Payroll Loader Demo</Link></li>
//       </ul>
//     </div>
//   );
// };


class App extends React.Component {

  render() {

    return <Scooter />

    // return (
    //   <Router basename="/pages/sbg-prototypes/lottie-interaction-demo">
    //     <Route path="/" exact><Home /></Route>
    //     <Route path="/scooter">
    //       <Scooter />
    //     </Route>
    //     <Route path="/payroll-loader">
    //       <PayrollLoader />
    //     </Route>
    //   </Router>
    // );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));