


import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, Transaction, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { createNewPortfolio } from './Portfolio/cli/makeStepsPortfolio';




function toHex(buffer) {
    return Array.prototype.map
      .call(buffer, (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  }

function HomePage() {

    const [logs, setLogs] = useState([]);
    function addLog(log) {
      setLogs((logs) => [...logs, log]);
    }

    const network = clusterApiUrl('devnet');
    const [providerUrl, setProviderUrl] = useState('https://www.sollet.io');
    const connection = useMemo(() => new Connection(network), [network]);
    const urlWallet = useMemo(() => new Wallet(providerUrl, network), [
        providerUrl,
        network,
    ]);
    const [tokenInfo, setTokenInfo] = useState("no Info");


    const injectedWallet = useMemo(() => {
        try {
            return new Wallet(window.sollet, network);
        } catch (e) {

            return null;
        }
    }, [network]);
    const [selectedWallet, setSelectedWallet] = useState(undefined);
    const [portfolioAccount , setPortfolioAccount] = useState(undefined);
    const [, setConnected] = useState(false);
    useEffect(() => {
        if (selectedWallet) {
            selectedWallet.on('connect', () => {
                setConnected(true);
                addLog('Connected to wallet ' + selectedWallet.publicKey.toBase58());
            });
            selectedWallet.on('disconnect', () => {
                setConnected(false);
                addLog('Disconnected from wallet');
            });
            selectedWallet.connect();
            return () => {
                selectedWallet.disconnect();
            };
        }
    }, [selectedWallet]);

    



   

    async function goSwapOriginal() {
   
      window.location.assign("/SwapOriginal");
  
    }
  async function goSerumSwap() {
  
      window.location.assign("/SerumSwap");
  
    }
  async function goPortfolio() {
  
      window.location.assign("/Portfolio");
  
    }
  async function goSaber() {
  
      window.location.assign("/Saber");
  
    }

    return (
        <div className="App">
            <h1>NOVA FINANCE</h1>
            <div>Network: {network}</div>
           
         
            <hr />
            <div className="logs">
                {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}
            </div>

            <br></br>
        <br></br>
        <br></br>
    
        <button onClick={() => goSwapOriginal()} className="btn btn-info">Swap Original</button> 


        <br></br>
        <br></br>
        <br></br>

        <button onClick={() => goSerumSwap()} className="btn btn-info">Serum Swap</button> 

        <br></br>
        <br></br>
        <br></br>

        <button onClick={() => goPortfolio()} className="btn btn-info">Portfolio</button> 

        <br></br>
        <br></br>
        <br></br>

        <button onClick={() => goSaber()} className="btn btn-info">Saber</button> 



           
        </div>
    );

}

export default HomePage;









