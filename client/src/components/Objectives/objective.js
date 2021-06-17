import React from 'react';

const ObjectivesList = (props) => {
    return (
        <tbody>
            {props.objectives.map((objective, index) => {
                return (
                    <tr key={objective.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{objective.title == null ? '-': objective.title}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditObjective.bind(null, objective.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( objective.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==objective.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteObjective.bind(null, objective.id)} >Yes</a> &nbsp;
                                    <a href="# " onClick={props.hideConfirmBox.bind(null)}>No </a>
                                </span>
                            ): null}
                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    );
};

export default ObjectivesList;