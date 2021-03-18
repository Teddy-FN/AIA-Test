import React, { Component } from 'react'
import { Container, Paper, Grid, Button } from '@material-ui/core'
import '../style/Photos.css'

export default class Photos extends Component {
    constructor() {
        super()
        this.state = {
            pictures: [],
            textInput: 'dog'
        };
    }

    componentDidMount() {
        this.getImages()
    }

    getImages = () => {
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_APP}&tags=${this.state.textInput}&format=json&nojsoncallback=20`)
            .then((res) => {
                console.log('API', res)
                return res.json();
            })
            .then((items) => {
                let picArray = items.photos.photo.map((pic) => {
                    var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
                    return (
                        <img alt="images" src={srcPath} />
                    )
                })
                this.setState({ pictures: picArray });
            })
    }

    handleChange = e => {
        this.setState({
            textInput: e.target.value
        })
    }

    Delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();
    render() {
        return (
            <Container maxWidth="lg" >
                <div className="search-bar">
                    <h1 className="text">Seacrh image down here!</h1>
                    <input
                        id="standard-basic"
                        label="Standard"
                        onChange={this.handleChange}
                        onKeyUp={() => this.Delay(() => {
                            this.getImages();
                        }, 1000)}
                        className="search-input"
                    />
                </div>
                <div className="container">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className="photo">
                                {this.state.pictures}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
                <Button></Button>
            </Container>

        )
    }
}