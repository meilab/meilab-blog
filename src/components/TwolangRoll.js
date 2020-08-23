import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import "../styles/blog.scss";

function TwolangRoll({ data }) {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="blog-content">
      <div className="blog-content-container">
        {posts &&
          posts.map(({ node: post }) => (
            <Link className="blog-item" key={post.id} to={post.fields.slug}>
              <div className="blog-title">{post.frontmatter.title}</div>
              <div className="blog-date">{post.frontmatter.date}</div>
              <div className="blog-description">
                {post.frontmatter.description}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

TwolangRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query TwolangRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "twolang-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                description
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
    render={(data, count) => <TwolangRoll data={data} count={count} />}
  />
);
