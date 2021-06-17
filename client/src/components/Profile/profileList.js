import React from 'react';
import {Link} from 'react-router-dom';
import ImageLoader from 'react-image-file';
const ProfilesList = (props) => {
    
    return (
        <tbody>
            {props.profiles.map((profile, index) => {
                
                console.log(profile)

                return (
                    <tr key={profile.id} className="users-row">
                        <td>{index+1}</td>
                        <td>{profile.first_name == null ? '-': profile.first_name}</td>
                        <td>{profile.last_name == null ? '-': profile.last_name}</td>
                        <td className="dbc-email">{profile.email}</td>
                        <td>
                            {profile.Objective.map((obj, index)=> {
                                return (
                                    <span key={index}> {obj.title}</span>
                                )
                            })}
                        </td>
                        <td>
                            {profile.Interest.map((inter, index)=> {
                                return (
                                    <span key={index}> {inter.title}</span>
                                )
                            })}
                        </td>
                        {/* <td> */}
                            {/* {profile.Image === null ? '-': <img src={profile.Image.data}/>} */}
                            
                            {/* {profile.Image.data.data ? 
                                <img src={URL.createObjectURL(profile.Image.data.data)} />
                                : ''
                            } */}
                           
                            {/* {profile.Image.map((img, i)=> {
                                const data = img.data.data
                                const imgSrc = URL.createObjectURL(data)
                                console.log("imgSrc", imgSrc)
                                return (
                                    <img src={imgSrc}></img>
                                )
                            })} */}
                        {/* </td> */}
                        <td className="action">
                            <Link to ="/view-profile"  onClick={props.onViewProfile.bind(null, profile.id)} className="btn btn-info btn-sm">View</Link>
                            <button type="button" onClick={()=>props.showConfirmBox( profile.id)}  className="btn btn-danger btn-sm dbc-delete-btn">Delete</button>
                            
                            {props.confirmText==profile.id ? (
                                <span className="confirm tooltip-text">Are you sure?&nbsp; 
                                    <a href="# " onClick={props.deleteUser.bind(null, profile.id)} >Yes</a> &nbsp;
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

export default ProfilesList;