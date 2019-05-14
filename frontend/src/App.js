import React from "react";
import "./App.css";
import Form from "./Form";
import Calendar from "./Calendar";
import axios from "axios";
import swal from "sweetalert";
import Modal from "./Modal";
class App extends React.Component {
  state = {
    search: "",
    value: "",
    events: [],
    modalStatus: false,
    selectedEvent: {}
  };

  componentDidMount() {
    axios
      .get("https://events-management.herokuapp.com/events/get")
      .then(response => {
        this.setState({
          events: response.data.data
        });
      });
  }

  onSubmitClick = e => {
    axios
      .post("https://events-management.herokuapp.com/events/add", {
        title: this.state.title,
        location: {
          lat: this.state.lat,
          long: this.state.long
        },
        EventStartDate: this.state.dateFrom,
        EventEndDate: this.state.dateTo,
        detail: this.state.detail,
        locationName: this.state.value
      })
      .then(res => {
        if (res.data.message) {
          swal("Oops!", "Event has already been booked", "error");
        } else {
          axios
            .get("https://events-management.herokuapp.com/events/get")
            .then(response => {
              this.setState({
                events: response.data.data
              });
            });
        }
      });
    e.preventDefault();
  };

  onEventClick = e => {
    this.setState({
      modalStatus: true,
      selectedEvent: e
    });
  };

  handleChange = (e, places) => {
    if (places) {
      this.setState({ search: e.target.value, value: e.target.value });
    } else {
      let value = e.target.value;
      let name = e.target.name;
      this.setState({
        [name]: value
      });
    }
  };

  handleSelectSuggest = suggest => {
    this.setState({
      search: "",
      value: suggest.formatted_address,
      lat: suggest.geometry.location.lat(),
      long: suggest.geometry.location.lng()
    });
  };
  render() {
    return (
      <div className="App">
        <Form
          onSubmitClick={this.onSubmitClick}
          handleChange={this.handleChange}
          handleSelectSuggest={this.handleSelectSuggest}
          data={this.state}
          className="event-form"
        />
        <div className="event-calendar">
          <Calendar
            events={this.state.events}
            onEventClick={this.onEventClick}
          />
          <Modal
            onEventClick={this.onEventClick}
            modalStatus={this.state.modalStatus}
            selectedEvent={this.state.selectedEvent}
            onClose={() => {
              this.setState({
                modalStatus: false
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
