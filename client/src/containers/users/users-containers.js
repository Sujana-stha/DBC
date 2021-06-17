import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestUsers, requestDeleteUsers, requestAddUsers, requestUpdateUsers } from '../../actions/users-actions';

//COMPONENT
import AddUser from '../../components/users/add-users';
import EditUser from '../../components/users/edit-users';
import UsersList from '../../components/users/users';
import Loading from '../../components/loading';

class UsersListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.editUsers = this.editUsers.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestUsers();
    }

    // submit function for new data
    submitUser(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddUsers(values, pageNumber);
    }

    // submit function to update data
    submitEditUser(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateUsers(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editUsers(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteUserAction(userId) {
        console.log(userId)
        this.props.requestDeleteUsers(userId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestUsers(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Users</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Users</li>
                            </ol>
                        </div>
                    </div>
                <div className="row">
                    
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditUser
                                onSubmit={this.submitEditUser.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                                <AddUser onSubmit={this.submitUser.bind(this)}/>
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
                                    <th >First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            
                            {this.props.users.length ? (
                                <UsersList
                                    users={this.props.users}
                                    onEditUser={this.editUsers}
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
};

function mapStateToProps(store) {
    
    return {
        users: store.userState.users,
        fetching: store.userState.fetching,
        activePage: store.userState.activePage,
        itemsCountPerPage: store.userState.itemsCountPerPage,
        totalItemsCount: store.userState.totalItemsCount,
        pageRangeDisplayed: store.userState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestUsers, requestDeleteUsers, requestAddUsers, requestUpdateUsers })(UsersListContainer);