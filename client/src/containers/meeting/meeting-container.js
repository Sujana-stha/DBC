import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestMeeting, requestDeleteMeeting } from '../../actions/meeting-action';


//COMPONENT
import MeetingList from '../../components/Meeting/meetingList';
import Loading from '../../components/loading';

class MeetingsListContainer extends Component {
    constructor() {
        super();
        this.state = {
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestMeeting();
        console.log('meet',this.props.meetings);
    }


    deleteMeetingAction(meetingId) {
        this.props.requestDeleteMeeting(meetingId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestMeeting(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        console.log(this.props.meetings)
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Meeting</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Meeting</li>
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
                                    <th>Title</th>
                                    <th>Descriptions</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Primary User</th>
                                    <th>Secondary User</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.meetings.length ? (
                                <MeetingList
                                    meetings={this.props.meetings}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteMeeting={this.props.requestDeleteMeeting}
                                    activePage={this.props.activePage}
                                    itemsCountPerPage={this.props.itemsCountPerPage}
                                />

                            ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="12">No Results Found !</td>
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
};

function mapStateToProps(store) {
    
    return {
        meetings: store.meetingState.meetings,
        fetching: store.meetingState.fetching,
        activePage: store.meetingState.activePage,
        itemsCountPerPage: store.meetingState.itemsCountPerPage,
        totalItemsCount: store.meetingState.totalItemsCount,
        pageRangeDisplayed: store.meetingState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestMeeting, requestDeleteMeeting })(MeetingsListContainer);