import React from "react";
import PropTypes from "prop-types";
import { DailycodingPostTemplate } from "../../templates/dailycoding-post";

const DailycodingPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <DailycodingPostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

DailycodingPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default DailycodingPreview;
