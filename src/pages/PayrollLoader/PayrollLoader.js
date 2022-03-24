import React, { Fragment, useEffect, useRef, useState } from "react";
import lottieLight from "lottie-web/build/player/lottie_light";
import IndeterminateLong from '@ids/indeterminate-long';
import Button from '@ids/button';
import Highlight from 'react-highlight'

import * as animationData from './loading_long.json';

// const loaderSections = [
//   { label: 'Running the numbers', startFrame: 0, endFrame: 149 },
//   { label: 'Adding in deductions', startFrame: 150, endFrame: 299 },
//   { label: 'Taking out taxes', startFrame: 300, endFrame: 449 },
//   { label: 'Wrapping up', startFrame: 450, endFrame: 598 },
// ];

const PayrollLoader = () => {
  const loaderEl = useRef(null);
  const animEl = useRef(null);
  const debugEl = useRef(null);
  const introTimeout = useRef(null);
  const myAnimation = useRef(null);

  const [spinnerTimestamp, setSpinnerTimestamp] = useState(Date.now());
  const [state, setState] = useState('intro');

  useEffect(() => {
    reset();
  }, []);

  const reset = () => {
    const lottieSettings = {
      container: animEl.current,
      animationData,
      autoplay: false
    }
    setState('intro');
    setSpinnerTimestamp(Date.now());
    myAnimation.current && myAnimation.current.destroy();
    myAnimation.current = lottieLight.loadAnimation(lottieSettings);
    introTimeout.current = setTimeout(() => {
      startLottie();
    }, 1700);
    loaderEl.current.classList.remove('fade-out')
    debugEl.current.innerHTML = "running..."

  }

  const startLottie = () => {
    myAnimation.current.playSegments([0, 598], true);
    setState('lottie')
  }

  const exit = () => {
    loaderEl.current.classList.add('fade-out')
    setTimeout(() => {
      setState('reset')
    }, 500); // reset AFTER fade-out completes
  }

  const triggerTaskComplete = () => {
    setState('exiting');

    if (state === 'intro') {
      debugEl.current.innerHTML = "complete during loader spin-up: fade out after spin-up without playing lottie"
      clearTimeout(introTimeout.current);
      const timeToFinishIntro = 1800 - (Date.now() - spinnerTimestamp)
      setTimeout(() => {
        exit()
      }, timeToFinishIntro);
    }

    if (state === 'lottie') {
      const currFrame = myAnimation.current.currentFrame;
      if (currFrame > 590) {
        debugEl.current.innerHTML = "complete after animation finished: fade out immediately"
        exit();
      } else {
        // only first 3 animations exit && since each animation is 150 frames, check if we're in the last 30 frames
        const exiting = currFrame < 450 && currFrame % 150 > 120;
        if (exiting) {
          debugEl.current.innerHTML = "complete during an exit animation: fade out after next exit frame"
          // if exiting, finish playing the exit 
          const exitFinishFrame = currFrame + (150 - currFrame % 150);
          myAnimation.current.playSegments([currFrame, exitFinishFrame], true);
        } else {
          debugEl.current.innerHTML = "complete during animation: fade out before next exit frame"
          const justBeforeNextExit = currFrame + (120 - currFrame % 150);
          myAnimation.current.playSegments([currFrame, justBeforeNextExit], true);
        }
        // after done with the previous step, fade to next state
        myAnimation.current.addEventListener('complete', exit);
      }
    }
  }

  return (
    <div>
      <div ref={loaderEl} id="lottie-div" style={{ width: '200px', height: '200px', border: 'none' }}>
        <IndeterminateLong key={spinnerTimestamp} theme="quickbooks" />
        <div ref={animEl} style={{ position: 'absolute', top: '0px', bottom: '0px' }}></div>
      </div>
      <div className="content" style={{ marginLeft: '240px', maxWidth: '700px' }}>
        <h1>Handling an Interrupted Loading Animation</h1>

        <section>
          <h3>Why?</h3>
          <p>For this Payroll Loader example, we don't know how long the task will take on the server. When the task is complete, we want to finish up the loading experience in a way that feels natural, but doesn't cause too much delay.</p>
        </section>

        <section>
          <h3>Animation Sections</h3>
          <p>The lottie file has 4 distinct sections we can see in the code below:</p>
          <Highlight className='javascript'>
            {`const loaderSections = [
  {label: 'Running the numbers',  startFrame: 0,   endFrame: 149 },
  {label: 'Adding in deductions', startFrame: 150, endFrame: 299 },
  {label: 'Taking out taxes',     startFrame: 300, endFrame: 449 },
  {label: 'Wrapping up',          startFrame: 450, endFrame: 598 },
];`}
          </Highlight>
          <p>There is also a delay before the first section starts for the IndeterminateLong spinner to rotate in.</p>
        </section>

        <section>
          <h3>Demo</h3>
          <Button theme="quickbooks" onClick={reset} buttonType="secondary" disabled={state !== 'reset'}>Reset</Button>
          <div style={{ display: 'inline-block', width: '20px' }}></div>
          <Button theme="quickbooks" onClick={triggerTaskComplete} disabled={state === 'exiting' || state === 'reset'} >Task Completed</Button>
          <div style={{ display: 'inline-block', width: '20px' }}></div>
          <pre ref={debugEl} ></pre>
        </section>

        <section>
          <h3>Explanation</h3>
          <p>The loader now fades out over 500ms before loading the next state. This makes the transition feel more intentional and less jarring.</p>
          <p>If the task completes during IndeterminateLong spin-up, we let the spin-up finish before we fade to the next page, but we never start the Lottie animation.</p>
          <p>If the entire animation has played, we fade to next step immediately.</p>
          <p>For the other animation sections, each exit animation (when the icon scales back to 0) takes about 30 frames. If we finish during an exit animation, play until the exit finishes, then fade to the next state.</p>
          <p>If we finish before the exit animation starts, play until just before the exit animation starts, stop the animation, then fade to the next state.</p>
        </section>

        <section>
          <h3>Code for Demo</h3>
          <Highlight className='javascript'>
            {`const reset = () => {
  const lottieSettings = {
    container: animEl.current,
    animationData,
    autoplay: false
  }
  setState('intro');
  setSpinnerTimestamp(Date.now());
  myAnimation.current && myAnimation.current.destroy();
  myAnimation.current = lottieLight.loadAnimation(lottieSettings);
  introTimeout.current = setTimeout(() => {
    startLottie();
  }, 1700);
  loaderEl.current.classList.remove('fade-out')
  debugEl.current.innerHTML = "running..."
}

const startLottie = () => {
  myAnimation.current.playSegments([0, 598], true);
  setState('lottie')
}

const exit = () => {
  loaderEl.current.classList.add('fade-out')
  setTimeout(() => {
    setState('reset')
  }, 500); // reset AFTER fade-out completes
}

const triggerTaskComplete = () => {
  setState('exiting');

  if (state === 'intro') {
    debugEl.current.innerHTML = "complete during loader spin-up: fade out after spin-up without playing lottie"
    clearTimeout(introTimeout.current);
    const timeToFinishIntro = 1800 - (Date.now() - spinnerTimestamp)
    setTimeout(() => {
      exit()
    }, timeToFinishIntro);
  }

  if (state === 'lottie') {
    const currFrame = myAnimation.current.currentFrame;
    if (currFrame > 590) {
      debugEl.current.innerHTML = "complete after animation finished: fade out immediately"
      exit();
    } else {
      // only first 3 animations exit && since each animation is 150 frames, check if we're in the last 30 frames
      const exiting = currFrame < 450 && currFrame % 150 > 120;
      if (exiting) {
        debugEl.current.innerHTML = "complete during an exit animation: fade out after next exit frame"
        // if exiting, finish playing the exit 
        const exitFinishFrame = currFrame + (150 - currFrame % 150);
        myAnimation.current.playSegments([currFrame, exitFinishFrame], true);
      } else {
        debugEl.current.innerHTML = "complete during animation: fade out before next exit frame"
        const justBeforeNextExit = currFrame + (120 - currFrame % 150);
        myAnimation.current.playSegments([currFrame, justBeforeNextExit], true);
      }
      // after done with the previous step, fade to next state
      myAnimation.current.addEventListener('complete', exit);
    }
  }
}`}
          </Highlight>
        </section>

      </div>
    </div>
  );
};

export default PayrollLoader;
