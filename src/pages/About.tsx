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
        {DEVELOPERS_INFO.map(({ name, text, portrait, githubLink }) => {
          return (
            <div className="about-container">
              <div className="about-shaped">
                <img src={portrait} alt="photo" className="about-portrait" />
                <Typography.Text className="about-portrait-title">
                  <a href={githubLink}>
                    {name}
                    <img src={github} alt="github link" className="about-github" />
                  </a>
                </Typography.Text>
              </div>
              <Typography.Text className="about-text">{text}</Typography.Text>
            </div>
          );
        })}
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
