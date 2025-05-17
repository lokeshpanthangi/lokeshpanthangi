import { useEffect, useRef, useState } from 'react';
import { Trophy, Dumbbell, Gamepad2, Footprints, Award, Code } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main About Card */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 lg:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Hello, I'm <span className="text-primary">Venkata Lokesh Panthangi</span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I'm an <b>AI & ML Engineer</b> and B.Tech student at VVIT, specializing in Artificial Intelligence and Machine Learning. I'm passionate about building intelligent, scalable solutions that merge data and real-world needs.
          </p>
          <ul className="mb-6 space-y-3">
            <li className="flex items-start gap-2"><span className="text-primary mt-1">&#8250;</span> Achieved 89.8% system uptime and 18% downtime reduction by developing a Django-based real-time monitoring system for 50+ pressure pumps at Brainovision.</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">&#8250;</span> Built and deployed AI/ML projects, including generative AI models and deep learning solutions for real-world applications.</li>
            <li className="flex items-start gap-2"><span className="text-primary mt-1">&#8250;</span> Certified Google Associate Cloud Engineer, GATE 2024 qualified, and solved 300+ LeetCode problems.</li>
          </ul>
          {/* Education Card */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mt-6">
            <div className="flex items-center mb-2">
              <Code className="text-primary mr-2" size={20} />
              <span className="font-semibold text-lg">Education</span>
            </div>
            <div className="mb-1 font-medium text-gray-900 dark:text-gray-100">B.Tech in Computer Science Engineering - AI & ML</div>
            <div className="text-gray-700 dark:text-gray-300 mb-1 italic">Vasireddy Venkatadri Institute of Technology (VVIT)</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">2021–2025 | Guntur</div>
          </div>
        </div>
        {/* Right Side Cards */}
        <div className="flex flex-col gap-8">
          {/* Achievements Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Award className="text-primary mr-2 animate-bounce" size={20} />
              <span className="font-semibold text-lg">Achievements</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Solved 300+ problems on LeetCode</li>
              <li>Certified Google Associate Cloud Engineer</li>
              <li>Qualified GATE 2024 (AIR 15,202)</li>
              <li>Conducted a Hackathon in my branch</li>
              <li>Wrote an Unofficial Expansion for RDR2</li>
            </ul>
          </div>
          {/* Hobbies Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <div className="flex items-center mb-3">
              <Footprints className="text-primary mr-2 animate-pulse" size={20} />
              <span className="font-semibold text-lg">Hobbies</span>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Going to the gym</li>
              <li>Esports player</li>
              <li>Enjoying long walks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
