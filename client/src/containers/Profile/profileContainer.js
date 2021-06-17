import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestProfile } from '../../actions/profile-action';


//COMPONENT
import ProfileList from '../../components/Profile/profileList';
import ViewProfile from '../../components/Profile/profile';
import Loading from '../../components/loading';

class ProfileListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: false,
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestProfile();
    }

    viewProfile(values) {
        this.setState({
            profileId: values
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestUsers(pageNumber)
    }
    
    render() {
        if(this.props.match.path === "/view-profile") {
            return (
                <ViewProfile userId = {this.state.profileId}/>
            ) 
        } else {
            return (
                <div className="dbc-content">
                        <div className="row mb-2 dbc-page-header">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Profiles</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Profiles</li>
                                </ol>
                            </div>
                        </div>
                    <div className="row">
                        
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            {this.props.fetching ? (
                                <Loading />
                            ) : (
                                <div className="wr-not-loading"></div>
                            )}
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>S.N</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Email</th>
                                        <th>Objective</th>
                                        <th>Interests</th>
                                        {/* <th>Profile Pic</th> */}
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                {this.props.profiles.length ? (
                                    <ProfileList
                                        profiles={this.props.profiles}
                                        onViewProfile={this.viewProfile}
                                        confirmText={this.state.confirmText}
                                        showConfirmBox={this.deleteItem}
                                        hideConfirmBox={this.hideDiv}
                                        deleteUser={this.props.requestDeleteUsers}
                                        activePage={this.props.activePage}
                                        itemsCountPerPage={this.props.itemsCountPerPage}
                                    />

                                ) : (
                                        <tbody>
                                            <tr>
                                                <td colSpan="6">No Results Found !</td>
                                            </tr>
                                        </tbody>
                                    )}
                            </table>
                            <div className="col-sm-12 left-align">
                                <Pagination
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
                                    totalItemsCount={this.props.totalItemsCount}
                                    pageRangeDisplayed={this.props.pageRangeDisplayed}
                                    onChange={this.handlePageChange}
                                    firstPageText='First'
                                    lastPageText='Last'
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
};

function mapStateToProps(store) {
    
    return {
        profiles: store.profileState.profiles,
        fetching: store.profileState.fetching,
        activePage: store.profileState.activePage,
        itemsCountPerPage: store.profileState.itemsCountPerPage,
        totalItemsCount: store.profileState.totalItemsCount,
        pageRangeDisplayed: store.profileState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestProfile })(ProfileListContainer);