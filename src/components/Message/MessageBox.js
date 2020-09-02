import React, { Component } from "react";
import "./MessageBox.css";

import ReplyMessage from "./ReplyMessage";

import Avatar from "./Avatar";

import classNames from "classnames";

export class MessageBox extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.focus !== this.props.focus && nextProps.focus === true) {
      if (this.refs["message"]) {
        this.refs["message"].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });

        this.props.onMessageFocused(nextProps);
      }
    }
  }

  renderDummy () {
    return <div className="dummy"></div>
  }

  render() {
    var positionCls = classNames("rce-mbox", {
      "rce-mbox-right": this.props.position === "right",
    });
    var thatAbsoluteTime =
      this.props.type !== "text" &&
      this.props.type !== "file" &&
      !(this.props.type === "location" && this.props.text);

    return (
      <div className='msgGoup'>
        {this.props.position !== 'right' ? <Avatar
                      letterItem={this.props.letterItem}
                      src={this.props.avatar}
                      className="xlarge"
                    /> : this.renderDummy()}
      <div
        ref="message"
        className={classNames("rce-container-mbox", this.props.position, this.props.className)}
        onClick={this.props.onClick}
      >
                           {this.props.notch &&
                        (this.props.position !== "right" && (
                          <div>
                            <svg
                              className={classNames("rce-mbox-left-notch", {
                                "message-focus": this.props.focus,
                              })}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <defs>
                                <filter id="filter1" x="0" y="0">
                                  <feOffset
                                    result="offOut"
                                    in="SourceAlpha"
                                    dx="-2"
                                    dy="-5"
                                  />
                                  <feGaussianBlur
                                    result="blurOut"
                                    in="offOut"
                                    stdDeviation="3"
                                  />
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="blurOut"
                                    mode="normal"
                                  />
                                </filter>
                              </defs>
                              <path d="M20 0v20L0 0" filter="url(#filter1)" />
                            </svg>
                          </div>
                        ))
        }
        {this.props.renderAddCmp instanceof Function &&
          this.props.renderAddCmp()}
        {(
          <div
            className={classNames(
              positionCls,
              { "rce-mbox--clear-padding": thatAbsoluteTime },
              { "rce-mbox--clear-notch": !this.props.notch },
              { "message-focus": this.props.focus },
            )}
          >
            <div
              className="rce-mbox-body"
              onContextMenu={this.props.onContextMenu}
            >
              {(this.props.title || this.props.avatar) && (
                <div
                  style={
                    this.props.titleColor && { color: this.props.titleColor }
                  }
                  onClick={this.props.onTitleClick}
                  className={classNames("rce-mbox-title", {
                    "rce-mbox-title--clear": this.props.type === "text",
                  })}
                >
                  {/* {this.props.avatar && (
                    <Avatar
                      letterItem={this.props.letterItem}
                      src={this.props.avatar}
                      className="xlarge"
                    />
                  )} */}
                  {this.props.title && <span>{this.props.title}</span>}
                </div>
              )}

              {this.props.reply && (
                <ReplyMessage
                  photoURL={this.props.reply.photoURL}
                  title={this.props.reply.title}
                  titleColor={this.props.reply.titleColor}
                  message={this.props.reply.message}
                  onClick={this.props.onReplyMessageClick}
                />
              )}

              {this.props.type === "text" && (
                <div className="rce-mbox-text">{this.props.text}</div>
              )}
            </div>

          </div>)}
                     {this.props.notch &&
                        (this.props.position === "right" && (
                          <svg
                            className={classNames("rce-mbox-right-notch", {
                              "message-focus": this.props.focus,
                            })}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M0 0v20L20 0" />
                          </svg>
                        ))
        }
      </div>
      {this.props.position === 'right' ? <Avatar
                      letterItem={this.props.letterItem}
                      src={this.props.avatar}
                      className="xlarge"
                    />: this.renderDummy()}
      </div>
    );
  }
}

MessageBox.defaultProps = {
  position: "left",
  type: "text",
  text: "",
  title: null,
  titleColor: null,
  onTitleClick: null,
  onForwardClick: null,
  onReplyClick: null,
  onReplyMessageClick: null,
  date: new Date(),
  data: {},
  onClick: null,
  onOpen: null,
  onDownload: null,
  onLoad: null,
  onPhotoError: null,
  forwarded: false,
  reply: false,
  status: null,
  dateString: null,
  notch: true,
  avatar: null,
  renderAddCmp: null,
  copiableDate: false,
  onContextMenu: null,
  focus: false,
  onMessageFocused: null,
};

export default MessageBox;
