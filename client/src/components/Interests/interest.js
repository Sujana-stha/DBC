import React from 'react';

const InterestsList = (props) => {
    return (
        <tbody>
            {props.interests.map((interest, index) => {
                return (
                    <tr key={interest.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{interest.title == null ? '-': interest.title}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditInterest.bind(null, interest.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( interest.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==interest.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteInterest.bind(null, interest.id)} >Yes</a> &nbsp;
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

export default InterestsList;