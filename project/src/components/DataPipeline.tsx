import { Database, ArrowRight, Users, ShoppingCart, Tag, Receipt, Brain, Target } from 'lucide-react';

export default function DataPipeline() {
  const datasets = [
    {
      name: "Training Data",
      file: "train.csv",
  description: "Labeled coupon purchase data for model training",
      icon: Database,
      color: "bg-blue-500"
    },
    {
      name: "Campaign Data", 
      file: "campaign_data.csv",
      description: "Marketing campaign information and metadata",
      icon: Tag,
      color: "bg-green-500"
    },
    {
      name: "Customer Demographics",
      file: "customer_demographics.csv", 
      description: "Age, income, location, and demographic features",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      name: "Transaction History",
      file: "customer_transaction_data.csv",
      description: "Purchase history and spending patterns",
      icon: ShoppingCart,
      color: "bg-orange-500"
    },
    {
      name: "Coupon Mapping",
      file: "coupon_item_mapping.csv",
      description: "Coupon-to-item relationships and categories",
      icon: Receipt,
      color: "bg-teal-500"
    },
    {
      name: "Item Data",
      file: "item_data.csv",
      description: "Product information, categories, and attributes",
      icon: Database,
      color: "bg-pink-500"
    }
  ];

  return (
    <section id="data" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Data Pipeline
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Our comprehensive data pipeline integrates multiple customer touchpoints to create a holistic view of behavior patterns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {datasets.map((dataset, index) => {
            const Icon = dataset.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className={`${dataset.color} p-3 rounded-lg w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{dataset.name}</h3>
                <p className="text-sm font-mono text-gray-500 mb-3">{dataset.file}</p>
                <p className="text-gray-600">{dataset.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Data Flow Architecture</h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg">
                <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Raw Data</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-semibold">Feature Engineering</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-lg">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Model Training</p>
              </div>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 md:rotate-0" />
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-lg">
                <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-semibold">Prediction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}