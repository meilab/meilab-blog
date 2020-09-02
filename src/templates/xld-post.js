import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import MessageList from "../components/Message/MessageList";
import MessageBox from "../components/Message/MessageBox";
// import "react-chat-elements/dist/main.css";
import xldImg from "../img/xld.png";
import profile from "../img/profile.jpeg";

export const XldPostTemplate = ({
  content,
  contentComponent,
  date,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  let str = content.replace("<p>","")
  str = str.replace("</p>","")
  const msgs = JSON.parse(str)
  const dataSource = msgs.map((item)=> {
    let message = {}
    if(item.role === 'daddy'){
      message = {
        position: "left",
        forwarded: true,
        avatar: profile,
        type: "text",
        view: "list",
        text:item.msg,
      };
    } else {
      message = {
        position: "right",
        theme: "green",
        avatar: xldImg,
        type: "text",
        text:item.msg,
      };
    }

    return message;
  })

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div
          style={{ justifyContent: "center", alignItems: "center" }}
          className="columns"
        >
          <div className="column is-6">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <div className="blog-date">{date}</div>
            <MessageList
              className="message-list"
              lockable={true}

              toBottomHeight={"100%"}
              dataSource={dataSource}
            />
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

XldPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  date: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
};

const XldPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <XldPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | 程序员2郎">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.html}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

XldPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default XldPost;

export const pageQuery = graphql`
  query XldPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
