import React, { useState } from "react";

const Faqs = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const FAQItem = ({ question, answer, emoji }) => {
    const isActive = activeQuestion === question;

    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-4 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div
          className={`p-5 cursor-pointer flex justify-between items-center font-medium text-gray-800 transition-all duration-300 border-l-4 ${
            isActive
              ? "bg-gray-50 border-l-green-600"
              : "border-l-transparent hover:bg-gray-50 hover:border-l-green-400"
          }`}
          onClick={() => toggleQuestion(question)}
        >
          <span className="flex items-center gap-3 text-base flex-1 pr-4">
            <span className="text-xl">{emoji}</span>
            {question}
          </span>

          <span
            className={`text-lg text-green-600 transition-transform duration-300 ${
              isActive ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>

        {/* Answer Box */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-5 bg-gray-50 text-gray-700 text-[16px] leading-relaxed border-t border-gray-200">
            {answer}
          </div>
        </div>
      </div>
    );
  };

  const healthFAQs = [
    {
      emoji: "🤖",
      question: "What does this AI Health Risk app do?",
      answer:
        "PredictiX analyzes your health data using advanced machine learning algorithms to estimate your risk of diseases like diabetes and heart attack. It helps you detect early warning signs and make healthier decisions.",
    },
    {
      emoji: "📄",
      question: "Does PredictiX generate PDF health reports?",
      answer:
        "Yes! PredictiX generates individual, detailed PDF reports for each disease prediction. The report includes user inputs, AI-generated risk score, risk interpretation, and personalized recommendations. Every patient receives their own downloadable report.",
    },
    {
      emoji: "⚕️",
      question: "Is this a medical diagnosis?",
      answer:
        "No. PredictiX provides AI-based risk estimation only. It cannot replace professional medical tests, treatment, or doctor consultation.",
    },
    {
      emoji: "🎯",
      question: "How accurate is the prediction?",
      answer:
        "PredictiX is trained on verified medical datasets. However, predictions depend on how accurate your input values are. It should be used as guidance, not as a confirmed diagnosis.",
    },
    {
      emoji: "🔐",
      question: "Is my data safe?",
      answer:
        "Yes. PredictiX uses secure processing and does not store personal identity details. Your health data is never shared with third parties.",
    },
    {
      emoji: "🏥",
      question: "Can I use PredictiX during emergency symptoms?",
      answer:
        "No. For severe symptoms like chest pain, breathing issues, or dizziness, seek emergency medical help immediately. PredictiX is not meant for emergencies.",
    },
    {
      emoji: "🧪",
      question: "Do I need lab test reports?",
      answer:
        "Lab values such as HbA1c, fasting blood sugar, cholesterol, and triglycerides enhance prediction accuracy, but the app also works with basic inputs if lab results are not available.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center transition-all duration-300 hover:scale-[1.01]">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
            PredictiX AI Health FAQs
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Answers to the most common questions about PredictiX AI.
          </p>
          <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>

          {healthFAQs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              emoji={faq.emoji}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Faqs;
