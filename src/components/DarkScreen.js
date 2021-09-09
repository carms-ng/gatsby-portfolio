import React, { useEffect } from 'react';
import styled from 'styled-components';

function DarkScreen({ isMenuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeMenu);

    return () => {
      document.body.style.overflow = 'unset';
      window.addEventListener('keydown', closeMenu);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <DarkScreenStyles onClick={closeMenu} />
  );
}

const DarkScreenStyles = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  background: rgba(0,0,0,0.7);
`;

export default DarkScreen;
