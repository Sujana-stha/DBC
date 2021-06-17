import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestMatch, requestDeleteMatch } from '../../actions/match-action';


//COMPONENT
import MatchList from '../../components/Match/MatchList';
import Loading from '../../components/loading';

class MatchsListContainer extends Component {
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
        this.props.requestMatch();
    }


    deleteMatchAction(matchId) {
        console.log(matchId)
        this.props.requestDeleteMatch(matchId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestMatch(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Match</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Match</li>
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
                                    <th>User 1</th>
                                    <th>User 2</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.matchs.length ? (
                                <MatchList
                                    matchs={this.props.matchs}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteMatch={this.props.requestDeleteMatch}
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
        matchs: store.matchState.matchs,
        fetching: store.matchState.fetching,
        activePage: store.matchState.activePage,
        itemsCountPerPage: store.matchState.itemsCountPerPage,
        totalItemsCount: store.matchState.totalItemsCount,
        pageRangeDisplayed: store.matchState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestMatch, requestDeleteMatch })(MatchsListContainer);