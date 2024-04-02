import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #7f9ba6;
  color: #f1f1f1;
  padding: 5px;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const FooterText = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Weather App. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
