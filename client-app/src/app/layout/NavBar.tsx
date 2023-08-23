import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function Navbar() {
    let navStyle = {
        marginRight: "10",
    }
    
    return(
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="Reactivities logo" style={navStyle}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}