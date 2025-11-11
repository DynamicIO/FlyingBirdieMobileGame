# Flying Birdie Mobile

A mobile game app for iOS and Android built with React Native and Expo SDK 54.0.0.

## Features

- **Addictive Gameplay**: Classic flappy bird-style game with smooth controls
- **Power-ups System**: Collect slow motion, shield, and double points power-ups
- **Combo System**: Build combos for bonus points
- **Progressive Difficulty**: Game gets harder as you score higher
- **High Score Tracking**: Automatically saves your best score
- **Particle Effects**: Beautiful visual effects throughout the game
- **Cross-Platform**: Works on both iOS and Android devices

## Prerequisites

- Node.js (v20.17.0 or compatible)
- npm or yarn
- Expo Go app (for testing on physical devices)
- iOS Simulator (for Mac users) or Android Emulator

## Installation

1. Navigate to the project directory:
```bash
cd FlyingBirdieMobile
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Development Mode

Start the Expo development server:
```bash
npm start
```

This will open Expo DevTools in your browser. From there you can:
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator
- Scan the QR code with Expo Go app on your physical device

### Platform-Specific Commands

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

**Web:**
```bash
npm run web
```

## How to Play

1. Tap the "Start Game" button to begin
2. Tap anywhere on the screen to make the bird flap its wings
3. Navigate through the pipes without hitting them
4. Collect power-ups for special abilities:
   - **Blue (Slow Motion)**: Slows down the game
   - **Gold (Shield)**: Protects you from one collision
   - **Pink (Double Points)**: Earn double points for a limited time
5. Build combos by passing through multiple pipes consecutively
6. Try to beat your high score!

## Building for Production

### iOS

1. Configure your iOS bundle identifier in `app.json`
2. Build the app:
```bash
expo build:ios
```

### Android

1. Configure your Android package name in `app.json`
2. Build the app:
```bash
expo build:android
```

## Project Structure

```
FlyingBirdieMobile/
├── App.js              # Main application component
├── index.js            # Entry point
├── app.json            # Expo configuration
├── package.json        # Dependencies
├── assets/            
│   └── bird.png        # Game bird image and app icon
└── README.md           # This file
```

## Technical Details

- **Framework**: React Native with Expo SDK 54.0.0
- **Rendering**: HTML5 Canvas (via WebView)
- **Audio**: Web Audio API for procedural sound generation
- **Storage**: LocalStorage for high score persistence
- **Platform**: iOS 13+, Android 5.0+

## Game Features

### Power-ups
- **Slow Motion**: Reduces game speed by 50% for 5 seconds
- **Shield**: Protects from one collision for 10 seconds
- **Double Points**: Awards 2x points for 7.5 seconds

### Scoring System
- Base: 1 point per pipe
- Combo Bonus: +1 point for every 5 consecutive passes
- Double Points: 2x multiplier when power-up is active

### Difficulty Progression
- Pipe gap decreases as score increases
- Game speed gradually increases
- Pipe spacing becomes tighter at higher scores

## Troubleshooting

**App won't start:**
- Make sure all dependencies are installed: `npm install`
- Clear the cache: `expo start -c`

**WebView not rendering:**
- Ensure `react-native-webview` is properly installed
- On Android, make sure JavaScript is enabled in WebView

**Audio not working:**
- Tap the screen once to activate audio context (browser security requirement)
- Check device volume and mute settings

## License

This project is open source and available for personal and educational use.

## Credits

Powered by Dynamic.IO

---

Enjoy playing Flying Birdie! 🐦

