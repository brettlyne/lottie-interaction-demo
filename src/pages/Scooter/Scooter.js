import React, { Fragment } from "react";
import lottieLight from "lottie-web/build/player/lottie_light";
import Highlight from 'react-highlight'

import * as animationData from './scooter-lottie-data.json';
import playButtonSVG from '../../images/play-button.svg';

class Scooter extends React.Component {
  componentDidMount() {
    const lottieParams = {
      container: document.getElementById('lottie-scooter'),
      renderer: 'svg',
      autoplay: false, 
      animationData: animationData,
    };    
    this.anim = lottieLight.loadAnimation(lottieParams);
  }

  // Play animation to frame 360 and stop
  playChapter1 = () => {
    this.anim.loop = false; // ONLY NEEDED FOR THIS DOCUMENTATION IN CASE SOMEONE GOES BACKWARDS
    this.anim.playSegments([0,360], true);
  }

  // Play frames 465 to 612, then loop 612 to 870
  playChapter2 = () => {
    this.anim.loop = true;
    this.anim.playSegments([465,612], true);
    this.anim.playSegments([612,870], false);
  }  

  // Play frames 870 to 1020 (without looping)
  playChapter3 = () => {
    this.anim.loop = false;
    this.anim.playSegments([870,1020], false);
  }  

  render() {
    return (
      <Fragment>
        <div id="lottie-scooter"></div>
        <div className="content">
          <h1>Controlling Lottie Animations in JavaScript</h1>

          <section>
            <h3>Lottie import</h3>
            <Highlight className='javascript'>
{`// lottie_light player only supports SVG rendering and doesn't support expressions
// lottie_light player is ~40k gzipped compared with ~60k for full lottie player
import lottieLight from "lottie-web/build/player/lottie_light";
import * as animationData from './scooter-lottie-data.json';`}
            </Highlight>            
          </section>


          <section>
            <h3>Initial Setup</h3>
            <Highlight className='javascript'>
{`componentDidMount() {
  const lottieParams = {
    container: document.getElementById('lottie-scooter'),
    renderer: 'svg',
    autoplay: false, 
    animationData: animationData,
  };    
  this.anim = lottieLight.loadAnimation(lottieParams);
  this.playChapter1();
}`}          </Highlight>

          </section>

          <section>
            <h3>1: Play first segment of animation and stop</h3>
            <Highlight className='javascript'>
{`// Play animation to frame 360 and stop
playChapter1 = () => {
  this.anim.playSegments([0,360], true);
}`}
            </Highlight>
            <img class="play-button" src={playButtonSVG} alt="play button" onClick={this.playChapter1}/>
          </section>

          <section>
            <h3>2: Transition to loading and begin looping</h3>
            <Highlight className='javascript'>
{`// Play frames 465 to 612, then loop 612 to 870
playChapter2 = () => {
  this.anim.loop = true;
  this.anim.playSegments([465,612], true);
  this.anim.playSegments([612,870], false);
}`}
            </Highlight>
            <img class="play-button" src={playButtonSVG} alt="play button" onClick={this.playChapter2}/>
          </section>

          <section>
            <h3>3: Play final segment of animation when the current loop ends</h3>
            <Highlight className='javascript'>
{`// Play frames 870 to 1020 (without looping)
playChapter3 = () => {
  this.anim.loop = false;
  this.anim.playSegments([870,1020], false);
}`}
            </Highlight>
            <img class="play-button" src={playButtonSVG} alt="play button" onClick={this.playChapter3}/>
          </section>
          <section>
            <h3>Links</h3>
            <p>
              <a href="https://github.intuit.com/sbg-prototypes/lottie-interaction-demo">GitHub</a> for this demo<br/>
              <a href="https://github.com/airbnb/lottie-web#usage">Lottie Web API Docs</a>
            </p>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Scooter;
