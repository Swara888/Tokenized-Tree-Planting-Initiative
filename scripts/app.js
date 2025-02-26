// Declare global variables
let provider;
let signer;
let contract;

// Define the contract details (use your actual contract address and ABI)
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const abi = [
    {
        "inputs": [],
        "name": "plantTree",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalTrees",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum); // Use Web3Provider for ethers v5
    contract = new ethers.Contract(contractAddress, abi, provider);
} else {
    alert("Please install MetaMask or another Web3 wallet to use this app.");
}

// Connect wallet function
async function connectWallet() {
    try {
        // Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length > 0) {
            signer = provider.getSigner(); // Update signer after wallet connection
            contract = contract.connect(signer); // Reconnect contract with signer
            
            console.log("Connected Account:", accounts[0]);

            // Enable "Plant a Tree" button
            document.getElementById("plantTreeButton").disabled = false;
            displayMessage("Wallet connected successfully!");
        } else {
            alert("No accounts found. Please check your MetaMask.");
        }
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        displayMessage("Connection failed. Please try again.");
    }
}

// Function to interact with smart contract to plant a tree
async function plantTree() {
    try {
        const contractWithSigner = contract.connect(signer); // Ensure contract is connected with signer
        const tx = await contractWithSigner.plantTree(); // Send transaction
        await tx.wait(); // Wait for confirmation

        displayMessage("Tree planted successfully!");
        await getTotalTrees(); // Update tree count after planting
    } catch (error) {
        console.error("Error planting tree:", error);
        displayMessage("An error occurred while planting the tree. Please try again.");
    }
}

// Function to get the total number of trees planted
async function getTotalTrees() {
    try {
        const total = await contract.totalTrees();
        displayMessage(`Total trees planted: ${total}`);
    } catch (error) {
        console.error("Error fetching total trees:", error);
    }
}

// Display a message in the output div
function displayMessage(message) {
    document.getElementById("output").innerText = message;
}

// Add event listeners
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("plantTreeButton").addEventListener("click", plantTree);
