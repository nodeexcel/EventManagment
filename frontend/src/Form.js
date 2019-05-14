import React, { Component } from "react";
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
const MY_API_KEY = "AIzaSyA9E-a3u9iRnPspVkmF3ooUZUzXB5cTi0o" // fake

export default class Form extends Component {
      
      handleInputChange=(e)=> {
        this.props.handleChange(e,true)
      }
    
      handleSelectSuggest=(suggest)=> {
        this.props.handleSelectSuggest(suggest,true)      
      }

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmitClick}>
          <div>Title </div>
          <input
            type="text"
            name="title"
            value={this.props.title}
            className="formField"
            onChange={this.props.handleChange}
          />
          <div>Detail</div>
          <input
            type="text"
            name="detail"
            value={this.props.detail}
            className="formField"
            onChange={this.props.handleChange}
          />
          <div>Location</div>
         

<ReactGoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input:this.props.data.search,
                            }}
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="My custom no results text"
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={this.props.data.value}
                                placeholder="Search a location"
                                className="formField"
                                onChange={this.handleInputChange}
                            />
                        </ReactGooglePlacesSuggest>
                             )
                            }
                        />

          <div>Date</div>
          <input
            type="date"
            name="dateFrom"
            className="dateField"
            value={this.props.dateFrom}
            onChange={this.props.handleChange}
          />
          <input
            type="date"
            name="dateTo"
            className="dateField"
            value={this.props.dateTo}
            onChange={this.props.handleChange}
          />

          <div>
            <input type="submit" value="Submit" className="submit"/>
          </div>
        </form>
      </div>
    );
  }
}
