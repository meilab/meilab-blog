import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Helmet from "react-helmet";
import isAfter from "date-fns/is_after";

import Layout from "../components/Layout";
// import Map from "../components/Map";
import CustomLink from "../components/CustomLink";
import "../styles/home.scss";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import KidsRoll from "../components/kidsRoll";
import DailycodingRoll from "../components/DailycodingRoll";
import TwolangRoll from "../components/TwolangRoll";
import ProjectRoll from "../components/ProjectRoll";

export const HomePageTemplate = ({ home, upcomingGame = null }) => {
  const events = upcomingGame && upcomingGame.events;
  const latitude =
    upcomingGame && parseFloat(upcomingGame.location.mapsLatitude);
  const longitude =
    upcomingGame && parseFloat(upcomingGame.location.mapsLongitude);

  return (
    <>
      <section className="header">
        <div
          className="header-container container"
          style={{
            maxWidth: "100%",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundImage: `url('/img/yoga-hero.jpg')`,
          }}
        >
          {home.headerImage && (
            <div
              style={{ width: "300px", height: "auto" }}
              className="upcomingGame-presenterImage"
            >
              <PreviewCompatibleImage imageInfo={home.headerImage} />
            </div>
          )}
          <h3 className="header-tagline">
            <span className="header-taglinePart">{home.title}</span>
          </h3>
        </div>
      </section>
      <section className="trainings section">
        <div className="trainings-container columns container">
          <div className="column is-12">
            <h3 className="trainings-title has-text-weight-semibold is-size-2">
              编程日课
            </h3>
            <DailycodingRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/dailycoding">
                更多日课
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="projects section">
        <div className="game-container columns container">
          <div className="column is-12">
            <h3 className="projects-title has-text-weight-semibold is-size-2">
              项目
            </h3>
            <ProjectRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/dailycoding">
                更多项目
              </Link>
            </div>
          </div>
        </div>
      </section> */}
      <section className="trainings section">
        <div className="trainings-container columns container">
          <div className="column is-12">
            <h3 className="trainings-title has-text-weight-semibold is-size-2">
              程序员2郎的日常
            </h3>
            <TwolangRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/dailycoding">
                更多日常
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="ctaBlock">
        <CustomLink
          linkType={home.callToActions.firstCTA.linkType}
          linkURL={home.callToActions.firstCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--first"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">
              {home.callToActions.firstCTA.heading}
            </span>
            <p className="ctaBlock-ctaDescription">
              {home.callToActions.firstCTA.subHeading}
            </p>
          </div>
        </CustomLink>
        <CustomLink
          linkType={home.callToActions.secondCTA.linkType}
          linkURL={home.callToActions.secondCTA.linkURL}
          className="ctaBlock-pattern  ctaBlock-pattern--second"
        >
          <div className="ctaBlock-cta">
            <span className="ctaBlock-ctaHeading">
              {home.callToActions.secondCTA.heading}
            </span>
            <p className="ctaBlock-ctaDescription">
              {home.callToActions.secondCTA.subHeading}
            </p>
          </div>
        </CustomLink>
      </section>
      {/* <section className="trainings  section">
        <div className="kids-container columns container">
          <div className="column is-12">
            <h3 className="trainings-title has-text-weight-semibold is-size-2">
              少儿编程
            </h3>
            <KidsRoll />
            <div className="column is-12 has-text-centered">
              <Link className="btn" to="/kids">
                更多少儿编程
              </Link>
            </div>
          </div>
        </div>
      </section>
      {home.cooperation.gallery.length > 0 && (
        <section className="cooperation section">
          <h2 className="cooperation-title">{home.cooperation.title}</h2>
          <div className="cooperation-container">
            <div className="cooperation-list">
              {home.cooperation.gallery.map((galleryImage, index) => (
                <div key={index} className="cooperation-list-item">
                  <PreviewCompatibleImage imageInfo={galleryImage} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )} */}
    </>
  );
};

class HomePage extends React.Component {
  render() {
    const { data } = this.props;
    const {
      data: { footerData, navbarData },
    } = this.props;
    const { frontmatter: home } = data.homePageData.edges[0].node;
    const {
      seo: { title: seoTitle, description: seoDescription, browserTitle },
    } = home;
    let upcomingGame = null;
    // Find the next meetup that is closest to today
    data.allMarkdownRemark.edges.every((item) => {
      const { frontmatter: meetup } = item.node;
      if (isAfter(meetup.rawDate, new Date())) {
        upcomingGame = meetup;
        return true;
      } else {
        return false;
      }
    });
    return (
      <Layout>
        <Helmet>
          <meta name="title" content={seoTitle} />
          <meta name="description" content={seoDescription} />
          <title>{browserTitle}</title>
        </Helmet>
        <HomePageTemplate home={home} upcomingGame={upcomingGame} />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { events: { elemMatch: { text: { ne: null } } } } }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          frontmatter {
            title
            formattedDate: date(formatString: "MMMM Do YYYY @ h:mm A")
            rawDate: date
            events {
              name
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              text
              eventDescription
            }
            location {
              mapsLatitude
              mapsLongitude
              mapsLink
              name
            }
          }
        }
      }
    }
    homePageData: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "index-page" } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            headerImage {
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageAlt
            }
            cooperation {
              title
              gallery {
                image {
                  childImageSharp {
                    fluid(maxWidth: 2048, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                imageAlt
                name
              }
            }
            callToActions {
              firstCTA {
                heading
                subHeading
                linkType
                linkURL
              }
              secondCTA {
                heading
                subHeading
                linkType
                linkURL
              }
            }
            seo {
              browserTitle
              title
              description
            }
          }
        }
      }
    }
  }
`;
