import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import "../styles/blog.scss";

function XldRoll({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="blog-content">
      <div className="blog-content-container">
        {posts &&
          posts.map(({ node: post }) => (
            <Link className="blog-item" key={post.id} to={post.fields.slug}>
              <div className="blog-title">{post.frontmatter.title}</div>
              <div className="blog-date">{post.frontmatter.date}</div>
              <div className="blog-description">{post.html}</div>
            </Link>
          ))}
      </div>
    </div>
  );
}

XldRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query XldRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "xld-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              html
              fields {
                slug
              }
              frontmatter {
                title
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
    render={(data, count) => <XldRoll data={data} count={count} />}
  />
);
