// Main entry point for the game engine library
import GameEngine from './core/GameEngine.js';
import InputManager from './core/InputManager.js';
import Player from './entities/Player.js';
import TileMap from './entities/TileMap.js';
import Renderer from './rendering/Renderer.js';
import PhysicsEngine from './physics/PhysicsEngine.js';

// Export all components
export {
    GameEngine,
    InputManager,
    Player,
    TileMap,
    Renderer,
    PhysicsEngine
};

// Default export for easy importing
export default GameEngine;