# 🌐 OmniFlow

**Cross-Chain Wallet Automation using Avail Nexus**

> Simplify and automate your crypto transfers across multiple blockchains — all from one unified interface.

---

## 🚀 Overview

**OmniFlow** is a smart wallet interface that automates **cross-chain transfers** using the **Avail Nexus SDK**.
It enables users to define rules that automatically move tokens between supported networks when balances fall below set thresholds.

Example automations:

* “If my **Sepolia** balance < 0.01 ETH → **bridge** 0.05 USDC from **Arbitrum Sepolia**.”
* “If my **Polygon Amoy** balance < 10 USDT → **transfer** 20 USDT from **Base Sepolia**.”

OmniFlow makes it effortless to manage and rebalance assets across multiple chains — directly from your wallet.

---

## 🧩 Core Components

| Layer                  | Technology                              | Role                                                           |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------- |
| **Avail**              | [Avail Nexus](https://availproject.org) | Enables unified multi-chain balances and cross-chain transfers |
| **Frontend**           | Next.js, TailwindCSS                    | Provides an elegant and responsive UI                          |
| **Wallet Integration** | MetaMask (EIP-1193 Provider)            | Used to initialize and sign transactions                       |

---

## ⚙️ How It Works

1. **Connect Your Wallet**
   Initialize OmniFlow using MetaMask to access your wallet’s unified balance through Avail Nexus.

2. **View Unified Balances**
   Check your combined holdings across supported chains in a single dashboard.

3. **Set Automation Rules**
   Define conditions like threshold-based transfers — choose source chains, destination chain, token, and amount.

4. **Execute Cross-Chain Transfers**
   Avail Nexus handles the bridge and transfer operations securely and atomically across chains.

---

## 🧠 Why It’s Useful

* 🌉 **Cross-Chain Automation:** Move tokens automatically between chains based on your preferences.
* ⚡ **Unified Dashboard:** See all your assets in one place.
* 💡 **Simple & Secure:** Powered by Avail Nexus with MetaMask for signing.
* 🪄 **No Backend Needed:** Everything runs client-side, directly on the blockchain.

---

## 🧰 Tech Stack

* **Frontend:** Next.js, TailwindCSS
* **Blockchain SDK:** Avail Nexus
* **Wallet:** MetaMask (EIP-1193 Provider)
* **UI Library:** ShadCN/UI Components
* **Charts (Dashboard):** Recharts

---

## 📸 System Flow (Concept)

```mermaid
graph TD
  A[User Wallet (MetaMask)] -->|Initialize| B[OmniFlow UI]
  B -->|Fetch Balances| C[Avail Nexus SDK]
  B -->|Set Rule| D[Automation Logic]
  D -->|Trigger Transfer| C
  C -->|Bridge Tokens| E[Destination Chain]
  E -->|Confirm & Notify| A
```

---

## 🧭 Pages & Features

| Page          | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| **Home**      | Overview of OmniFlow, wallet connection, and customization entry point     |
| **Customize** | Define automation rules (thresholds, chains, tokens, and transfer amounts) |
| **Dashboard** | View transfer statistics, unified balances, and visual analytics           |

---

## 🧱 Folder Structure (Simplified)

```
app/
 ├─ page.tsx                # Landing Page (OmniFlow Overview)
 ├─ customize/page.tsx      # Automation Setup Page
 ├─ dashboard/page.tsx      # Statistics & Graphs
components/
 ├─ nexus/                  # Avail Nexus Components
 ├─ layout/                 # Navbar, Theme Toggle
 ├─ blocks/                 # Wallet Connection, Init Button
providers/
 ├─ NexusProvider.tsx       # Handles Nexus SDK Context
```

---

## 💫 Future Enhancements

* Add notifications for automation triggers
* Support for more tokens & chains
* Dashboard analytics for transfer history
* Persistent user settings (via local storage or cloud sync)

---
