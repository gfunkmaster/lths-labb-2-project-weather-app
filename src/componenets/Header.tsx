import styled from 'styled-components';
import Navbar from './Navbar';

const HeaderContainer = styled.div`
  background-color: #7f9ba6;
  color: #f1f1f1;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 auto;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 2px
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Welcome to Weather App</HeaderTitle>
      <Navbar />
    </HeaderContainer>
  );
};

export default Header;
