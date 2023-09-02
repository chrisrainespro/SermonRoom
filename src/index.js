import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { VideoProvider } from './Contexts/VideoContext';
import { CategoryProvider } from './Contexts/CategoryContext';
import { SeriesProvider } from './Contexts/SeriesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VideoProvider>
      <SeriesProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
      </SeriesProvider>
    </VideoProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
