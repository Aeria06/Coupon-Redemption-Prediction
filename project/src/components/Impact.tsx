import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

export default function Impact() {
  const metrics = [
    {
      icon: TrendingUp,
      title: "Improved Targeting",
      value: "89.7%",
      description: "ROC-AUC score enables precise customer segmentation"
    },
    {
      icon: Users,
      title: "Customer Insights", 
      value: "81.7%",
  description: "Balanced accuracy across coupon purchase patterns"
    },
    {
      icon: DollarSign,
      title: "Cost Efficiency",
      value: "85.5%",
      description: "Precision in identifying high-value customers"
    },
    {
      icon: Target,
      title: "Campaign Success",
      value: "76.2%",
      description: "Recall rate for capturing potential conversions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Business Impact
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transforming customer data into actionable business intelligence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{metric.title}</h4>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Strategic Advantages</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Precision Marketing</h4>
                  <p className="text-gray-600 text-sm">Target customers most likely to redeem coupons, reducing marketing waste and increasing ROI</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Segmentation</h4>
                  <p className="text-gray-600 text-sm">Identify distinct customer segments based on behavior patterns and demographics</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-4 flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Revenue Optimization</h4>
                  <p className="text-gray-600 text-sm">Maximize campaign effectiveness while minimizing customer acquisition costs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-4">Next Steps</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Deploy Neural Network model to production</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Implement real-time prediction API</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">A/B test campaign optimization</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Monitor and retrain with new data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}