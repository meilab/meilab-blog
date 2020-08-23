import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import Helmet from "react-helmet";

import Layout from "../components/Layout";
import "../styles/about-page.scss";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export const ComingPageTemplate = (props) => {
  const { page } = props;

  return (
    <div className="about">
      <div className="about-container  container">
        <section className="about-header">
          <div className="about-titleWrapper">
            <h1 className="about-title">{page.frontmatter.title}</h1>
          </div>
          <div className="about-imageWrapper">
            <PreviewCompatibleImage imageInfo={page.frontmatter.mainImage} />
            {/* <img
              src={page.frontmatter.mainImage.image}
              alt={page.frontmatter.mainImage.imageAlt}
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

const ComingPage = ({ data }) => {
  const { markdownRemark: page } = data;
  const {
    frontmatter: {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    },
  } = page;

  return (
    <Layout>
      <Helmet>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <title>{browserTitle}</title>
      </Helmet>
      <ComingPageTemplate page={{ ...page }} />
    </Layout>
  );
};

ComingPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ComingPage;

export const comingPageQuery = graphql`
  query ComingPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        mainImage {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          imageAlt
        }
        seo {
          browserTitle
          title
          description
        }
      }
    }
  }
`;
