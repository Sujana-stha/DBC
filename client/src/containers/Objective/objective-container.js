import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination'
import store from '../../store';
import { requestObjectives, requestDeleteObjective, requestAddObjective, requestUpdateObjective } from '../../actions/objective-action';


//COMPONENT
import AddObjective from '../../components/Objectives/add-objective';
import EditObjective from '../../components/Objectives/edit-objective';
import ObjectivesList from '../../components/Objectives/objective';
import Loading from '../../components/loading';

class ObjectivesListContainer extends Component {
    constructor() {
        super();
        this.state = {
            isEditing: false,
            confirmText: null,
            isChecked: false
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.editObjective = this.editObjective.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.hideDiv = this.hideDiv.bind(this)
    }

    componentDidMount() {
        // call action to run the relative saga
        // const pageNumber = this.props.activePage;
        this.props.requestObjectives();
    }

    // submit function for new data
    submitObjective(values) {
        const pageNumber = this.props.activePage;
        this.props.requestAddObjective(values, pageNumber);
    }

    // submit function to update data
    submitEditObjective(values) {
        const pageNumber = this.props.activePage;
        this.props.requestUpdateObjective(values, pageNumber);
        this.setState({
            isEditing: false
        })
    }

    //function to call form of edit
    editObjective(values) {
        this.setState({
            isEditing: values
        })
    }

    deleteObjectiveAction(objectiveId) {
        console.log(objectiveId)
        this.props.requestDeleteObjective(objectiveId);
    }

    deleteItem(id) {
        this.setState({
            confirmText: id
        })
    }
    // pagination function
    handlePageChange(pageNumber) {
        this.props.requestObjectives(pageNumber)
    }

    hideDiv() {
        this.setState({ confirmText: null })
    }

    render() {
        return (
            <div className="dbc-content">
                <div className="row mb-2 dbc-page-header">
                        <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Objectives</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Objectives</li>
                            </ol>
                        </div>
                    </div>
                <div className="row">
                    
                    <div className="col-sm-12 col-md-4 col-lg-4">
                        {this.state.isEditing ? (
                            <EditObjective
                                onSubmit={this.submitEditObjective.bind(this)}
                                editId={this.state.isEditing} />
                        ) : (
                                <AddObjective onSubmit={this.submitObjective.bind(this)}/>
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
                            
                            {this.props.objectives.length ? (
                                <ObjectivesList
                                    objectives={this.props.objectives}
                                    onEditObjective={this.editObjective}
                                    confirmText={this.state.confirmText}
                                    showConfirmBox={this.deleteItem}
                                    hideConfirmBox={this.hideDiv}
                                    deleteObjective={this.props.requestDeleteObjective}
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
        objectives: store.objectiveState.objectives,
        fetching: store.objectiveState.fetching,
        activePage: store.objectiveState.activePage,
        itemsCountPerPage: store.objectiveState.itemsCountPerPage,
        totalItemsCount: store.objectiveState.totalItemsCount,
        pageRangeDisplayed: store.objectiveState.pageRangeDisplayed,
    }
}

export default connect(mapStateToProps, { requestObjectives, requestDeleteObjective, requestAddObjective, requestUpdateObjective })(ObjectivesListContainer);