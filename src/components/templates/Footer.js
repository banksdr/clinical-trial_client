import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';

class Footer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let uri;
    if (this.props.trials !== '') {
      let formObject = this.props.select;
      let dataObj = JSON.stringify(formObject);
      uri = `http://localhost:5000/pdf/summary?q=${encodeURIComponent(JSON.stringify(this.props.search))}&data=${encodeURIComponent(dataObj)}`;
    }
    return (
      <footer>
        <div className="headerSection" key="footer-button-container">
          <a href={uri} download><button className="btn btn-warning" key="multi-download-button">Download Report</button></a>
        </div>
      </footer>
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

export default connect(mapStateToProps)(Footer);
