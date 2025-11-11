# Flying Birdie Mobile - Deployment Guide

This guide will help you build and deploy the Flying Birdie mobile app to iOS and Android app stores.

## Prerequisites

### For iOS Deployment
- macOS computer with Xcode installed
- Apple Developer Account ($99/year)
- EAS CLI installed: `npm install -g eas-cli`

### For Android Deployment
- EAS CLI installed: `npm install -g eas-cli`
- Google Play Developer Account ($25 one-time fee)

## Setup EAS (Expo Application Services)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Login to your Expo account**
```bash
eas login
```

3. **Configure your project**
```bash
cd FlyingBirdieMobile
eas build:configure
```

## Building for iOS

### Development Build (for testing on device)
```bash
eas build --profile development --platform ios
```

### Production Build (for App Store)
```bash
eas build --profile production --platform ios
```

### Submit to App Store
```bash
eas submit --platform ios
```

**Important iOS Configuration:**
1. In `app.json`, update the `ios.bundleIdentifier` to your unique identifier
2. Create an App ID in Apple Developer Portal
3. Create provisioning profiles
4. Configure app metadata in App Store Connect

## Building for Android

### Development Build (APK for testing)
```bash
eas build --profile preview --platform android
```

### Production Build (AAB for Play Store)
```bash
eas build --profile production --platform android
```

### Submit to Google Play
```bash
eas submit --platform android
```

**Important Android Configuration:**
1. In `app.json`, update the `android.package` to your unique package name
2. Create app signing key (EAS can handle this automatically)
3. Configure app metadata in Google Play Console

## Local Builds (Alternative Method)

### iOS (macOS only)
```bash
expo prebuild
cd ios
pod install
cd ..
npx react-native run-ios
```

### Android
```bash
expo prebuild
npx react-native run-android
```

## App Store Preparation

### Screenshots
Capture screenshots for:
- iPhone 6.7" (iPhone 14 Pro Max)
- iPhone 6.5" (iPhone 11 Pro Max)
- iPad Pro 12.9"
- Android Phone
- Android Tablet

### App Store Metadata

**Required Information:**
- App Name: Flying Birdie
- Subtitle: Addictive Bird Flying Game
- Description: (See below)
- Keywords: flying bird, arcade game, casual game, flappy, mobile game
- Category: Games - Arcade
- Age Rating: 4+ (no objectionable content)

**Suggested Description:**
```
Flying Birdie - The Ultimate Casual Gaming Experience!

Tap to flap and navigate through challenging obstacles in this addictive arcade game. Collect power-ups, build combos, and compete for the highest score!

FEATURES:
• Simple one-tap controls
• Exciting power-ups (Slow Motion, Shield, Double Points)
• Combo system for bonus points
• Progressive difficulty
• Beautiful graphics and smooth animations
• Offline play - no internet required
• High score tracking

POWER-UPS:
🔵 Slow Motion - Slow down time to navigate easier
🟡 Shield - Protect yourself from one collision
💗 Double Points - Earn twice the points

Perfect for quick gaming sessions or extended play. Can you beat your high score?

Download now and start your flying adventure!
```

### Privacy Policy
Since the app only stores high scores locally and doesn't collect any user data, you can use this simple policy:

```
Privacy Policy for Flying Birdie

This app does not collect, store, or share any personal information. 
All game data (high scores) is stored locally on your device only.
No analytics or tracking services are used.
No internet connection is required to play.
```

## Testing Before Submission

### iOS TestFlight
1. Build with production profile
2. Upload to App Store Connect
3. Create TestFlight beta group
4. Invite testers

### Android Internal Testing
1. Upload AAB to Google Play Console
2. Create internal testing track
3. Add testers via email
4. Share testing link

## Version Updates

When releasing updates:

1. Update version in `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "ios": {
      "buildNumber": "2"
    },
    "android": {
      "versionCode": 2
    }
  }
}
```

2. Build and submit new version:
```bash
eas build --profile production --platform all
eas submit --platform all
```

## Troubleshooting

### Build Fails
- Check EAS build logs: `eas build:list`
- Verify all dependencies are compatible with Expo SDK 54
- Ensure bundle identifiers are unique and valid

### App Rejected
- Review rejection reason in App Store Connect / Play Console
- Common issues:
  - Missing privacy policy
  - Incorrect metadata
  - Crash on launch
  - Missing required device support

### Performance Issues
- Test on actual devices, not just simulators
- Profile with React Native DevTools
- Check WebView performance settings

## Monitoring and Analytics

To add analytics (optional):
```bash
cd FlyingBirdieMobile
npm install expo-firebase-analytics
```

Then configure Firebase in your `app.json`.

## Support

For EAS build issues: https://docs.expo.dev/eas/
For App Store: https://developer.apple.com/support/
For Google Play: https://support.google.com/googleplay/android-developer/

## Checklist Before Submission

- [ ] App builds successfully
- [ ] Tested on iOS device
- [ ] Tested on Android device
- [ ] All features work correctly
- [ ] No crashes or errors
- [ ] App icon is correct
- [ ] Splash screen displays properly
- [ ] Screenshots captured
- [ ] Privacy policy written
- [ ] App description written
- [ ] Version number updated
- [ ] Bundle IDs configured correctly

---

Good luck with your app launch! 🚀

