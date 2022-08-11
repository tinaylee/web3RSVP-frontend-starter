import abiJSON from "./Web3RSVP.json"
import { ethers } from "ethers";
//Connects contract to our front end
function connectContract() {
    const contractAddress = "0xDb3122A3850206c1A5838BB2091bbD43E1d740C4";
    const contractABI = abiJSON.abi;
    let rsvpContract;
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            rsvpContract = new ethers.Contract(contractAddress, contractABI, signer);
        } else {
            console.log("Ethereum object doesn't exist!");
        }
    } catch (error) {
        console.log("ERROR:", error);
    }
    return rsvpContract;
}

export default connectContract;