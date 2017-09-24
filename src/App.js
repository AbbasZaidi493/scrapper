import React, { Component } from 'react';
import axios from 'axios';
import Field from './Field';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isFetching: false,
      url: '',
      meta: {},
      validationString: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.scrape = this.scrape.bind(this);
  }

  handleChange(e) {
    this.setState({ url: e.target.value });
  }

  scrape() {
    if (!this.state.url) {
      return this.setState({ validationString: 'URL is required.' });
    } else {
      if (this.state.validationString) {
        this.setState({ validationString: '' });
      }

      if (Object.keys(this.state.meta).length) {
        this.setState({ meta: {} });
      }

      this.setState({ isFetching: true  });
      const _this = this;
      const baseUrl = 'http://127.0.0.1:5000/meta';
      const url = this.state.url;
      return axios({
          method: 'post',
          url: baseUrl,
          data: { url }
        })
        .then((response) => {
          _this.setState({ isFetching: false, meta: response.data });
          if(_this.state.meta.error) {
              _this.setState({ validationString: 'Something went wrong.' });
          }
        })
        .catch(() => {
          _this.setState({ isFetching: false  });
        });
    }

  }

  getDefaultStyles() {
    return {
      container: {
        background: '#0C2029',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      },
      wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      h3: {
        fontWeight: 600,
        color: '#ffffff',
        marginTop: '0px',
        marginBottom: '10px'
      },
      block: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '60px',
        padding: '15px',
        minWidth: '400px',
        maxWidth: '400px',
        borderRadius: '2px',
        minHeight: '700px',
        border: '1px solid #ffffff',
      },
      span: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        paddingBottom: '10px',
        borderBottom: '1px solid #4c4c4c'
      },
      button: {
        backgroundColor: '#FFC300',
        padding: '8px',
        border: 'none',
        color: '#0f0f0f',
        fontWeight: 600
      },
      validationSpan: {
        marginTop: '10px',
        color: '#ffffff',
        fontSize: '12px',
        textAlign: 'center'
      },
      scrapeSpan: {
        color: '#ffffff',
        fontSize: '10px',
        marginLeft: '5px',
        marginTop: '10px'
      },
      ul: {
        color: '#ffffff',
        listStyleType: 'none'
      },
      li: {
        fontSize: '12px',
        lineHeight: '2em'
      }
    };
  }

  render() {
    const styles = this.getDefaultStyles();

    return (
      <section style={styles.container}>
        <div style={styles.wrapper}>
          <div style={styles.block}>
            <h3 style={styles.h3}>MetaData Scraper</h3>
            <span style={styles.span}>
              <Field
                onChange={this.handleChange}
                type="text"
                value={this.state.url}
                name="url"
                placeholder="Enter URL to scrape"
              />
              {this.state.isFetching ? <span style={styles.scrapeSpan}>Scraping...</span> : <button style={styles.button} onClick={this.scrape}>Scrape</button>}
            </span>
            {this.state.validationString ? <span style={styles.validationSpan}>{this.state.validationString}</span> : null}
            <ul style={styles.ul}>
              <li style={styles.li}>{this.state.meta.image ? <img width="300px" height="200px" src={this.state.meta.image} alt="Not found" /> : null}</li>
              <li style={styles.li}>{this.state.meta.url ? <span><strong>URL:</strong> {this.state.meta.url}</span> : null}</li>
              <li style={styles.li}>{this.state.meta.title ? <span><strong>Title:</strong> {this.state.meta.title}</span> : null}</li>
              <li style={styles.li}>{this.state.meta.description ? <span><strong>Description: </strong> {this.state.meta.description}</span> : null}</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
