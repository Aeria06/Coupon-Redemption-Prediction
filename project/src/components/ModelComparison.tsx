import { Brain, Zap, BarChart3, TrendingUp, TreePine } from 'lucide-react';

export default function ModelComparison() {
  const models = [
    {
      name: "XGBoost",
      icon: Zap,
      accuracy: "90.75%",
      precision: { class0: "90.90%", class1: "90.60%" },
      recall: { class0: "90.57%", class1: "90.93%" },
      f1Score: { class0: "90.73%", class1: "90.77%" },
      macroAvg: { precision: "90.75%", recall: "90.75%", f1: "90.75%" },
      weightedAvg: { precision: "90.75%", recall: "90.75%", f1: "90.75%" },
      rocAuc: "96.56%",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      description: "Best overall performance with excellent balanced metrics and superior ROC-AUC"
    },
    {
      name: "Random Forest",
      icon: TreePine,
      accuracy: "88%",
      precision: { class0: "88.5%", class1: "87.5%" },
      recall: { class0: "87.8%", class1: "88.2%" },
      f1Score: { class0: "88.1%", class1: "87.8%" },
      macroAvg: { precision: "88%", recall: "88%", f1: "88.45%" },
      weightedAvg: { precision: "88%", recall: "88%", f1: "88%" },
      rocAuc: "94.82%",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      description: "Strong ensemble performance with good generalization and interpretability"
    },
    {
      name: "Neural Network", 
      icon: Brain,
      accuracy: "86%",
      precision: { class0: "87.39%", class1: "85.19%" },
      recall: { class0: "84.74%", class1: "87.78%" },
      f1Score: { class0: "86.05%", class1: "86.47%" },
      macroAvg: { precision: "82.1%", recall: "81.7%", f1: "81.6%" },
      weightedAvg: { precision: "82.1%", recall: "81.7%", f1: "81.6%" },
      rocAuc: "93.32%",
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      description: "Balanced performance across both classes with excellent ROC-AUC"
    }
  ];

  return (
    <section id="models" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Model Performance Comparison
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Comprehensive evaluation of XGBoost, Random Forest, and Neural Network for coupon purchase prediction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {models.map((model, index) => {
            const Icon = model.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className={`${model.color} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <Icon className="w-8 h-8 mr-3" />
                    <h3 className="text-2xl font-bold">{model.name}</h3>
                  </div>
                  <p className="text-blue-100">{model.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-1">{model.accuracy}</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    {model.rocAuc && (
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{model.rocAuc}</div>
                        <div className="text-sm text-gray-600">ROC-AUC</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Per-Class Performance</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="font-semibold text-green-800 mb-1">Class 0 (Majority)</div>
                          <div className="space-y-1">
                            <div>Precision: {model.precision.class0}</div>
                            <div>Recall: {model.recall.class0}</div>
                            <div>F1-Score: {model.f1Score.class0}</div>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg">
                          <div className="font-semibold text-orange-800 mb-1">Class 1 (Target)</div>
                          <div className="space-y-1">
                            <div>Precision: {model.precision.class1}</div>
                            <div>Recall: {model.recall.class1}</div>
                            <div>F1-Score: {model.f1Score.class1}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Overall Metrics</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="font-semibold text-purple-800 mb-1">Macro Average</div>
                          <div className="space-y-1">
                            <div>Precision: {model.macroAvg.precision}</div>
                            <div>Recall: {model.macroAvg.recall}</div>
                            <div>F1-Score: {model.macroAvg.f1}</div>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-semibold text-gray-800 mb-1">Weighted Average</div>
                          <div className="space-y-1">
                            <div>Precision: {model.weightedAvg.precision}</div>
                            <div>Recall: {model.weightedAvg.recall}</div>
                            <div>F1-Score: {model.weightedAvg.f1}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Key Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-green-600 mb-3">XGBoost Strengths</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Highest accuracy (90.75%)</li>
                <li>• Superior ROC-AUC (96.56%)</li>
                <li>• Excellent balanced performance</li>
                <li>• Fast training and inference</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-orange-600 mb-3">Random Forest Benefits</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Strong accuracy (88%)</li>
                <li>• Good interpretability</li>
                <li>• Robust to outliers</li>
                <li>• Handles mixed data types well</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-blue-600 mb-3">Neural Network Advantages</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Balanced performance across classes</li>
                <li>• Good ROC-AUC (93.32%)</li>
                <li>• Captures complex patterns</li>
                <li>• Scalable to large datasets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}