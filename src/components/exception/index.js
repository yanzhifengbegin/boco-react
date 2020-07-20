import React, { Component } from "react";

import "./index.less";

export default class FlayAway extends Component {
  render() {
    return (
      <div className="flay-away-box">
        <div>
          {/* <div className='flay-away-icon'>
                        <IconSvg type='yemiancuowu'></IconSvg>
                    </div> */}
          <div className="flay-away-text">页面飞走了</div>
        </div>
      </div>
    );
  }
}
