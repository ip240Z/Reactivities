import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    openForm: () => void;
}

export default function Navbar({openForm}: Props) {
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
                    <Button onClick={openForm} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}