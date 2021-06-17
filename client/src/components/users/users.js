import React from 'react';

const UsersList = (props) => {
    return (
        <tbody>
            {props.users.map((user, index) => {
                return (
                    <tr key={user.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{user.first_name == null ? '-': user.first_name}</td>
                        <td>{user.last_name == null ? '-': user.last_name}</td>
                        <td className="dbc-email">{user.email}</td>
                        <td className="action">
                            <button type="button" onClick={props.onEditUser.bind(null, user.id)} className="btn btn-info btn-sm">Edit</button>
                            <button type="button" onClick={()=>props.showConfirmBox( user.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==user.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteUser.bind(null, user.id)} >Yes</a> &nbsp;
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

export default UsersList;