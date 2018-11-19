import React from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAllTrials, querySearch, selectTrial, removeTrial} from '../actions/index';
import _ from 'lodash';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      reset: false,
      expanded: false,
      disabled: true
    };

    this.onSearchInput = this.onSearchInput.bind(this);
    this.onQuerySearch = this.onQuerySearch.bind(this);
    this.onSearchReset = this.onSearchReset.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.manageTrial = this.manageTrial.bind(this);
    this.displayItems = this.displayItems.bind(this);
  }

  componentDidMount() {}

  get clinicalResults() {
    return _.map(this.props.trials, (trial, idx) => {
      let toggleOrientation = (!!trial.expanded) ? "arrow-orient arrow-down" : "arrow-orient arrow-up";
      return (
        <div className="trial-rows" key={trial.id}>
          <div className="trial-grid">
            <div className="trial-item details-display" onClick={(e) => this.showDetails(e, idx)}><span className={toggleOrientation}></span>{trial.public_title}</div>
            <input type="checkbox" name="trial-select" className="trial-select" onClick={(e) => this.manageTrial(e, idx)} />
          </div>
          {!!trial.expanded &&
          <div className="pane">
              <div className="pane-details">
                <div className="pane-item"><b>Summary:</b>&nbsp;{trial.brief_summary}</div>
                <div className="pane-item"><b>Source: </b>&nbsp;{_.get(trial, 'source_id')}</div>
                <div className="pane-item"><b>Status: </b>&nbsp;{trial.status}</div>
                <div className="pane-item"><b>Sample Size: </b>&nbsp;{trial.target_sample_size}</div>
                <div className="pane-item"><b>Gender: </b>&nbsp;{trial.gender}</div>
                <div className="pane-item item-group"><b className="item-label">Documents</b><ul>{this.displayItems(trial.documents)}</ul></div>
                <div className="pane-item item-group"><b className="item-label">Records</b><ul>{this.displayItems(trial.records)}</ul></div>
                <div className="pane-item item-group"><b className="item-label">Locations</b><ul>{this.displayItems(trial.locations)}</ul></div>
                <div className="pane-item item-group"><b className="item-label">Interventions</b><ul>{this.displayItems(trial.interventions)}</ul></div>
                <div className="pane-item item-group"><b className="item-label">Conditions</b><ul>{this.displayItems(trial.conditions)}</ul></div>
              </div>
            </div>
          }
        </div>
      );
    })
  }

  onSearchReset() {
    if (this.state.search == "") {
      this.setState({
        reset: true
      })
    }
  }

  showDetails(e, index) {
    let trial = this.props.trials[index];
    trial.expanded = !trial.expanded;
    this.setState({
      expanded: !trial.expanded
    });
  }

  manageTrial(e, index) {
    let trial = this.props.trials[index];
    let isSelected = e.target.checked;
    if (!!isSelected) {
      if (this.props.select.length < 5) {
        return this.props.selectTrial(trial);
      } else {
        alert('Max limit of 5 trials to select');
        e.target.checked = false;
      }
    } else {
      return this.props.removeTrial(trial.id);
    }
  }

  onQuerySearch() {
      let queryObject = {};
      queryObject.q = this.state.search;
      queryObject.page = 1;
      queryObject.per_page = 100;
      return this.props.getAllTrials(queryObject), this.props.querySearch(this.state.search);
  }

  displayItems(array) {
    return _.map(array, (arr, index) => {
      return _.map(arr, (val, key) => {
        var res = (val == '') ? 'N/A' : val;
        return <li className="item" key={key}><b>{key}:</b>&nbsp;{res}</li>;
      });
    });
  }

  onSearchInput(e) {
    let input = e.currentTarget.value;
    let query = (input.length > 0) ? false : true;
    this.setState({
      search: input,
      reset: false,
      disabled: query
    });
  }

  render() {
    const isSearching = !!this.state.reset;
    let displayResults = (isSearching) ? "No results found." : this.clinicalResults;
    let disabled = (!!this.state.disabled) ? "disabled" : "";
    return (
      <div>
        <section id="clinical">
          <div id="clinical-bg"></div>
          <div className="clinical-view">
            <input type="text" name="search-trials" id="search-trials" onChange={this.onSearchInput} onFocus={this.onSearchReset} value={this.state.search} placeholder="Enter a keyword to search..." />
            <button id="clinical-search" className={`btn btn-primary ${disabled}`} onClick={this.onQuerySearch} disabled={this.state.disabled}>Submit</button>
          </div>
          <div className="clinical-results">{displayResults}</div>
        </section>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    trials: state.trials,
    search: state.search,
    select: state.select
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getAllTrials: getAllTrials, querySearch: querySearch, selectTrial: selectTrial, removeTrial: removeTrial}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Dashboard);
