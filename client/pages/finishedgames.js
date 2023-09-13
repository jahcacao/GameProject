import Layout from "@/components/Layout";
import { useRef, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";

import getGameDataByIndex from "@/utils/getGameDataByIndex";


const FinishedGames = () => {
    
    const [gamePlayersLimit, setGamePlayersLimit] = useState();
    
    const [prizePool, setPrizePool] = useState();
 
    const [bidSize, setBidSize] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const [isLoading, setLoading] = useState(false);

    const indexRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const index = indexRef.current.value;
        setErrorMessage("");
        setGamePlayersLimit("");
        setPrizePool("");
        setBidSize("");
        if(!index) {
            setErrorMessage("Incorrect index!");
            return;
        }
        setLoading(true);

        try {
           const game = await getGameDataByIndex(index);
           setGamePlayersLimit(game.gamePlayersLimit);
           setPrizePool(game.prizePool);
           setBidSize(game.bidSize);
        } catch(error){
            console.error(error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (<Layout>
        <Form error={!!errorMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Index of the game</label>
          <input ref={indexRef} placeholder='Type index' />
        </Form.Field>
        <Button primary type='submit'>Show game</Button>
        <Message error
            header ='Error is here'
            content ={errorMessage}
        />
        </Form>
        {gamePlayersLimit && <h3>Players limit: {gamePlayersLimit}</h3>}
        {prizePool && <h3>Prize pool: {prizePool}</h3>}
        {bidSize && <h3>Bid size: {bidSize}</h3>} 
      </Layout>
      );
};

export default FinishedGames; 