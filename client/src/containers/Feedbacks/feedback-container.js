import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestfeedbacks, requestDeletefeedbacks, requestAddfeedbacks, requestUpdatefeedbacks } from '../../actions/feedback-action';

//COMPONENT
// import AddFeedback from '../../components/users/add-users';
// import EditFeedback from '../../components/users/edit-users';
import FeedbacksList from '../../components/Feedbacks/feedback';
import Loading from '../../components/loading';

class FeedbacksListContainer extends Component {
    constructor() {
        super();
        this.state = {
            // isEditing: false,
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        // this.editFeedbacks = this.editFeedbacks.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestfeedbacks();
    }

    // // submit function to update data
    // submitEditFeedback(values) {
    //     const pageNumber = this.props.activePage;
    //     this.props.requestUpdateFeedbacks(values, pageNumber);
    //     this.setState({
    //         isEditing: false
    //     })
    // }

    // //function to call form of edit
    // editFeedbacks(values) {
    //     this.setState({
    //         isEditing: values
    //     })
    // }

    deleteFeedbackAction(feedbackId) {
        console.log(feedbackId)
        this.props.requestDeletefeedbacks(feedbackId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestfeedbacks(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Feedbacks</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Feedbacks</li>
                            </ol>
                        </div>
                    </div>
                <div className="row">
                    
                    {/* <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditFeedback
                                onSubmit={this.submitEditFeedback.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                                <AddFeedback onSubmit={this.submitFeedback.bind(this)}/>
                            )}

                    </div> */}
                    <div className="col-sm-12 col-md-10 col-lg-10" style={{margin: '0 auto'}}>
                        {this.props.fetching ? (
                            <Loading />
                        ) : (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="table table-bordered dbc-feedback-table">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th >Rating</th>
                                    <th>Comments</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.feedbacks.length ? (
                                <FeedbacksList
                                    feedbacks={this.props.feedbacks}
                                    // onEditFeedback={this.editFeedbacks}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteFeedback={this.props.requestDeletefeedbacks}
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
};

function mapStateToProps(store) {
    
    return {
        feedbacks: store.feedbackState.feedbacks,
        fetching: store.feedbackState.fetching,
        activePage: store.feedbackState.activePage,
        itemsCountPerPage: store.feedbackState.itemsCountPerPage,
        totalItemsCount: store.feedbackState.totalItemsCount,
        pageRangeDisplayed: store.feedbackState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestfeedbacks, requestDeletefeedbacks, requestUpdatefeedbacks, requestAddfeedbacks })(FeedbacksListContainer);