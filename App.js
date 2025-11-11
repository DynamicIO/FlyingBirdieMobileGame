import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, StatusBar, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BIRD_SIZE = 50;
const PIPE_WIDTH = 60;
const PIPE_GAP = 220;
const GRAVITY = 0.6;
const FLAP_STRENGTH = -12;
const GAME_SPEED = 3;
const COLLISION_PADDING = 8;

export default function App() {
  const [gameState, setGameState] = useState('loading');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdPosition, setBirdPosition] = useState(SCREEN_HEIGHT / 2 - 150);
  const [pipes, setPipes] = useState([]);
  
  const birdVelocity = useRef(0);
  const gameLoopId = useRef(null);
  const birdPositionRef = useRef(SCREEN_HEIGHT / 2 - 150);
  const gameStateRef = useRef('loading');
  const scoreRef = useRef(0);
  const loadingProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadHighScore();
    
    // Animate loading bar
    Animated.timing(loadingProgress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    
    // Show loading screen for 5 seconds
    const loadingTimer = setTimeout(() => {
      setGameState('start');
      gameStateRef.current = 'start';
    }, 5000);
    
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    birdPositionRef.current = birdPosition;
  }, [birdPosition]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      startGameLoop();
    } else {
      stopGameLoop();
    }
    return () => stopGameLoop();
  }, [gameState]);

  const loadHighScore = async () => {
    try {
      const saved = await AsyncStorage.getItem('flyingBirdieHighScore');
      if (saved) setHighScore(parseInt(saved));
    } catch (e) {
      console.log('Error loading high score');
    }
  };

  const saveHighScore = async (newScore) => {
    try {
      console.log('Saving score:', newScore, 'Current high score:', highScore);
      if (newScore > highScore) {
        await AsyncStorage.setItem('flyingBirdieHighScore', newScore.toString());
        setHighScore(newScore);
        console.log('New high score saved:', newScore);
        return true;
      }
      return false;
    } catch (e) {
      console.log('Error saving high score:', e);
      return false;
    }
  };

  // Haptic Feedback Functions
  const triggerLightHaptic = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptic not available');
    }
  };

  const triggerMediumHaptic = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptic not available');
    }
  };

  const triggerSuccessHaptic = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.log('Haptic not available');
    }
  };

  const triggerErrorHaptic = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.log('Haptic not available');
    }
  };

  const startGame = () => {
    triggerLightHaptic(); // Haptic when starting game
    const startY = SCREEN_HEIGHT / 2 - 150;
    setBirdPosition(startY);
    birdPositionRef.current = startY;
    birdVelocity.current = 0;
    setScore(0);
    scoreRef.current = 0;
    setPipes([
      createPipe(SCREEN_WIDTH + 100),
      createPipe(SCREEN_WIDTH + 100 + SCREEN_WIDTH / 2),
    ]);
    setGameState('playing');
    gameStateRef.current = 'playing';
  };

  const createPipe = (xPosition) => {
    const minHeight = 120;
    const maxHeight = SCREEN_HEIGHT - PIPE_GAP - minHeight - 100;
    const topHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    
    return {
      id: Math.random(),
      x: xPosition,
      topHeight: topHeight,
      bottomY: topHeight + PIPE_GAP,
      scored: false,
    };
  };

  const startGameLoop = () => {
    if (gameLoopId.current) {
      clearInterval(gameLoopId.current);
    }
    gameLoopId.current = setInterval(updateGame, 1000 / 60);
  };

  const stopGameLoop = () => {
    if (gameLoopId.current) {
      clearInterval(gameLoopId.current);
      gameLoopId.current = null;
    }
  };

  const checkCollision = (birdY, pipe) => {
    const birdLeft = 100 + COLLISION_PADDING;
    const birdRight = 100 + BIRD_SIZE - COLLISION_PADDING;
    const birdTop = birdY + COLLISION_PADDING;
    const birdBottom = birdY + BIRD_SIZE - COLLISION_PADDING;

    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + PIPE_WIDTH;

    if (birdRight < pipeLeft || birdLeft > pipeRight) {
      return false;
    }

    if (birdTop < pipe.topHeight) {
      return true;
    }

    if (birdBottom > pipe.bottomY) {
      return true;
    }

    return false;
  };

  const updateGame = () => {
    if (gameStateRef.current !== 'playing') {
      return;
    }

    birdVelocity.current += GRAVITY;
    const newBirdPosition = birdPositionRef.current + birdVelocity.current;
    
    const groundY = SCREEN_HEIGHT - 80 - BIRD_SIZE;
    if (newBirdPosition >= groundY) {
      endGame();
      return;
    }
    
    if (newBirdPosition <= 0) {
      endGame();
      return;
    }
    
    birdPositionRef.current = newBirdPosition;
    setBirdPosition(newBirdPosition);

    setPipes(prevPipes => {
      const updatedPipes = prevPipes.map(pipe => {
        const newPipe = { ...pipe, x: pipe.x - GAME_SPEED };
        
        if (!newPipe.scored && newPipe.x + PIPE_WIDTH < 90) {
          newPipe.scored = true;
          setScore(s => {
            const newScore = s + 1;
            scoreRef.current = newScore;
            return newScore;
          });
          triggerSuccessHaptic(); // Haptic when scoring
        }
        
        if (gameStateRef.current === 'playing') {
          const inCollisionZone = newPipe.x < 150 && newPipe.x + PIPE_WIDTH > 100;
          if (inCollisionZone && checkCollision(newBirdPosition, newPipe)) {
            endGame();
          }
        }
        
        return newPipe;
      });

      let finalPipes = updatedPipes.filter(pipe => pipe.x > -PIPE_WIDTH - 50);
      
      if (finalPipes.length > 0) {
        const lastPipe = finalPipes[finalPipes.length - 1];
        if (lastPipe.x < SCREEN_WIDTH - 250) {
          finalPipes.push(createPipe(SCREEN_WIDTH + 50));
        }
      }

      return finalPipes;
    });
  };

  const endGame = () => {
    if (gameStateRef.current === 'playing') {
      triggerErrorHaptic(); // Strong haptic on game over
      gameStateRef.current = 'gameOver';
      setGameState('gameOver');
      stopGameLoop();
      
      // Use scoreRef to ensure we have the latest score
      saveHighScore(scoreRef.current);
    }
  };

  const handleTap = () => {
    if (gameState === 'playing') {
      birdVelocity.current = FLAP_STRENGTH;
      triggerLightHaptic(); // Light haptic on each flap
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <TouchableOpacity 
        style={styles.gameArea} 
        activeOpacity={1}
        onPress={handleTap}
        disabled={gameState !== 'playing'}
      >
        {/* Sky */}
        <View style={styles.sky}>
          {/* Score */}
          {gameState === 'playing' && (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>{score}</Text>
            </View>
          )}

          {/* Pipes */}
          {pipes.map(pipe => (
            <View key={pipe.id}>
              <View 
                style={[
                  styles.pipe,
                  {
                    left: pipe.x,
                    top: 0,
                    height: pipe.topHeight,
                  }
                ]}
              >
                <View style={styles.pipeCap} />
              </View>
              <View 
                style={[
                  styles.pipe,
                  {
                    left: pipe.x,
                    top: pipe.bottomY,
                    height: SCREEN_HEIGHT - pipe.bottomY - 80,
                  }
                ]}
              >
                <View style={[styles.pipeCap, { top: 0 }]} />
              </View>
            </View>
          ))}

          {/* Bird */}
          {(gameState === 'playing' || gameState === 'gameOver') && (
            <View 
              style={[
                styles.bird,
                {
                  top: birdPosition,
                  transform: [{ rotate: `${Math.min(Math.max(birdVelocity.current * 2, -30), 30)}deg` }]
                }
              ]}
            >
              <Image 
                source={require('./assets/bird.png')}
                style={styles.birdImage}
                resizeMode="contain"
              />
            </View>
          )}
        </View>

        {/* Ground */}
        <View style={styles.ground}>
          <View style={styles.grass} />
        </View>
      </TouchableOpacity>

      {/* Loading Screen */}
      {gameState === 'loading' && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <Text style={styles.loadingTitle}>Flying Birdie</Text>
            <Image 
              source={require('./assets/bird.png')}
              style={styles.loadingBirdImage}
              resizeMode="contain"
            />
            <Text style={styles.loadingText}>Loading...</Text>
            <View style={styles.loadingBarContainer}>
              <Animated.View 
                style={[
                  styles.loadingBar,
                  {
                    width: loadingProgress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]} 
              />
            </View>
            <Text style={styles.poweredBy}>Powered by Dynamic.IO</Text>
          </View>
        </View>
      )}

      {/* Start Screen */}
      {gameState === 'start' && (
        <View style={styles.overlay}>
          <View style={styles.menuBox}>
            <Text style={styles.title}>Flying Birdie</Text>
            <Image 
              source={require('./assets/bird.png')}
              style={styles.bigBirdImage}
              resizeMode="contain"
            />
            <Text style={styles.instructions}>Tap anywhere to flap!</Text>
            <Text style={styles.bestScore}>High Score: {highScore}</Text>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>START GAME</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameOver' && (
        <View style={styles.overlay}>
          <View style={styles.menuBox}>
            <Text style={styles.gameOverTitle}>Game Over!</Text>
            <Text style={styles.finalScore}>Score: {score}</Text>
            {score >= highScore && score > 0 && (
              <Text style={styles.newRecord}>🏆 NEW HIGH SCORE! 🏆</Text>
            )}
            <Text style={styles.bestScore}>Best: {highScore}</Text>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>PLAY AGAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gameArea: {
    flex: 1,
  },
  sky: {
    flex: 1,
    backgroundColor: '#87CEEB',
    position: 'relative',
  },
  ground: {
    height: 80,
    backgroundColor: '#8B4513',
  },
  grass: {
    height: 15,
    backgroundColor: '#228B22',
  },
  scoreContainer: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    zIndex: 1000,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  pipe: {
    position: 'absolute',
    width: PIPE_WIDTH,
    backgroundColor: '#228B22',
    borderWidth: 3,
    borderColor: '#006400',
  },
  pipeCap: {
    position: 'absolute',
    bottom: 0,
    left: -5,
    right: -5,
    height: 25,
    backgroundColor: '#228B22',
    borderWidth: 3,
    borderColor: '#006400',
  },
  bird: {
    position: 'absolute',
    left: 100,
    width: BIRD_SIZE,
    height: BIRD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  birdImage: {
    width: BIRD_SIZE,
    height: BIRD_SIZE,
  },
  bigBirdImage: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  gameOverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 18,
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  finalScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginVertical: 15,
  },
  bestScore: {
    fontSize: 20,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  newRecord: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F39C12',
    marginVertical: 10,
  },
  startButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingBox: {
    alignItems: 'center',
    width: '85%',
    maxWidth: 400,
  },
  loadingTitle: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  loadingBirdImage: {
    width: 150,
    height: 150,
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 24,
    color: '#2C3E50',
    marginBottom: 20,
    fontWeight: '600',
  },
  loadingBarContainer: {
    width: '70%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 40,
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#3498DB',
  },
  poweredBy: {
    fontSize: 16,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
});
