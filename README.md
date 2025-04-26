# Coastal Basketball Centre Frontend

## Overview
The Coastal Basketball Centre Frontend is a modern web application built with React.js that serves as the user interface for the Coastal Basketball Centre. The application provides a comprehensive platform for managing basketball-related activities, including court bookings, academy programs, memberships, competitions, and administrative functions.

## Features
- **Court Booking System**: Users can book basketball courts for various time slots
- **Academy Management**: CBA (Coastal Basketball Academy) program management and registration
- **Membership Management**: User membership registration and management
- **Competition Management**: Organize and manage basketball competitions
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Comprehensive administrative tools for managing the facility
- **Partnership Management**: Partner registration and management
- **Facility Information**: Detailed information about the basketball facilities
- **Representative Programs**: Management of representative basketball programs
- **Participation Tracking**: Track and manage player participation

## Technology Stack
- **Frontend Framework**: React.js 18
- **State Management**: Redux Toolkit, Redux Persist
- **UI Components**: 
  - Ant Design
  - CoreUI
  - Material-UI
  - React Slick
- **Data Fetching**: Axios, React Query (TanStack Query)
- **Payment Processing**: Stripe Integration
- **Maps Integration**: Google Maps API
- **Styling**: 
  - SASS
  - CSS
  - Less (via craco-less)
- **Routing**: React Router DOM
- **Form Handling**: Various form components and validation
- **Analytics**: Google Analytics 4
- **Development Tools**:
  - CRACO (Create React App Configuration Override)
  - ESLint
  - Jest (for testing)

## Project Structure
```
src/
├── ajax/          # API request handlers
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable UI components
├── constants/     # Application constants
├── layouts/       # Page layout components
├── navigation/    # Navigation configuration
├── pages/         # Main application pages
│   ├── Admin/     # Administrative features
│   ├── Auth/      # Authentication pages
│   ├── BookCourt/ # Court booking system
│   ├── AcademyCBA/# Academy management
│   ├── Membership/# Membership management
│   └── ...        # Other feature pages
├── redux/         # Redux store configuration
├── App.js         # Main application component
└── index.js       # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory with the necessary environment variables
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Environment Variables
Create a `.env` file with the following variables:
```
REACT_APP_API_URL=your_api_url
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Available Scripts
- `npm start` or `yarn start`: Runs the app in development mode
- `npm build` or `yarn build`: Builds the app for production
- `npm test` or `yarn test`: Runs the test suite
- `npm eject` or `yarn eject`: Ejects from Create React App

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is proprietary and confidential. All rights reserved.

## Support
For support, please contact the development team or raise an issue in the repository. 