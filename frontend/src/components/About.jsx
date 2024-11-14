import Navbar from "../partials/Navbar";
import Topbar from "../partials/Topbar";

const ExpertiseList = ({ items }) => (
  <ul className="text-white text-lg space-y-2">
    {items.map((item, index) => (
      <li key={index}>◉ {item}</li>
    ))}
  </ul>
);

const About = () => {
  const expertise = [
    "Interior Design: Creating stylish and functional spaces tailored to your needs.",
    "Spatial Planning: Optimizing the use of space for maximum efficiency and comfort.",
    "Furniture Curation: Custom furniture solutions designed to enhance your space.",
    "Turnkey Projects: End-to-end services including design, electrical, plumbing, and installation."
  ];

  return (
    <div className="min-h-screen container mx-auto px-6 py-8">
      <Topbar />
      <Navbar />
      <header className="text-center mt-10 mb-6">
        <h1 className="text-white text-3xl font-black uppercase">About Shree Jay Furniture: Transforming Spaces with Excellence</h1>
      </header>

      <section className="max-w-6xl mx-auto p-10 bg-[#1D1D1D] rounded-lg border-4 border-[#282828] space-y-8">
        <article>
          <p className="text-white text-lg">
            At Shree Jay Furniture, we are more than just an interior design company—we are passionate creators dedicated to transforming spaces...
          </p>
        </article>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-white text-3xl font-black uppercase mb-4">Our Expertise</h2>
            <ExpertiseList items={expertise} />
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-white text-3xl font-black uppercase mb-4">Why Choose Us?</h2>
            <ul className="text-white text-lg space-y-2">
              <li>◉ Experienced Professionals: A dedicated team of skilled craftsmen and designers.</li>
              <li>◉ High-Quality Materials: Only premium, ISI-certified materials for durability and aesthetic appeal.</li>
              <li>◉ Lifetime Warranty: Offering lifetime warranties on all furniture and services.</li>
              <li>◉ Client-Centric Approach: We work closely with you to ensure your vision becomes a reality.</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-white text-3xl font-black uppercase mb-4">Our Mission</h2>
            <p className="text-white text-lg">◉ To provide our clients with the highest quality interior designs and solutions...</p>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-white text-3xl font-black uppercase mb-4">Our Vision</h2>
            <p className="text-white text-lg">◉ To become the foremost name in Gujarat for distinctive and innovative interior design...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
