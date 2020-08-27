import React from "react";
import PropTypes from "prop-types";
import { XldPostTemplate } from "../../templates/xld-post";

const XldPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <XldPostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

XldPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default XldPreview;
