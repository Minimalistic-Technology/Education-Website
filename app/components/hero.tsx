import React from 'react';
import { BookOpen, Users, Award, ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-6">
              <span className="mr-2">🚀</span>
              <span className="text-sm font-medium">Start Your Learning Journey Today</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Future with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">Quality Education</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Unlock your potential with our comprehensive courses, expert instructors, and personalized learning experience designed for success.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                <span>Start Learning Now</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <button className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-800 font-semibold px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-md">
                <Play className="mr-2 w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-blue-600 mb-1">10K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-blue-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Feature Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature Card 1 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
                <p className="text-gray-600 text-sm">Engage with dynamic content and hands-on projects</p>
              </div>
              
              {/* Feature Card 2 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 mt-6 sm:mt-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Mentors</h3>
                <p className="text-gray-600 text-sm">Learn from industry professionals and thought leaders</p>
              </div>
              
              {/* Feature Card 3 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Certification</h3>
                <p className="text-gray-600 text-sm">Earn recognized certificates to boost your career</p>
              </div>
              
              {/* Feature Card 4 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 mt-6 sm:mt-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Flexible Schedule</h3>
                <p className="text-gray-600 text-sm">Learn at your own pace, anytime and anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}