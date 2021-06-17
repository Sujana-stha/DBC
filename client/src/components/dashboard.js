import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {requestUsers} from '../actions/users-actions';
import {requestfeedbacks} from '../actions/feedback-action';
import {requestMatch} from '../actions/match-action';
import {requestMeeting} from '../actions/meeting-action'

class Content extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestMatch();
        this.props.requestUsers();
        this.props.requestfeedbacks();
        this.props.requestMeeting();
    }

    render() {
        console.log(this.props)
        return (
            <div className="container-fluid dbc-content">
                <div className="row mb-2 dbc-page-header">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                    </div>
                </div>

                {/* small stat boxes */}
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{this.props.users.length}</h3>
                                <p>Users</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-stalker"></i>
                            </div>
                            <NavLink to="/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{this.props.matchs.length}</h3>
                                <p>Matched Users</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <NavLink to="/match" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{this.props.meetings.length}</h3>

                                <p>Meetings</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-ios-videocam"></i>
                            </div>
                            <NavLink to="/meeting" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{this.props.feedbacks.length}</h3>

                                <p>Feedbacks</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-document-text"></i>
                            </div>
                            <NavLink to="/feedbacks" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                        </div>
                    </div>
                </div>
                {/* end of small stat boxes */}
                <div className="row">
                    <section className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-calendar mr-1"></i>
                                    Calendar
                                </h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>

                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body p-0">
                               <Calendar/>
                            </div>
                        </div>
                    </section>

                </div>
                {/* list of news and subscribers */}
                <div className="row">
                    <section className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-newspaper mr-1"></i>
                                    Lastest Match
                                </h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>

                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body p-0">
                                <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>User 1</th>
                                        <th>User 2</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.matchs.map((match, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{match.authUsername}</td>
                                                <td>{match.MeetUsername}</td>
                                                <td>{match.status}</td>
                                            </tr>
                                        )
                                    })}
                                   <tr>
                                       
                                   </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </section>
                    <section className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">
                                    <i className="fas fa-users mr-1"></i>
                                    Lastest Users
                                </h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>

                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body p-0">
                                <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.users.reverse().slice(0, 5).map((user, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{user.first_name}</td>
                                                <td>{user.last_name}</td>
                                                <td>{user.Email}</td>
                                            </tr>
                                        )
                                    })}
                                   <tr>
                                       
                                   </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </section>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(store) {
    
    return {
        users: store.userState.users,
        meetings: store.meetingState.meetings,
        feedbacks: store.feedbackState.feedbacks,
        matchs: store.matchState.matchs        
    }
}


export default connect(mapStateToProps, { requestUsers, requestMeeting, requestfeedbacks, requestMatch})  (Content);