import { ethers } from "ethers";
let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.BrowserProvider(window.ethereum);
} else {
    provider = new ethers.JsonRpcProvider();
}
 
export default provider;