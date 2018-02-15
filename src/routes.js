import React from 'react'
import { Route, NavLink, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import tinycolor from 'tinycolor2'
import Main from './components/main/main'
import Science from './components/science/Science'
import InstructorDashboard from './components/instructor/InstructorDashboard'
import StudentDetails from './components/instructor/StudentDetails'
import Login from './components/login/Login'
import Header from './components/common/header'
import Footer from './components/common/footer'
import auth from './helpers/auth'
import colors from './helpers/colors'

function GetSideBar() {
  switch (auth.checkToken(auth.getToken()).role) {
    case 'Admin':
      return AdminSidebar
    case 'Instructor':
      return InstructorSidebar
    case 'Student':
      return StudentSidebar
    default:
      return <div>Something is borked</div>
  }
}

const Body = styled.div`
  margin: 56px 16px 56px 216px;
`

const SideNav = styled.ul`
  margin-top: 50px;
  list-style-type: 'none';
`

const SideNavItem = styled.li``

const activeLink = 'active'

const SideNavLink = styled(NavLink).attrs({
  activeLink,
}) `
  background-color: ${colors.green};
  padding: 8px;

  &:hover {
    background-color: ${tinycolor(colors.green)
    .lighten(8)
    .toString()};
  }

  text-decoration: none;
  color: black;
  height: 100%;
  display: block;

  &:visited {
    color: black;
  }

  &.${activeLink} {
    background-color: ${tinycolor(colors.green)
    .lighten(4)
    .toString()};
  }
`

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (!auth.checkToken(auth.getToken()).error ? (
        <div>
          <Header />
          {GetSideBar()}
          <Body>
            <Component {...props} />
          </Body>
          <Footer />
        </div>
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))
    }
  />
)

const SideBar = styled.div`
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${colors.green};
  height: 100vh;
`

const StudentSidebar = (
  <SideBar>
    <SideNav>
      <SideNavItem>
        <SideNavLink exact to="/SightWords" activeClassName={activeLink}>
          <i className="fas fa-book" />&nbsp; Sight Words
        </SideNavLink>
      </SideNavItem>
      <SideNavItem>
        <SideNavLink exact to="/Science">
          <i className="fas fa-flask" />&nbsp; Science
        </SideNavLink>
      </SideNavItem>
    </SideNav>
  </SideBar>
)

const InstructorSidebar = (
  <SideBar>
    <SideNav>
      <SideNavItem>
        <NavLink to="/">Instructor</NavLink>
      </SideNavItem>
    </SideNav>
  </SideBar>
)

const AdminSidebar = (
  <SideBar>
    <SideNav>
      <SideNavItem>
        <NavLink to="/">Admin</NavLink>
      </SideNavItem>
    </SideNav>
  </SideBar>
)

export default (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={() => <div>Main Page</div>} />
        <PrivateRoute exact path="/SightWords" component={Main} />
        <PrivateRoute exact path="/Science" component={Science} />
        <PrivateRoute exact path="/instructor/dashboard" component={InstructorDashboard} />
        <PrivateRoute path="/instructor/dashboard/students/:studentId" component={StudentDetails} />
      </Switch>
    </div>
  </Router>
)
