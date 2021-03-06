const GIPHY_API_URL = 'http://api.giphy.com';
const GIPHY_PUB_KEY = ''


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
    this.getGif(searchingText, function(gif) {  
      this.setState({  
        loading: false,  
        gif: gif,  
        searchingText: searchingText  
      });
    }.bind(this));
  },

  getGif: function(searchingText, callback) {  
    const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
    const xhr = new XMLHttpRequest();  
    xhr.open('GET', url);
    xhr.onload = function() {
        if (xhr.status === 200) {
           const data = JSON.parse(xhr.responseText).data; 
           const gif = {  
                url: data.fixed_width_downsampled_url,
                sourceUrl: data.url
            };
            callback(gif); 
        }
    };
    xhr.send();
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
          <p>Find GIFs on <a href='http://giphy.com'>giphy</a>. Click Enter to download another gif.</p>
          <Search onSearch={this.handleSearch}/>
          <Gif
            loading={this.state.loading}
            url={this.state.gif.url}
            sourceUrl={this.state.gif.sourceUrl}
          />
        </div>
      );
  }
});


ReactDOM.render(<App/>, document.getElementById('app'));