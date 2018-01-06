/**
 * Show users list 
 * 
 * Created by Matt@06/01/2018
 * 
 */

import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'

import classes from './NotificationContainer.scss'
import { fetchUsersData } from '../modules/notification'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';


class NotificationHandleItem extends React.Component {
  constructor(props) {
    super(props);

    this.hideItem = this.hideItem.bind(this);
  }

  hideItem () {
    this.props.handleHideItem(this.props.name);
  }

  render() {
    return (
     <div className={classes.notificationItem}>
        <span>{this.props.name}</span>
        <i className="fa fa-minus-circle" onClick={this.hideItem} ></i>
      </div>)       
  }
       
}

/**
 * Container component NotificationHandleItemContainer
 */
class NotificationHandleItemContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {folderCollapsed: true, users: []};

    this.handleToggleGender = this.handleToggleGender.bind(this);

  }

  /**
   * Function handleToggleGender
   * Send close notification and jump to different link
   */
  handleToggleGender() {
    this.setState({folderCollapsed: !this.state.folderCollapsed});
  }

  /**
   * Render HTML
   * @returns {XML}
   */
  render() {
    return (
        <div className={classes.notificationContentBody}>
          <div  className={classes.notificationGenderLabel} onClick={this.handleToggleGender}>
            {this.state.folderCollapsed ? (<i className="fa fa-plus"></i>) : (<i className="fa fa-minus"></i>) }
            <span>{this.props.gender}</span>
          </div>

          {!this.state.folderCollapsed && this.props.users.map((t,i)=>{ 
              if (t.gender.toLowerCase() === this.props.gender.toLowerCase())
                return (<div key={i}><NotificationHandleItem name={t.name} handleHideItem={this.props.handleHideItem} /></div>)
            })}
        </div>
      )
  }
}

/**
 * Container component NotificationContainer
 */
class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
    this.handleHideItem = this.handleHideItem.bind(this);    
  }

  componentDidMount() {
    this.props.fetchUsersData();
  }

  compare(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }
  

  /**
   * Function handleViewItem
   * Send close notification and jump to different link
   */
  handleHideItem(name) {
    var tmpNames = this.state.users.filter(function(u){ return (u.name !== name)});

    this.setState({users: tmpNames});
  }

  
  componentDidUpdate(prevProps, prevState) {
    if ((this.props.users.length>0) && (this.state.users.length<=0)) {
      this.state.users = this.props.users.slice();
    }
  }

  /**
   * Render HTML
   * @returns {XML}
   */
  render() {

    if (this.props.users.length>0 && this.state.users.length<=0) {
      this.state.users = this.props.users.slice();
    }

    if (this.state.users.length>0) {
      this.state.users.sort(this.compare);
    }

    return (
      <div>
        <div  className="col-md-6 col-md-offset-3">
        { this.state.users && this.state.users.length>0 ? <div className={classes.notificationContentBox}>
          <NotificationHandleItemContainer gender='Male' users={this.state.users}   handleHideItem={this.handleHideItem}  />
          <NotificationHandleItemContainer gender='Female' users={this.state.users}  handleHideItem={this.handleHideItem}  />
        </div> : <LoadingSpinner />}
          
        </div>
      </div>
    )
  }
}

/**
 * Function mapStateToProps
 * Return states include user and notification
 * @param state
 * @param ownProps
 * @returns {{user, notification: *}}
 */
const mapStateToProps = (state, ownProps) => {
  return {
    users: state.notification.usersList,
  }
}

/**
 * Function mapDispatchToProps
 * Return dispatches include fetchNotification, closeSingleNotification and closeAllNotifications
 * @param dispatch
 * @param ownProps
 * @returns {{fetchNotification: (function(*=)), closeSingleNotification: (function(*=, *=)), closeAllNotifications: (function(*=))}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsersData: () => {
      dispatch(fetchUsersData());
    }
  }
}

/**
 * Export container component NotificationContainer with state and dispatch
 */
export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)

