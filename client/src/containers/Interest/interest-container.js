import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestInterests, requestDeleteInterests, requestAddInterests, requestUpdateInterests } from '../../actions/interest-action';


//COMPONENT
import AddInterest from '../../components/Interests/add-interest';
import EditInterest from '../../components/Interests/edit-interest';
import InterestsList from '../../components/Interests/interest';
import Loading from '../../components/loading';

class InterestsListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.editInterest = this.editInterest.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestInterests();
    }

    // submit function for new data
    submitInterest(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddInterests(values, pageNumber);
    }

    // submit function to update data
    submitEditInterest(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateInterests(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editInterest(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteInterestAction(interestId) {
        console.log(interestId)
        this.props.requestDeleteInterests(interestId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestInterests(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Interests</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Interests</li>
                            </ol>
                        </div>
                    </div>
                <div className="row">
                    
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditInterest
                                onSubmit={this.submitEditInterest.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                                <AddInterest onSubmit={this.submitInterest.bind(this)}/>
                            )}

                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-8">
                        {this.props.fetching ? (
                            <Loading />
                        ) : (
                            <div className="wr-not-loading"></div>
                        )}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.N</th>
                                    <th >Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.interests.length ? (
                                <InterestsList
                                    interests={this.props.interests}
                                    onEditInterest={this.editInterest}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteInterest={this.props.requestDeleteInterests}
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
        interests: store.interestState.interests,
        fetching: store.interestState.fetching,
        activePage: store.interestState.activePage,
        itemsCountPerPage: store.interestState.itemsCountPerPage,
        totalItemsCount: store.interestState.totalItemsCount,
        pageRangeDisplayed: store.interestState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestInterests, requestDeleteInterests, requestAddInterests, requestUpdateInterests })(InterestsListContainer);