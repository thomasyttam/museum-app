import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from "@/lib/userData";
import { readToken, removeToken } from '@/lib/authenticate';



export default function MainNav() {

    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let token = readToken();

    function logout() {
        removeToken();
        router.push('/');
      }


    async function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
        setIsExpanded(false)
        router.push(`/artwork?title=true&q=${searchField}`);
        setSearchField('');
    }

    return (

        <>

            <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Ying Tat Tam</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior >
                                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)} >
                                    Home
                                </Nav.Link>
                            </Link>
                            {token && <Link href="/search" passHref legacyBehavior>
                                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>
                                    Advanced Search
                                </Nav.Link>
                            </Link>}
                        </Nav>
                        {!token && <Nav>
                            <Link href="/register" passHref legacyBehavior >
                                <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)} >
                                    Register
                                </Nav.Link>
                            </Link>
                            <Link href="/login" passHref legacyBehavior >
                                <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)} >
                                    Login
                                </Nav.Link>
                            </Link>
                        </Nav>}
                        {token && <Form className="d-flex" onSubmit={submitForm}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button type="submit" variant="success">Search</Button>
                        </Form>}

                        {token && <Nav>
                            <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/favourites"}>
                                        Favourites
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item onClick={() => setIsExpanded(false)} active={router.pathname === "/history"}>
                                        Search History
                                    </NavDropdown.Item>
                                </Link>
                                    <NavDropdown.Item onClick={() => {setIsExpanded(false);logout()}}>
                                        Logout
                                    </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}