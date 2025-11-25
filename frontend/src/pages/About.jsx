export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F4F7FA] to-[#FFFFFF] py-16 px-6 flex justify-center">
      <div className="max-w-6xl bg-white/75 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-[#E5EAF0]">
        {/* HEADER */}
        <h1
          className="text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(to right, #000000, #4A4A4A)",
          }}
        >
          About Our Health Prediction Platform
        </h1>

        <p className="text-center text-[#5A6275] text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          A modern health-support system designed to help individuals understand
          risks early, monitor their well-being, and make informed decisions
          that support a healthier lifestyle.
        </p>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {[
            {
              icon: "🧬",
              title: "Early Health Awareness",
              desc: "Receive early warnings for major health risks through smart analysis.",
              color: "#000000",
            },
            {
              icon: "📈",
              title: "Meaningful Insights",
              desc: "Track your patterns and understand how your daily choices impact overall health.",
              color: "#2D2D2D",
            },
            {
              icon: "🔐",
              title: "Trust & Privacy",
              desc: "Your health data is handled with care, confidentiality, and complete privacy.",
              color: "#4A4A4A",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-3" style={{ color: card.color }}>
                {card.icon}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: card.color }}
              >
                {card.title}
              </h3>
              <p className="text-[#5A6275] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="space-y-10 text-lg leading-relaxed text-[#5A6275]">
          <div>
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              🎯 Our Mission
            </h2>
            <p className="mt-2">
              Our mission is to make health awareness simple and accessible for
              everyone. Early understanding of risks can empower individuals to
              take the right actions at the right time — even before symptoms
              appear.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              💡 How Our Platform Helps
            </h2>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>✔ Helps you understand potential risks early</li>
              <li>✔ Provides meaningful insights on your health patterns</li>
              <li>✔ Encourages lifestyle improvements based on data</li>
              <li>✔ Stores your past assessments for long-term tracking</li>
              <li>✔ Supports smarter decisions for your well-being</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              🌿 Why Our Platform Matters
            </h2>
            <p>
              Today, many health issues develop silently. Our platform helps you
              stay aware, stay informed, and take preventive measures long
              before serious risks arise. It’s not just a tool — it’s a
              long-term wellness companion.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black flex items-center gap-2">
              💖 Your Wellness, Our Priority
            </h2>
            <p>
              With clean visual insights and easy-to-understand assessments, our
              aim is to support your daily journey towards a healthy and
              confident life.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-14">
          <p className="text-xl italic text-[#5A6275]">
            “Healthy choices begin with awareness — and we help you take the
            first step.”
          </p>
        </div>
      </div>
    </section>
  );
}
