import React from "react";
import { Link } from "gatsby";

import dailyCodingVideo from "../img/social/daily-coding-video.jpeg";
import dailyCodingWechat from "../img/social/daily-coding-wechat.jpeg";
import github from "../img/github-icon.svg";

const imgWidth = "8em";
const renderBlank = () => (
  <span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
);

const renderLink = () => (
  <>
    <div className="column is-4">
      <section className="menu">
        <ul className="menu-list">
          <li>
            <Link to="/" className="navbar-item">
              主页
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/about">
              关于小yi
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/projects">
              项目
            </Link>
          </li>
        </ul>
      </section>
    </div>
    <div className="column is-4">
      <section>
        <ul className="menu-list">
          <li>
            <Link className="navbar-item" to="/dailycoding">
              编程日课
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/twolang">
              程序员2郎
            </Link>
          </li>
          <li>
            <Link className="navbar-item" to="/kids">
              少儿编程
            </Link>
          </li>
        </ul>
      </section>
    </div>
  </>
);

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter">
        <div className="content has-text-centered">
          {/* <img
            src={logo}
            alt="Yoga"
            style={{ width: '14em', height: '10em' }}
          /> */}
          小yi是一名全栈工程师，从芯片开发到前后端开发都分别做过5年以上，有超过10年构建大型系统的经验。
        </div>
        <div className="content has-text-centered">
          <p>
            加微信<span>{renderBlank()}</span>关注视频号
          </p>
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns">
              {/* {renderLink()} */}
              <div className="column is-12 social">
                <img
                  src={dailyCodingWechat}
                  alt="dailyCodingWechat"
                  style={{ width: imgWidth, height: imgWidth, marginRight: 32 }}
                />
                <img
                  className="fas fa-lg"
                  src={dailyCodingVideo}
                  alt="dailyCodingVideo"
                  style={{ width: imgWidth, height: imgWidth, marginLeft: 32 }}
                />
                {/* <a title="微博" href="https://github.com">
                  <img
                    className="fas fa-lg"
                    src={github}
                    alt="github"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
