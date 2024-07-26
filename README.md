
## Pasar Rakyat

Pasar Rakyat is a web-based cashier application designed for canteens offering a unique 50% discount on all food items. The discount is funded equally by users and donors, with 50% covered by the user and the other 50% by donors. To ensure consistency and prevent overcrowding, the application uses a single gate cashier system. This system connects all cashiers to a central backend, ensuring uniform discounts and real-time stock updates across the canteen.
![pasar-rakyat](https://utfs.io/f/ca1c8c62-85c5-4f03-b1db-989003b548b0-9keyxa.png)

### Key Features
- **Single Gate Cashier System:** Centralized checkout process to manage discounts and avoid overcrowding.
- **Real-Time Stock Updates:** WebSocket technology ensures instant updates on stock availability across all cashiers.
- **Backend and Frontend Separation:** The application has a separate backend and frontend for better scalability and maintenance.

### Technologies Used
- **Frontend:** React
- **Backend:** Node.js with WebSocket for real-time communication
- **Database:** Firebase (specified by `DATABASE_URL`)

### Deployment Instructions

#### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)

#### Clone the Repository
```bash
git clone https://github.com/Mahusaa/pasar-rakyat.git
cd pasar-rakyat
```

#### Install Dependencies
```bash
npm install
```

#### Set Up Environment Variables
Create a `.env` file in the root directory and add the following line, replacing `Firebase_Link` with your actual Firebase database URL:
```plaintext
DATABASE_URL="Firebase_Link"
```

#### Start the Application

To run the frontend server:
```bash
npm start
```

To run the backend server:
```bash
cd backend
npm run start-backend
```

#### Build for Production
To build the frontend for production, use the following command:
```bash
npm run build
```

#### Access the Application
- **Frontend:** Open your browser and navigate to `http://localhost:3000` to access the cashier interface.
- **Backend:** The backend server will run in the `http://localhost:8080` and listen for requests, handling real-time stock updates and transactions.

### Repository Link
[Pasar Rakyat on GitHub](https://github.com/Mahusaa/pasar-rakyat.git)

