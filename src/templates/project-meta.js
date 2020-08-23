import React, { Component } from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import "../styles/project.scss";

import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

class ProjectMetaInfoTemplate extends Component {
  render() {
    return (
      <section
        className={`game  ${this.props.className && this.props.className}`}
        key={this.props.game.rawDate}
      >
        <h2 className="game-title">
          <Link className="game-title" to={this.props.slug}>
            {this.props.game.title}
          </Link>
        </h2>
        <div className="project-meta">
          <p className="project-metaField  project-metaField--date">
            <span className="game-label">日期:</span>{" "}
            {this.props.game.formattedDate}
          </p>
          <p className="project-metaField  project-metaField--location">
            <span className="game-label">地点:</span>{" "}
            {this.props.game.location.name}
          </p>
        </div>
        <div className="game-events">
          {this.props.game.events.map((presenter) => (
            <div className="game-presenter" key={presenter.name}>
              <div className="game-presenterImageContainer">
                <div
                  style={{ width: "300px", height: "auto" }}
                  className="game-presenterImage"
                >
                  <PreviewCompatibleImage imageInfo={presenter} />
                </div>
                <span className="game-presenterName">{presenter.name}</span>
              </div>
              <div className="game-presenterInfo">
                {presenter.eventDescription && (
                  <h3 className="game-presenterTitle">
                    {presenter.eventDescription}
                  </h3>
                )}
                <p className="game-presenterText">{presenter.text}</p>
                <ul className="game-presenterLinks">
                  {presenter.links &&
                    presenter.links.map((link, index) => (
                      <li key={index} className="game-presenterLinkItem">
                        <a className="game-presenterLink" href={link.linkURL}>
                          {link.linkText}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

ProjectMetaInfoTemplate.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    events: PropTypes.array,
  }),
};

export default ProjectMetaInfoTemplate;
