# WorldCoin Therapy Platform

A decentralized therapy platform built with Next.js, WorldCoin, and Solidity smart contracts. This platform connects patients with therapists, facilitates secure payments, and manages therapy sessions through blockchain technology.

## Features

### For Patients
- **WorldCoin Authentication**: Secure login using WorldCoin ID verification
- **Therapist Discovery**: Browse and search for therapists by specialization
- **Smart Filtering**: Filter therapists by price range and specialization
- **Booking System**: Schedule therapy sessions with preferred therapists
- **Session Management**: View and manage upcoming and past sessions
- **Secure Payments**: Integrated payment system with smart contract escrow

### For Therapists
- **Profile Management**: Create and manage professional profiles
- **Availability Settings**: Set and manage available time slots
- **Session Management**: Track and manage therapy sessions
- **Payment Processing**: Secure payment collection through smart contracts

## Technologies Used

- **Frontend**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - WorldCoin Mini Apps UI Kit
  - Web3.js

- **Backend**:
  - Solidity Smart Contracts
  - WorldCoin API
  - Next.js API Routes

- **Authentication**:
  - WorldCoin ID
  - Web3 Authentication

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or another Web3 wallet
- WorldCoin ID

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/fchambi/WorldCoin_Hack.git
   cd WorldCoin_Hack
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_WORLDCOIN_APP_ID=your_app_id
   NEXT_PUBLIC_WORLDCOIN_ACTION_NAME=your_action_name
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Deployment

1. Navigate to the Contracts directory:
   ```bash
   cd Contracts
   ```

2. Deploy the smart contract:
   ```bash
   npx hardhat run scripts/deploy.ts --network <your-network>
   ```

3. Update the contract address in your `.env.local` file.

## Project Structure

```
WorldCoin_Hack/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── therapists/        # Therapist listing
│   ├── bookings/         # Booking management
│   └── booking-confirmation/ # Booking flow
├── components/            # Reusable components
│   ├── Login/            # Authentication components
│   └── ui/               # UI components
├── Contracts/            # Smart contracts
│   └── TherapyScroww2_flattened.sol
└── public/              # Static assets
```

## Features in Detail

### Authentication Flow
1. User clicks "Login with WorldCoin"
2. WorldCoin verification process
3. User profile creation/retrieval
4. Session management

### Booking Process
1. Browse therapists
2. Select preferred therapist
3. Choose date and time
4. Confirm booking
5. Payment processing through smart contract
6. Session confirmation

### Smart Contract Features
- Escrow system for secure payments
- Session verification
- Payment release conditions
- Dispute resolution mechanism

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- WorldCoin Team for the Mini Apps UI Kit
- Next.js team for the amazing framework
- All contributors and supporters

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
