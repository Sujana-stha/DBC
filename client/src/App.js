
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import {Provider} from 'react-redux';
// import Login from './components/login/login';
import store from './store'
import history from './myhistory'
import DashboardLayout from './layouts/PrimaryLayout';
import PrivateRoute from './privateRoute';
import UnauthorizedLayout from './layouts/unauthorizedLayout'
 
function App() {
  return (
    <div className="App">
      <Provider store = {store} >
            <ConnectedRouter history ={history}>
              <Switch>
                <Route path="/auth" component={UnauthorizedLayout} />
                <PrivateRoute path="/" component={DashboardLayout} />
                <Redirect to="/auth"/>
              </Switch>
            </ConnectedRouter>
        </Provider>
    </div>
  );
}
 
export default App;
// App.js

// import React, { Component } from 'react';
// import Header from './components/layout/header';
// import SideBar from './components/layout/SideBar';
// import Content from './components/content';
// import Footer from './components/layout/footer';

// class App extends Component {

//   render() {
//     return (
//       <div>
//         <Header />
//         <SideBar />
//         <div className="content-wrapper">
//           <section className="content">
//           <Content />
//           </section>
//         </div>
        
//         <Footer/>
//       </div>
//     );
//   }
// }

// export default App;