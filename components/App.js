const GIPHY_API_URL = 'http://api.giphy.com';
const GIPHY_PUB_KEY = 'He48tLDfG5pO5EUAQlhD6RvUfXFxHfzR';

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText);
  },

  getGif: function(searchingText) {
    const url = `${GIPHY_API_URL}/v1/gifs/random?api_key=${GIPHY_PUB_KEY}&tag=${searchingText}`;

    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log('There was a problemm with response. Status Code: ' + response.status);
          return;
        }
        response.json().then(data => {
          const gif = {
            url: data.data.fixed_width_downsampled_url,
            sourceUrl: data.data.url
          };
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
          });
        });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  },

  render: function() {
    const styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>GIFs search</h1>
        <p>
          Find GIFs on <a href="http://giphy.com">giphy</a>. Click Enter to download another gif.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif loading={this.state.loading} url={this.state.gif.url} sourceUrl={this.state.gif.sourceUrl} />
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
