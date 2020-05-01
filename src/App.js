import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download'

import './App.css'

class App extends Component {
    
    constructor(){
        super()
        this.state = {
            audioLink: "",
            videoLink: "",
        }
        this.handleInputChangeVideoLink = this.handleInputChangeVideoLink.bind(this)
        this.handleSubmitYoutubeVideo = this.handleSubmitYoutubeVideo.bind(this)
        this.handleSubmitYoutubeAudio = this.handleSubmitYoutubeAudio.bind(this)
        this.handleInputChangeAudioLink = this.handleInputChangeAudioLink.bind(this)
    }

    handleInputChangeVideoLink(event){
        this.setState({ videoLink: event.target.value })
    }

    handleInputChangeAudioLink(event){
        this.setState({ audioLink: event.target.value })
    }

    downloadVideo = () => {
        axios.get('https://youtube-video-audio-downloader.herokuapp.com/downloadVideo',{
            params: { videoLink: this.state.videoLink },
            responseType: "blob"
        }).then(response => {
            fileDownload(response.data, "Youtube-Video.mp4")
        }).catch(err => console.log(err))
    }

    downloadAudio = () => {
        axios.get("https://youtube-video-audio-downloader.herokuapp.com/downloadAudio",{
            params: { audioLink: this.state.audioLink},
            responseType: "blob"
        }).then(response => {
            fileDownload(response.data, "Youtube-Audio.mp3")
        }).catch(err => console.log(err))
    }
    
    handleSubmitYoutubeVideo = function(event){
        event.preventDefault()
        this.downloadVideo()
    }    

    handleSubmitYoutubeAudio = function(event){
        event.preventDefault()
        this.downloadAudio()
    }

    render() { 
        return ( 
            <div className="main">
                <h1 className="header" >Download YouTube videos with a click</h1>
                <div className="downloader">
                    <form onSubmit={ this.handleSubmitYoutubeVideo } className="youtubeVideo" >
                        <input className="videoLink" type="text" placeholder="Audio and Video" name="videoLink" value={ this.state.videoLink } onChange={ this.handleInputChangeVideoLink } />
                        <button type="submit" className="buttonSubmit" ><i class="fa fa-download" aria-hidden="true"></i></button>
                    </form>
                    <form onSubmit={ this.handleSubmitYoutubeAudio } className="youtubeAudio" >
                        <input className="audioLink" type="text" placeholder="Only Audio" name="audioLink" value={ this.state.audioLink } onChange={ this.handleInputChangeAudioLink } />
                        <button type="submit" className="buttonSubmit" ><i class="fa fa-download" aria-hidden="true"></i></button>
                    </form>
                </div>                
                
            </div>    
        );
    }
}
 
export default App;