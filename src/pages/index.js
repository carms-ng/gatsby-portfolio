import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import Icons from '../components/Icons';

import Layout from '../components/Layout';
import Seo from '../components/seo';
import {
  HeroStyles, AboutStyles, ProjectStyles, ContactStyles,
} from '../styles/IndexPageStyles';
import Projects from '../components/Projects';

// Data
import allTools from '../assets/data/allTools.json';
import values from '../assets/data/values.json';
import projects from '../assets/data/projects.json';

export default function IndexPage({ data }) {
  // Prepare Data
  const favorites = allTools.filter((tool) => tool.favorite);
  const workProjects = projects.filter((project) => !project.isHobby);
  const hobbies = projects.filter((project) => project.isHobby);

  // Handle tools
  const [favoritesOnly, setFavoritesOnly] = useState(true);
  const toggleTools = () => { setFavoritesOnly(!favoritesOnly); };

  // Set who in the team is being featured
  const pausedRef = useRef(false);

  // You can access the elements with itemsRef.current[n]
  const sectionRefs = useRef([]);

  const headerRef = useRef();

  // Compile all the refs
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // animate header on mount
    headerRef.current.classList.add('animated');

    // Set up observer to scroll into view the next section
    const observer = new IntersectionObserver(([entry]) => {
      if (!pausedRef.current && entry.isIntersecting) {
        const refIndex = parseInt(entry.target.dataset.index, 10);
        const currentRef = sectionRefs.current[refIndex];

        // Set top based on scrolling down vs Up
        const top = (
          entry.boundingClientRect.y > entry.rootBounds.y
            ? currentRef.offsetTop
            : currentRef.offsetTop + currentRef.offsetHeight - window.innerHeight
        );
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, { threshold: 0.01 });

    const refs = sectionRefs.current;
    // Observer to observe each ref
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Clean up Observer by unobserving each ref
    return () => {
      refs.current?.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [sectionRefs, pausedRef]);

  // Handle hero call to action
  const scrollToAbout = () => {
    const top = sectionRefs.current[1].offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <Layout pausedRef={pausedRef} sectionRefs={sectionRefs}>
      <Seo title="Carms Ng | Full Stack Developer" />

      {/* Hero */}
      <HeroStyles ref={addToRefs} id="home" data-index="0">
        <div className="container">
          <h1 ref={headerRef}>
            <span>Hi folks! Carms here!</span>
          </h1>
          <p>I&apos;m a Full Stack Developer living in Tiohtiá:ke aka Montréal.</p>
          <button type="button" className="btn btn-icon" onClick={scrollToAbout} aria-label="Go to About">
            <span>
              What I do
              <Icon icon="akar-icons:arrow-right" style={{ fontSize: '2.5rem' }} />
            </span>
          </button>
        </div>
      </HeroStyles>

      {/* About */}
      <AboutStyles
        ref={addToRefs}
        id="about"
        style={{ background: 'var(--off-white)' }}
        data-index="1"
      >
        <div className="container">
          <h2>About</h2>
          <div className="three-forth">
            {/* eslint-disable-next-line max-len */}
            <p>I&apos;m passionate about building impactful applications to improve lives around me. I&apos;m a versatile Full Stack Developer. I’m climate and social justice-minded, communicative, fun, curious, adaptive and always up for a new challenge.</p>
            <a
              className="btn btn-icon"
              href={data.resume.publicURL}
              target="_blank"
              rel="noreferrer"
            >
              <span>
                Resume
                <Icon icon="akar-icons:arrow-up-right" style={{ fontSize: '2rem' }} />
              </span>
            </a>
          </div>

          <div className="fifty-fifty">
            <div>
              <div className="btns-text">
                <button
                  aria-label="Favorite Tools"
                  disabled={favoritesOnly}
                  onClick={toggleTools}
                  className={`btn-text ${favoritesOnly ? 'active' : ''}`}
                  type="button"
                >
                  <span>Favorites</span>
                </button>
                <p>/</p>
                <button
                  aria-label="All Tools"
                  disabled={!favoritesOnly}
                  onClick={toggleTools}
                  className={`btn-text ${favoritesOnly ? '' : 'active'}`}
                  type="button"
                >
                  <span>Tool Box</span>
                </button>
              </div>
              <Icons icons={favoritesOnly ? favorites : allTools} />
            </div>
            <div>
              <h3>guiding values</h3>
              <Icons icons={values} />
            </div>
          </div>
        </div>
      </AboutStyles>

      {/* Projects */}
      <ProjectStyles ref={addToRefs} id="portfolio" data-index="2">
        <div className="container">
          {/* Portfolio */}
          <div>
            <h2>portfolio</h2>
            <Projects projects={workProjects} allTools={allTools} />
          </div>
          {/* Hobbies */}
          <div style={{ marginTop: '5rem' }}>
            <h2>hobby</h2>
            <Projects projects={hobbies} allTools={allTools} />
          </div>
        </div>
      </ProjectStyles>

      {/* Contact */}
      <ContactStyles ref={addToRefs} id="contact" style={{ background: 'var(--off-white)' }} data-index="3">
        <div className="container">
          <h2>contact</h2>
          <p>Want to collaberate? Let&apos;s grab a coffee over VC!</p>

          {/* Contact form wired to netlify forms */}
          {/* TODO: Improve Redirect Page */}
          <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
            <input type="hidden" name="bot-field" />
            <label htmlFor="name">
              Full Name
              <input type="text" name="name" id="name" required />
            </label>
            <label htmlFor="email">
              Email
              <input type="text" name="email" id="email" required />
            </label>
            <label htmlFor="message">
              Message
              <textarea name="message" id="message" cols="30" rows="4" required />
            </label>
            <button className="btn btn-icon" type="submit" aria-label="Submit Contact Form">
              <span>
                Send
                <Icon icon="la:telegram-plane" style={{ fontSize: '2rem' }} />
              </span>
            </button>
          </form>

        </div>
      </ContactStyles>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    resume: PropTypes.shape({
      publicURL: PropTypes.string,
    }),
  }).isRequired,
};

export const data = graphql`
  query {
    resume: file(extension: {eq: "pdf"}) {
      publicURL
    }
  }
`;
