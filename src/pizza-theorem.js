import React, { Component } from 'react';
import * as R from 'ramda';
import Radium from 'radium';

const SIZE = 100;
const CENTER = SIZE / 2;

/**
 * Pizza Theorem
 */
class PizzaTheorem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { x: 40, y: 60, n: 8 };
  }

  handleClick = (e) => {
    const x = e.clientX * SIZE / window.innerWidth;
    const y = e.clientY * SIZE / window.innerHeight;
    this.setState({x, y });
  }

  onChange = (e) => {
    this.setState({ n: e.target.value });
  }

  render() {

    const { x, y, n } = this.state;
    const viewBox = [0, 0, SIZE, SIZE].join(' ');
    const r = CENTER / 2;
    const p = 2 * Math.PI * r;
    const theta = p / n;

    const styles = {
      fill: 'none',
      stroke: '#04B3FF',
      strokeWidth: r * 2,
      strokeDasharray: R.repeat(theta, n).join(' ')
    };

    return (
      <div>
        <svg version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox={ viewBox }>

          <defs>
            <clipPath id="cut-off-bottom">
              <circle cx={ CENTER } cy={ CENTER }
                r={ r }/>
            </clipPath>
          </defs>

          <circle cx={ CENTER } cy={ CENTER }
            r={ r }
            fill="#001FFC"
            stroke="#001FFC"
            strokeWidth={ 2 } />

          <circle style={ styles }
            cx={ x } cy={ y }
            r={ r }
            clipPath="url(#cut-off-bottom)" />

          <circle cx={ CENTER } cy={ CENTER }
            r={ r }
            fill="#fff"
            opacity="0"
            style={{ cursor: 'crosshair' }}
            onClick={ this.handleClick }/>

        </svg>

        <form className="fixed bottom-0 left-0 col-12 mb4 center">
          <label htmlFor="slices"
            className="bold right-align">
            Slices ({ n })
          </label>
          <input id="slices"
            type="range"
            className="full-width range-light col-4 px2"
            min={ 8 }
            max={ 128 }
            step={ 4 }
            value={ n }
            onChange={ this.onChange } />
          <span className="col-3"></span>
        </form>
      </div>
    );

  }

};

export default PizzaTheorem;

