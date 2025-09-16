import { TrendingUp, Database, Brain, Target } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
              <Brain className="w-16 h-16 text-blue-300" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Coupon Purchase Prediction
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed">
            Leveraging Machine Learning to predict customer coupon redemption behavior with high accuracy and actionable insights
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <Database className="w-10 h-10 text-blue-300 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">6 Datasets</h3>
              <p className="text-blue-200">Comprehensive customer data pipeline</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <TrendingUp className="w-10 h-10 text-green-300 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">96.6% AUC</h3>
              <p className="text-blue-200">Best performing XGBoost</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <Target className="w-10 h-10 text-purple-300 mb-4 mx-auto" />
              <h3 className="text-2xl font-bold mb-2">90.8% Accuracy</h3>
              <p className="text-blue-200">Balanced prediction performance</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              View Results
            </button>
            <button 
              onClick={() => document.getElementById('data')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-semibold transition-colors"
            >
              Explore Data
            </button>
            <button
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
            >
              Try Predict
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}