import { Code, Database, Brain, BarChart3 } from 'lucide-react';

export default function TechStack() {
  const categories = [
    {
      title: "Data Processing",
      icon: Database,
      color: "bg-blue-500",
      technologies: ["Pandas", "NumPy", "Scikit-learn", "Python"]
    },
    {
      title: "Machine Learning",
      icon: Brain, 
      color: "bg-purple-500",
      technologies: ["XGBoost", "TensorFlow/Keras", "Neural Networks", "Cross-validation"]
    },
    {
      title: "Visualization",
      icon: BarChart3,
      color: "bg-green-500", 
      technologies: ["Matplotlib", "Seaborn", "Classification Reports", "ROC Curves"]
    },
    {
      title: "Development",
      icon: Code,
      color: "bg-orange-500",
      technologies: ["Jupyter Notebooks", "Git", "Python 3.x", "Model Persistence"]
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Modern machine learning tools and libraries powering our prediction pipeline
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors">
                <div className={`${category.color} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="space-y-2">
                  {category.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="text-gray-300 text-sm">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Implementation Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Data Integration</h4>
              <p className="text-sm text-gray-300">Merged 6 datasets with comprehensive feature engineering</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Model Optimization</h4>
              <p className="text-sm text-gray-300">Hyperparameter tuning and threshold optimization</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Production Ready</h4>
              <p className="text-sm text-gray-300">Saved models and submission files for deployment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}