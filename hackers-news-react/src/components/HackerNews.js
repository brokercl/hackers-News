import React, { Component } from 'react';
import  imageWeb from '../images/imagen-www_opt.jpg';
class HackerNews extends React.Component {
    render() {
        return (
            <div>
                <img src={imageWeb} width="500" height="250" />
                <h3>Hi everyone, let me tell you what hackers news is about.. </h3>
                <h4></h4>
                 <p>if you are interested in a particular website and you want it to share it
                    then create a user in login at your top corner right
                    then publish the site, example http://www.abandonsocios.org and let a description
                    finally to vote for your website climbing up to the top ten rankings
                    when you login, press the little triangle next to the website number
                    have fun !!</p>
            </div>
         )
    }
}

export default HackerNews