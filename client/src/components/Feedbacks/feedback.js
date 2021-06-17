import React from 'react';
import ReactStars from "react-rating-stars-component";

const FeedbacksList = (props) => {
    return (
        <tbody>
            {props.feedbacks.map((feedback, index) => {
                return (
                    <tr key={feedback.id}>
                        <td>{index+1}</td>
                        <td className="dbc-rating">{feedback.rating == null ? '-': <ReactStars size={30} value={feedback.rating} edit = {false}/>}</td>
                        <td>{feedback.comments == null ? '-': feedback.comments}</td>
                        <td className="action">
                            {/* <button type="button" onClick={props.onEditFeedback.bind(null, feedback.id)} className="btn btn-info btn-sm">Edit</button> */}
                            <button type="button" onClick={()=>props.showConfirmBox( feedback.id)}  className="btn btn-danger btn-sm nm-delete-btn">Delete</button>
                            
                            {props.confirmText==feedback.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteFeedback.bind(null, feedback.id)} >Yes</a> &nbsp;
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

export default FeedbacksList;