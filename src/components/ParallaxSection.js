// src/components/ParallaxSection.js
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';

const Section = styled.div`
  position: relative;
  height: 500px; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.bg}; /* Optional background color */
`;

const Background = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5); /* Optional: Adds a background to text for better readability */
  border-radius: 10px;
  color: white;
`;

const ParallaxSection = ({ image, text }) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const springProps = useSpring({
    transform: `translateY(${scrollY * 0.5}px)`, // Adjust multiplier for effect strength
  });

  return (
    <Section>
      <Background style={{ ...springProps, backgroundImage: `url(${image})` }} />
      <Content>{text}</Content>
    </Section>
  );
};

export default ParallaxSection;
