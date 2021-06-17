import React from 'react';

const MatchsList = (props) => {
    return (
        <tbody>
            {props.matchs.map((match, index) => {
                return (
                    <tr key={match.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{match.MeetUsername == null ? '-': match.MeetUsername}</td>
                        <td>{match.authUsername == null ? '-': match.authUsername}</td>
                            <td className="dbc-email">{match.status}</td>
                        <td className="action">
                            
                            <button type="button" onClick={()=>props.showConfirmBox( match.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==match.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteMatch.bind(null, match.id)} >Yes</a> &nbsp;
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

export default MatchsList;