import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store from '../store';
import Notifications from 'react-notify-toast';
import loadjs from 'loadjs';
import { connect } from 'react-redux';
import {logoutRequest} from '../actions/login-actions'

import Header from '../components/dashboard-layout/header';
import Sidebar from '../components/dashboard-layout/SideBar';
import Dashboard from '../components/dashboard';
import Footer from '../components/dashboard-layout/footer';


//components
import usersContainer from '../containers/users/users-containers';
import profileContainer from '../containers/Profile/profileContainer';
import objectiveContainer from '../containers/Objective/objective-container';
import interestContainer from '../containers/Interest/interest-container';
import meetingContainer from '../containers/meeting/meeting-container';
import feedbackContainer from '../containers/Feedbacks/feedback-container'
import matchContainer from '../containers/Match/Match-container';

class DashboardLayout extends Component {
    componentDidMount() {
        loadjs('/plugins/jquery/jquery.min.js', function () {
            loadjs('/plugins/bootstrap/js/bootstrap.bundle.min.js', function() {
                loadjs('/dist/js/adminlte.min.js', function() {
                    loadjs('/dist/js/demo.js');
                })
            })
        })
    }
    render() {
        const { match } = this.props
        console.log(this.props)
        return (
            <div className="wrapper">
                <Notifications options={{ top: '50px', right: '0px', width: '100%', margin: 0, left: 'none' }} />
                {/* start Header Content */}
                <Header onLogout={this.props.logoutRequest}/>
                {/* END Header Content */}

                {/* Start Sidebar Content */}
                <Sidebar/>
                {/* END Sidebar Content */}

                {/* START MAIN CONTENT */}
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content">
                        <Switch>
                            <Route exact path={`${match.path}`} component={Dashboard} />
                            <Route path="/users" component={usersContainer}/>
                            <Route path="/profile" component={profileContainer} />
                            <Route path ="/interests" component={interestContainer}/>
                            <Route path ="/objective" component={objectiveContainer}/>
                            <Route path ="/meeting" component={meetingContainer}/>
                            <Route path="/view-profile" component={profileContainer}/>
                            <Route path="/feedbacks" component={feedbackContainer}/>
                            <Route path="/match" component={matchContainer}/>
                            <Redirect to={`${match.url}`} />
                        </Switch>
                    </section>
                </div>
                {/* END OF MAIN CONTENT */}

                {/* Start Footer Content */}
                <Footer/>
                {/* End Footer Content */}
            </div>
        )
    }

}
export default connect(null,{logoutRequest})(DashboardLayout);