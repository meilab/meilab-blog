import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";
import Content, { HTMLContent } from "../components/Content";
import { lengthShow } from "../constant";
import "../styles/blog.scss";

function BlogRoll({ data, short }) {
  const { edges: posts } = data.allMarkdownRemark;
  const len = short ? Math.min(posts.length, lengthShow) : posts.length;
  const content = posts && posts.slice(0, len - 1);

  return (
    <div className="blog-content">
      <div className="blog-content-container">
        {content.map(({ node: post }) => (
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

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default ({ short = false }) => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
    render={(data, count) => (
      <BlogRoll data={data} count={count} short={short} />
    )}
  />
);
