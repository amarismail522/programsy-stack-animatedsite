import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { Link } from 'react-scroll';
import Container from '@material-ui/core/Container';
import logo2 from '../images/logo2.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const NavLists = [
  { name: "Home", id: "banner" },
  { name: "Service", id: "service" },
  { name: "Portfolio", id: "portfolio" },
  { name: "About", id: "about" },
];


export default function Navbar(props) {


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className="Nav">
        <Toolbar>
          <Container>
            <div className="flex">
              <div className="logo-section">
                <img src={logo2} className="logo-img" alt="Programsy"/>
              </div>
              <div ClassName="Nav-links">
                {NavLists.map((item, id) => {
                  return (
                    <Link key={id} className="nav-item"
                      activeClass="active"
                      to={item.id}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >{item.name}</Link>
                  )
                })}
              </div>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
