import './About.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Space } from 'antd';
import github from '../assets/github.svg';
import rsSchool from '../assets/rs_school_js.svg';
import { TEAM_INFO, DEVELOPERS_INFO } from '../constants/info';

const About = () => {
  return (
    <>
      <Typography.Paragraph>
        <Typography.Title className="about-header">Our team</Typography.Title>
        <Typography.Paragraph className="about-text">{TEAM_INFO}</Typography.Paragraph>
      </Typography.Paragraph>
      <Space wrap align={'start'}>
        {DEVELOPERS_INFO.map(
          ({ name, portrait, githubLink, role, age, education, job, details, location, contribution }, index) => {
            const lines = [
              ['Age:', age],
              ['Location', location],
              ['Education:', education],
              ['Employment:', job],
              ['Contribution:', contribution],
              ['', details],
            ];
            return (
              <div key={`contaner-${index}`}>
                <div className="about-container" key={`about-container-${index}`}>
                  <div className="about-shaped" key={`about-shaped-${index}`}>
                    <img src={portrait} alt="photo" className="about-portrait" key={`about-portrait-${index}`} />
                    <Typography.Text className="about-portrait-title" key={`about-portrait-title-${index}`}>
                      <Link to={githubLink}>
                        {name}
                        <img src={github} alt="github link" className="about-github" key={`about-github-${index}`} />
                      </Link>
                    </Typography.Text>
                    <Typography.Text type="secondary" italic={true}>
                      {role}
                    </Typography.Text>
                  </div>
                  {lines.map(([title, info], lineIndex) => (
                    <Typography.Paragraph
                      className="about-context-right"
                      key={`about-context-right${index}-${lineIndex}`}
                    >
                      {title && (
                        <Typography.Text
                          className="about-text"
                          key={`about-text%{index}-${lineIndex}`}
                          italic={true}
                          strong={true}
                        >
                          {title}
                        </Typography.Text>
                      )}
                      <Typography.Text className="about-text" key={`about-text${index}-${lineIndex}`} italic={true}>
                        {info}
                      </Typography.Text>
                    </Typography.Paragraph>
                  ))}
                </div>
                <div className="about-container-bottom" key={`about-container2-${index}`}>
                  {lines.map(([title, info], lineIndex) => (
                    <Typography.Paragraph
                      className="about-context-bottom"
                      key={`about-context-bottom${index}-${lineIndex}`}
                    >
                      {title && (
                        <Typography.Text
                          className="about-text"
                          key={`about-text%{index}-${lineIndex}`}
                          italic={true}
                          strong={true}
                        >
                          {title}
                        </Typography.Text>
                      )}
                      <Typography.Text className="about-text" key={`about-text${index}-${lineIndex}`} italic={true}>
                        {info}
                      </Typography.Text>
                    </Typography.Paragraph>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </Space>
      <Typography.Paragraph>
        <Link to="https://rs.school/js/">
          <img className="about-logo" alt="rs_school logo" src={rsSchool} />
        </Link>
      </Typography.Paragraph>
    </>
  );
};

export default About;
