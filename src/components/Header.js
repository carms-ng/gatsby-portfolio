import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;

  a {
    display: flex;
    align-items: center;
  }
`;

const Header = () => (
  <HeaderStyles>
    <Link to="/">
      <StaticImage
        src="../assets/images/logo.png"
        alt="Carms Ng Logo"
        imgStyle={{ objectFit: 'contain', width: '100%', height: '100%' }}
        style={{ width: '70px', height: '70px', marginRight: '1rem' }}
      />
      <div>
        <h4>Carms Ng</h4>
        <p>Full Stack Developer</p>
      </div>
    </Link>
  </HeaderStyles>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
