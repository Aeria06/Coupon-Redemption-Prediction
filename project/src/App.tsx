import React from 'react';
import Hero from './components/Hero';
import DataPipeline from './components/DataPipeline';
import ModelComparison from './components/ModelComparison';
import TechStack from './components/TechStack';
import Impact from './components/Impact';
import Predictor from './components/Predictor';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <DataPipeline />
      <ModelComparison />
      <TechStack />
      <Impact />
      <Predictor />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Coupon Purchase Prediction Dashboard</h3>
          <p className="text-gray-400 mb-6">
            Advanced machine learning for actionable customer insights
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500 text-sm">
              Built with React, TypeScript, and Tailwind CSS • Neural Network achieved 89.7% ROC-AUC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;