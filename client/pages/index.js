import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";

const Index = () => {
    const router = useRouter();
    return (<Layout>
        <h1>
            Here you can join existing game or start your own!
        </h1>
        <Button.Group>
    <Button primary onClick={() => router.push("/add")}>Start new Game</Button>
    <Button.Or text="||"/>
    <Button positive onClick={() => router.push("/finishedgames")}>Existing Games</Button>
  </Button.Group>


        </Layout>);
        
}

export default Index;