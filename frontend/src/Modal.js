import React, { Component } from "react";
import Modal from "react-responsive-modal";
import moment from "moment";

export default class EventModal extends Component {
  render() {
    const {
      title,
      detail,
      end,
      start,
      location,
      locationName
    } = this.props.selectedEvent;
    return (
      <Modal open={this.props.modalStatus} onClose={this.props.onClose}>
        <div className="info-div">
          <span className="info">Title :</span>
          {title}
        </div>
        <div className="info-div">
          <span className="info">Detail :</span>
          {detail}
        </div>
        <div className="info-div">
          <span className="info">Location :</span>
          {locationName}
        </div>
        <div className="info-div">
          <span className="info">Date :</span>
          {moment(start).format("MM/DD/YYYY")} -{" "}
          {moment(end).format("MM/DD/YYYY")}
        </div>
      </Modal>
    );
  }
}
