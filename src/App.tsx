import React from 'react';
import { Button } from './components/button';

function App() {
  return (
    <div>
      <header >
        <h1>FlyUI</h1>
      </header>

      <main>
        <Button maxTimeout={3000} url="https://httpbin.org/delay/2">Launch</Button>
      </main>
    </div>
  );
}

export default App;
