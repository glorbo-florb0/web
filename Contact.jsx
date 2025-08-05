import React from 'react';
import { useState } from 'react';
import NavigationMenu from '../components/NavigationMenu';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-800 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">About Equinox Tanks</h1>
          <p className="text-red-200">Your premier source for tank history and information</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            Equinox Tanks is dedicated to preserving and sharing the rich history of armored vehicles 
            from conflicts around the world. We believe that understanding the technological evolution 
            and historical significance of tanks helps us better comprehend military history and 
            technological advancement.
          </p>
          <p className="text-lg text-gray-700">
            Our platform serves as a comprehensive resource for historians, enthusiasts, students, 
            and anyone interested in learning about the machines that shaped modern warfare.
          </p>
        </div>

        {/* What We Offer Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Database</h3>
              <p className="text-gray-600">
                Detailed information on tanks from World War I through the modern era, 
                including specifications, history, and combat records.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">High-Quality Images</h3>
              <p className="text-gray-600">
                Extensive photo galleries showcasing tanks from multiple angles, 
                including historical photos and modern museum pieces.
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Driven</h3>
              <p className="text-gray-600">
                User contributions, corrections, and discussions help maintain 
                accuracy and expand our knowledge base.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Information</h3>
              <p className="text-gray-600">
                All content is researched and verified by experts and enthusiasts 
                to ensure historical accuracy and reliability.
              </p>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2020 - The Beginning</h3>
              <p className="text-gray-700">
                Equinox Tanks was founded by a group of military history enthusiasts who recognized 
                the need for a centralized, accurate database of armored vehicle information.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2021 - Community Growth</h3>
              <p className="text-gray-700">
                We expanded our community features, allowing users to contribute corrections, 
                share knowledge, and engage in discussions about tank history.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2022-Present - Continuous Innovation</h3>
              <p className="text-gray-700">
                Today, we continue to expand our database, improve user experience, and serve 
                as the go-to resource for tank enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
          <p className="text-lg text-gray-700 mb-6">
            Our team consists of military historians, researchers, web developers, and passionate 
            volunteers who share a common interest in preserving tank history for future generations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Team</h3>
              <p className="text-gray-600">
                Military historians and researchers who ensure the accuracy of our content.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Development Team</h3>
              <p className="text-gray-600">
                Web developers who build and maintain our platform's functionality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Volunteers and contributors who help expand and improve our database.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-6">
            Help us preserve tank history for future generations
          </p>
          <div className="space-x-4">
            <a href="/register" className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Register Now
            </a>
            <a href="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}