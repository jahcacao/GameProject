import Layout from "@/components/Layout";
import provider from "@/provider";
import { useRef, useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import gamesFactory from "@/gamesFactory";
import { parseEther } from "ethers";

const AddGame = () => {
  const [bet, setBet] = useState("");    
  const [playersLimit, setPlayersLimit] = useState("");
  const [bid, setBid] = useState("");    
  const [errorMessage, setErrorMessage] = useState("");   
  const [successMessage, setSuccessMessage] = useState("");   
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const signer = await provider.getSigner();
    const gamesFactoryWithSigner = gamesFactory.connect(signer);
    try {
      const response = await gamesFactoryWithSigner.createGame(bet, playersLimit, {value: parseEther(bid)});
      console.log("response: ", response);
      setSuccessMessage("Transaction hash: ", response.hash);
    } catch (error) {
      console.error("error: ", error);
      setErrorMessage(error.message);
    }


};
    return (<Layout>Start new game
        
        <Form 
        error={!!errorMessage} 
        success={!!errorMessage} 
        onSubmit={handleSubmit}
        >
        <Form.Group widths='equal'>
      
        <Form.Field
          control={Input}
          label='Bet'
          value={bet}
          onChange={(event) => setBet(event.target.value)}
          placeholder='number from 0 to 20'
        />
        <Form.Field
          control={Input}
          label='Players limit'
          value={playersLimit}
          onChange={(event) => setPlayersLimit(event.target.value)}
          placeholder='If 0 - no limits'
        />
        <Form.Field
          control={Input}
          label='Bid'
          value={bid}
          onChange={(event) => setBid(event.target.value)}
          placeholder='bid in ETH'
        />
        <Message style={{wordBreak: 'break-word'}} error
            header ='Error is here'
            content ={errorMessage}
        />

        <Message success
            header ='Well done!'
            content ={successMessage}
        />
            </Form.Group>
            <Button primary type='submit'>Start game</Button>

        </Form>
    </Layout>);
}

export default AddGame; 