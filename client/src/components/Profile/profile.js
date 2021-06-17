import React, { Component } from 'react';
import * as profileApi from '../../api/profile-api';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        }
    }
    componentDidMount() {
        const id = this.props.userId
        profileApi.getSingleProfile(id).then(response => {
            console.log(response);
            const profiles =[]
            profiles.push(response.data)
            this.setState({
                profiles: profiles
            })
           
        })
    }
    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">View Profile</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">View Profile</li>
                        </ol>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        {this.state.profiles.map((profile, index)=> {
                            return (
                                <div className="row" key={index}>
                            <div className="col-md-3">
                                {/* <!-- Profile Image --> */}
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                            <img className="profile-user-img img-fluid img-circle"
                                                src="/img/user4-128x128.jpg"
                                                alt="User profile picture" />
                                        </div>

                                        <h3 className="profile-username text-center">{profile.first_name} {profile.last_name}</h3>

                                        <p className="text-muted text-center">{profile.username}</p>

                                        <ul className="list-group list-group-unbordered mb-3">

                                            <li className="list-group-item">
                                                <b>Connections</b> <a className="float-right">{profile.MeetUsers.length}</a>
                                            </li>
                                        </ul>

                                    </div>
                                    {/* <!-- /.card-body --> */}
                                </div>
                                {/* <!-- /.card --> */}

                               
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                            <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Basic Info</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Business Info</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li>
                                        </ul>
                                    </div>
                                    {/* <!-- /.card-header --> */}
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="activity">
                                                
                                            <div className="card-body">
                                        <strong><i className="fas fa-book mr-1"></i> Summary</strong>

                                        <p className="text-muted">
                                            {profile.PersonalInfo.summary}
                                        </p>

                                        <hr />

                                        <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>

                                        <p className="text-muted">Malibu, California</p>

                                        <hr />

                                        <strong><i className="fas fa-pencil-alt mr-1"></i> Objectives</strong>

                                        {/* <p className="text-muted"> */}
                                            {profile.Objective.map((obj,index)=> {
                                                return (
                                                    <div className="text-muted" key={index}>
                                                        <span className="tag tag-success">{obj.title}</span>
                                                    </div>
                                                )
                                            })}
                                            
                                        {/* </p> */}

                                        <hr />

                                        <strong><i className="fas fa-gamepad mr-1"></i> Interests</strong>

                                        {/* <p className="text-muted"> */}
                                            {profile.Interest.map((inter,index)=> {
                                                return (
                                                    <div className="text-muted" key={index}>
                                                        <span className="tag tag-success">{inter.title}</span>
                                                    </div>
                                                )
                                            })}
                                            
                                        {/* </p> */}
                                    </div>
                                            </div>
                                            {/* <!-- /.tab-pane --> */}
                                            <div className="tab-pane" id="timeline">
                                                <div className="card-body">
                                                    <strong><i className="fas fa-building mr-1"></i> Business Name</strong>

                                                    <p className="text-muted">
                                                        {profile.BusinessInfo.business_name}
                                                    </p>

                                                    <hr />
                                                    <strong><i className="fas fa-briefcase mr-1"></i> Business Sector</strong>

                                                    <p className="text-muted">
                                                        {profile.BusinessInfo.business_sector}
                                                    </p>

                                                    <hr />
                                                    <strong><i className="fas fa-user-tie mr-1"></i>Position</strong>

                                                    <p className="text-muted">
                                                        {profile.BusinessInfo.position}
                                                    </p>

                                                    <hr />
                                                </div>
                                            </div>
                                            {/* <!-- /.tab-pane --> */}

                                            <div className="tab-pane" id="settings">

                                            </div>
                                            {/* <!-- /.tab-pane --> */}
                                        </div>
                                        {/* <!-- /.tab-content --> */}
                                    </div>
                                    {/* <!-- /.card-body --> */}
                                </div>
                                {/* <!-- /.card --> */}
                            </div>
                            {/* <!-- /.col --> */}
                        </div>
                        
                            )
                        })}
                        </div>
                    {/* <!-- /.container-fluid --> */}
                </section>
            </div>
        )
    }
};

export default ViewProfile;