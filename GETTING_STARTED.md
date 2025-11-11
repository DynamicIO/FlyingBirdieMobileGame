# Getting Started with Flying Birdie Mobile

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js installed (v20.17.0 or higher)
- Smartphone with Expo Go app installed ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Steps

1. **Open Terminal/PowerShell in the FlyingBirdieMobile folder**

2. **Install Dependencies** (skip if already done)
```bash
npm install
```

3. **Start the App**
```bash
npm start
```

4. **Run on Your Device**
   - **On Phone**: Open Expo Go app and scan the QR code
   - **iOS Simulator** (Mac only): Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal
   - **Web Browser**: Press `w` in terminal

That's it! The game should now be running on your device. 🎮

## 🎮 How to Play

1. **Start**: Tap "Start Game" button
2. **Fly**: Tap anywhere on screen to make the bird flap
3. **Avoid**: Navigate through pipes without hitting them
4. **Collect**: Grab power-ups for special abilities
5. **Score**: Try to beat your high score!

## 💎 Power-ups

- 🔵 **Blue (Slow Motion)**: Slows down the game temporarily
- 🟡 **Gold (Shield)**: Protects you from one hit
- 💗 **Pink (Double Points)**: Earn 2x points

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Run on iOS (Mac only)
npm run ios

# Run on Android
npm run android

# Run on web browser
npm run web

# Clear cache and restart
npm start -c
```

## 📱 Testing on Real Devices

### iPhone/iPad
1. Install Expo Go from App Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code from terminal
5. App will load and run

### Android Phone/Tablet
1. Install Expo Go from Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code from terminal
5. App will load and run

## 🔧 Troubleshooting

### "Cannot connect to Metro bundler"
```bash
npm start -c
```

### "Module not found"
```bash
npm install
npm start
```

### "Network error" on phone
- Make sure phone and computer are on same WiFi network
- Try using tunnel mode: `npm start --tunnel`

### Build errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### WebView not showing
- Restart the Expo Go app
- Clear cache: `npm start -c`

## 📦 Building for Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete build and deployment instructions.

### Quick Build Commands

**iOS:**
```bash
eas build --profile production --platform ios
```

**Android:**
```bash
eas build --profile production --platform android
```

## 📂 Project Structure

```
FlyingBirdieMobile/
├── App.js              # Main game component
├── index.js            # App entry point
├── app.json            # Expo configuration
├── package.json        # Dependencies & scripts
├── eas.json            # Build configuration
├── assets/             # Images & icons
│   └── bird.png        # App icon & game asset
├── README.md           # Full documentation
├── DEPLOYMENT.md       # Deployment guide
└── GETTING_STARTED.md  # This file
```

## 🎯 What's Included

✅ Full game implementation
✅ Touch controls optimized for mobile
✅ Power-ups system (Slow Motion, Shield, Double Points)
✅ Combo scoring system
✅ High score tracking (persistent)
✅ Sound effects
✅ Particle effects
✅ Progressive difficulty
✅ iOS & Android support
✅ Offline gameplay
✅ Full-screen mode

## 🔜 Next Steps

1. **Test the app** on your device
2. **Customize** app icon if desired (replace `assets/bird.png`)
3. **Configure** bundle identifiers in `app.json` for your accounts:
   - iOS: `ios.bundleIdentifier`
   - Android: `android.package`
4. **Build** for production when ready
5. **Submit** to app stores

## 📚 Additional Resources

- **Full Documentation**: [README.md](./README.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/

## ❓ Common Questions

**Q: Can I play this offline?**
A: Yes! No internet connection needed after initial load.

**Q: Will my high score be saved?**
A: Yes, it's stored locally on your device.

**Q: Can I customize the game?**
A: Yes! Edit `App.js` to modify game parameters, colors, difficulty, etc.

**Q: How do I change the app icon?**
A: Replace `assets/bird.png` with your own icon (1024x1024 recommended).

**Q: Is this ready for app stores?**
A: Almost! You need to configure bundle identifiers and build with EAS.

**Q: How much does it cost to publish?**
A: Apple App Store: $99/year | Google Play: $25 one-time

## 🆘 Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for build issues
- Visit Expo documentation: https://docs.expo.dev/

## 🎉 Have Fun!

Enjoy developing and playing Flying Birdie! Feel free to customize and make it your own.

---

**Quick Commands Reference:**
```bash
npm start          # Start development server
npm run ios        # Run on iOS (Mac only)
npm run android    # Run on Android
npm start -c       # Clear cache and start
eas build          # Build for production
```

Happy coding! 🚀🐦

