import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [account, setAccount] = useState('');

    const choices = ['rock', 'paper', 'scissors'];

    const handleUserChoice = (choice) => {
        setUserChoice(choice);
        const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(computerRandomChoice);
        determineWinner(choice, computerRandomChoice);
    };

    const determineWinner = (user, computer) => {
        if (user === computer) {
            setResult("It's a tie!");
        } else if (
            (user === 'rock' && computer === 'scissors') ||
            (user === 'paper' && computer === 'rock') ||
            (user === 'scissors' && computer === 'paper')
        ) {
            setResult('You win!');
        } else {
            setResult('You lose!');
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div className="app-container">
            <h1>Rock-Paper-Scissors Game</h1>
            <button onClick={connectWallet} className="connect-button">
                Connect Wallet
            </button>
            {account && <h2>Connected Account: {account}</h2>}
            <div className="button-container">
                <button onClick={() => handleUserChoice('rock')} className="emoji-button">🪨</button>
                <button onClick={() => handleUserChoice('paper')} className="emoji-button">📄</button>
                <button onClick={() => handleUserChoice('scissors')} className="emoji-button">✂️</button>
            </div>
            <h2>Your Choice: {userChoice}</h2>
            <h2>Computer's Choice: {computerChoice}</h2>
            <h2>Result: {result}</h2>
        </div>
    );
}

export default App; 