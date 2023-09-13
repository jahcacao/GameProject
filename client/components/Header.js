import Link from "next/link";
import { Button, Menu } from "semantic-ui-react";
import { useState } from "react";

const Header = () => {
    const [currentAccount, setCurrentAccount] = useState();
    const handleLogInClick = async () => {
        const {ethereum} = window;
        if(!ethereum) {
            alert ("No metamask detected!");

        }
        try {
            const accounts = await ethereum.request({method: "eth_requestedAccounts"});
            console.log("Acc: ", );
            setCurrentAccount(accounts[0]);
        } catch {
            console.error(error);
        }
    }

    return (<Menu style={{ marginTop: "20px" }}>
        <Link href="/">
            <Menu.Item>
                Main page
            </Menu.Item>
        </Link>
        <Link href="/add">
            <Menu.Item>
                Start new game
            </Menu.Item>
        </Link>
        <Link href="/finishedgames">
            <Menu.Item>
                Finished games
            </Menu.Item>
        </Link>
        <Menu.Item>
            {!currentAccount ? <Button primary onClick={handleLogInClick}>Connect</Button> :
            <Link href="/user">
                <Button primary onClick={handleLogInClick}>{currentAccount}</Button>
            </Link>}
        </Menu.Item>
    </Menu>);
}

export default Header;