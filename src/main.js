import gimci from './gimci'


console.log('start gimci...', gimci)

if (typeof window !== 'undefined') {
  window.gimci = gimci
}
