import React, { } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

function Header(props) {
    let { location: { pathname } } = props;
    return (
        <Menu>
            <Menu.Item
                name='home'
                active={pathname === "/"}
            >
                <Link to="/">
                    Home
                </Link>
            </Menu.Item>
            <Menu.Item
                name='ideas'
                active={pathname === '/ideas'}
            >
                <Link to="/ideas">
                Ideas
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(Header);

Header.propTypes = {
    selected: PropTypes.string.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string
    })
}