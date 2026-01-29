import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-zinc-50 to-slate-50 py-12 sm:py-16 px-4 sm:px-6 flex justify-center">
      <div className="max-w-6xl w-full">
        {/* MAIN CARD */}
        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-gray-100 animate-fade-in">
          {/* HEADER */}
          <div className="text-center mb-10 sm:mb-12 animate-slide-down">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 bg-clip-text text-transparent">
              About Our Health Prediction Platform
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              A modern health-support system designed to help individuals understand
              risks early, monitor their well-being, and make informed decisions
              that support a healthier lifestyle.
            </p>
          </div>

          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Early Health Awareness",
                desc: "Receive early warnings for major health risks through smart analysis.",
                gradient: "from-red-500 to-pink-600",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                ),
                title: "Meaningful Insights",
                desc: "Track your patterns and understand how your daily choices impact overall health.",
                gradient: "from-green-500 to-emerald-600",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Trust & Privacy",
                desc: "Your health data is handled with care, confidentiality, and complete privacy.",
                gradient: "from-zinc-600 to-zinc-800",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 hover:border-zinc-300 animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT */}
          <div className="space-y-8 sm:space-y-10">
            {/* Mission */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg pl-0 sm:pl-15">
                Our mission is to make health awareness simple and accessible for
                everyone. Early understanding of risks can empower individuals to
                take the right actions at the right time — even before symptoms
                appear.
              </p>
            </div>

            {/* How Platform Helps */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  How Our Platform Helps
                </h2>
              </div>
              <ul className="space-y-3 pl-0 sm:pl-15">
                {[
                  "Helps you understand potential risks early",
                  "Provides meaningful insights on your health patterns",
                  "Encourages lifestyle improvements based on data",
                  "Stores your past assessments for long-term tracking",
                  "Supports smarter decisions for your well-being",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600 text-base sm:text-lg animate-slide-in-right" style={{ animationDelay: `${0.6 + idx * 0.05}s` }}>
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Platform Matters */}
            <div className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Why Our Platform Matters
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg pl-0 sm:pl-15">
                Today, many health issues develop silently. Our platform helps you
                stay aware, stay informed, and take preventive measures long
                before serious risks arise. It's not just a tool — it's a
                long-term wellness companion.
              </p>
            </div>

            {/* Your Wellness */}
            <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Your Wellness, Our Priority
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg pl-0 sm:pl-15">
                With clean visual insights and easy-to-understand assessments, our
                aim is to support your daily journey towards a healthy and
                confident life.
              </p>
            </div>
          </div>

          {/* QUOTE SECTION */}
          <div className="mt-12 sm:mt-14 p-6 sm:p-8 bg-gradient-to-r from-zinc-700 to-zinc-900 rounded-2xl shadow-xl animate-fade-in" style={{ animationDelay: '1.1s' }}>
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div>
                <p className="text-lg sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed">
                  Healthy choices begin with awareness — and we help you take the first step.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-12 h-1 bg-zinc-400 rounded-full"></div>
                  <span className="text-zinc-300 text-sm">Health Prediction Platform Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA SECTION */}
          <div className="mt-10 sm:mt-12 text-center animate-slide-up" style={{ animationDelay: '1.2s' }}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-zinc-50 rounded-2xl border-2 border-zinc-200">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Start Your Health Journey?</h3>
                <p className="text-gray-600 text-sm">Take control of your wellness with our AI-powered predictions.</p>
              </div>
              <Link to="/">
              <button className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-800 hover:from-zinc-700 hover:to-zinc-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 whitespace-nowrap">
                Get Started Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}