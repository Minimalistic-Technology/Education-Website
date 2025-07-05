import React from 'react';
import { Monitor, Clock, Globe, Trophy, Users, BookOpen } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Online Learning",
      description: "Access courses from anywhere with our state-of-the-art learning platform",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexible Timing",
      description: "Study at your own pace with 24/7 access to course materials",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with learners from around the world and expand your network",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Achievements",
      description: "Earn certificates and badges as you progress through your learning journey",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Support",
      description: "Get help from our dedicated support team and expert instructors",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Rich Content",
      description: "Comprehensive study materials including videos, quizzes, and projects",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose EduLearn Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive educational solutions designed to help you achieve your learning goals and advance your career.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}