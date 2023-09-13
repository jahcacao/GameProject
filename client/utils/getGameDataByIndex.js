import Game from "../Game";
import gamesFactory from "../gamesFactory";


const getGameDataByIndex = async (index) => {
    const gameAddress = await gamesFactory.gamesAddr(index);
    if(gameAddress === "0x0000000000000000000000000000000000000000") {
        throw new Error("Incorrect index")
    }
    console.log("gameAddress: ", gameAddress); 
    const game = Game(gameAddress);
    const gamePlayersLimit = await game.playersLimit();
    console.log("gamePlayersLimit: ", gamePlayersLimit); 
    const prizePool = await game.prizePool();
    console.log("prizePool: ", prizePool);
    const bidSize = await game.bidSize();
    console.log("bidSize: ", bidSize);
    return {gamePlayersLimit, prizePool, bidSize};
}

export default getGameDataByIndex;