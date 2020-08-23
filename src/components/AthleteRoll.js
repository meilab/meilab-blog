import React, { Component, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

function AthleteRoll({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  const emptyQuery = "";
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState(emptyQuery);

  useEffect(() => {
    setFilteredData(posts);
  }, []);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    // this is how we get all of our posts
    const posts = data.allMarkdownRemark.edges || [];
    // return all filtered posts
    const filteredData =
      newQuery === emptyQuery
        ? posts
        : posts.filter((post) => {
            // destructure data from post frontmatter
            const { description, name, number, tags } = post.node.frontmatter;
            return (
              // standardize data with .toLowerCase()
              // return true if the description, name or tags
              // contains the newQuery string
              description.toLowerCase().includes(newQuery.toLowerCase()) ||
              name.toLowerCase().includes(newQuery.toLowerCase()) ||
              number
                .toString()
                .toLowerCase()
                .includes(newQuery.toLowerCase()) ||
              (tags &&
                tags.join("").toLowerCase().includes(newQuery.toLowerCase()))
            );
          });
    // update state according to the latest newQuery and results
    setFilteredData(filteredData);
    setQuery(newQuery);
  };

  return (
    <div className="container">
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">
              <strong>{filteredData.length}</strong> 运动员
            </p>
          </div>
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="text"
                  aria-label="Search"
                  placeholder="输入姓名或编号"
                  onChange={handleInputChange}
                />
              </p>
              <p className="control">
                <button className="button">搜索</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-multiline">
        {filteredData &&
          filteredData.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`kids-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for athlete ${post.frontmatter.name}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.name}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    阅读更多 →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    </div>
  );
}

AthleteRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query AthleteRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "athlete-info" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                number
                description
                tags
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <AthleteRoll data={data} count={count} />}
  />
);
