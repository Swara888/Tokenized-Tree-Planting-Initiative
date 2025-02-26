// Ensure ethers.js is included (already done in HTML)

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

// Check if the browser has MetaMask installed
if (typeof window.ethereum !== 'undefined') {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, abi, signer);
} else {
    alert("Please install MetaMask or another Web3 wallet to use this app.");
}

// Connect wallet function
async function connectWallet() {
    try {
        // Request account access from MetaMask
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
            const connectedAccount = accounts[0]; // Get the first connected account
            console.log("Connected Account:", connectedAccount);
            console.log(window.ethereum);

            
            // Enable the "Plant a Tree" button after wallet is connected
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
        const tx = await contract.plantTree(); // Send transaction to contract
        await tx.wait(); // Wait for the transaction to be mined
        displayMessage("Tree planted successfully!");
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
    const outputDiv = document.getElementById("output");
    outputDiv.innerText = message;
}

// Add event listeners
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("plantTreeButton").addEventListener("click", async () => {
    if (provider) {
        await plantTree();
        await getTotalTrees(); // Update the total tree count after planting
    }
});
