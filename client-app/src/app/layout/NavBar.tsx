import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    let navStyle = {
        marginRight: "10",
    }
    
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="Reactivities logo" style={navStyle}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}