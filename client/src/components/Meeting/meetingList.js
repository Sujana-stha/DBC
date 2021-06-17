import React from 'react';
import * as moment from 'moment'

const MeetingsList = (props) => {
    return (
        <tbody>
            {props.meetings.map((meeting, index) => {
                return (
                    <tr key={meeting.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{meeting.title == null ? '-': meeting.title}</td>
                        <td>{meeting.descriptions == null ? '-': meeting.descriptions}</td>
                        <td>{meeting.startDate == null ? '-': moment(meeting.startDate).format('MMMM Do YYYY, h:mm:ss')}</td>
                        <td>{meeting.endDate == null ? '-': moment(meeting.endDate).format('MMMM Do YYYY, h:mm:ss')}</td>
                        <td>{meeting.partner == null ? '-': meeting.partner}</td>
                        <td>{meeting.partner == null ? '-': meeting.partner}</td>
                        <td>
                            
                            <button type="button" onClick={()=>props.showConfirmBox( meeting.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==meeting.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteMeeting.bind(null, meeting.id)} >Yes</a> &nbsp;
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

export default MeetingsList;