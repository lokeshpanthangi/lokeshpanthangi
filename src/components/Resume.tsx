import { useState, useRef } from 'react';
import { Download, Briefcase, GraduationCap, Code } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('experience');
  const [tabTransition, setTabTransition] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Add animation when switching tabs
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setTabTransition(false);
      }, 50);
    }, 200);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Lokesh_Panthangi.pdf';
    link.download = 'Lokesh_Panthangi.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-purple-400/30 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title with-glowing-dots">Professional Resume</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            A summary of my professional experience and education
          </p>
        </div>

        <div ref={resumeRef} className="mt-12 max-w-6xl mx-auto">
          {/* Resume Header with Download Button */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-t-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-400 text-white">
                <span className="text-2xl font-bold">V</span>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-blue-400 dark:to-primary">Venkata Lokesh Panthangi</h3>
                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                  <Code size={16} className="text-primary" />
                  AI & ML Engineer
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="resume-download-btn flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 relative overflow-hidden"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Download Resume
                </>
              )}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-none">
            <button
              onClick={() => handleTabChange('experience')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${activeTab === 'experience' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <Briefcase size={18} className={`transition-transform duration-300 ${activeTab === 'experience' ? 'scale-110 rotate-12' : ''}`} />
              Experience
            </button>
            <button
              onClick={() => handleTabChange('education')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${activeTab === 'education' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              <GraduationCap size={18} className={`transition-transform duration-300 ${activeTab === 'education' ? 'scale-110 rotate-12' : ''}`} />
              Education
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-b-2xl shadow-lg border border-t-0 border-gray-100 dark:border-gray-700 min-h-[400px]">
            {/* Content wrapper with transition */}
            <div className={`transition-opacity duration-200 ${tabTransition ? 'opacity-0' : 'opacity-100'}`}>
              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {/* Brainovision Experience */}
                  <div className="resume-card group">
                    <div className="resume-card-timeline"></div>
                    <div className="resume-card-dot"></div>
                    <div className="resume-card-content">
                      <div className="flex flex-row justify-between items-center mb-1">
                        <h4 className="font-bold text-xl group-hover:text-primary transition-colors">Full Stack Developer</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full inline-flex items-center ml-4">Jul 2024 – Jan 2025</span>
                      </div>
                      <div className="flex flex-row justify-between items-center mb-2">
                        <span className="italic text-gray-800 dark:text-gray-200 font-normal">Brainovision</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">Hyderabad</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600 dark:text-gray-300">
                        <li>Developed a Django app for real-time monitoring and management of 50+ pressure pumps, achieving 89.8% uptime.</li>
                        <li>Improved operational efficiency and reduced downtime by 18% using predictive maintenance.</li>
                        <li>Automated notifications and reporting with Django Channels, reducing response times by 30%.</li>
                      </ul>
                    </div>
                  </div>
                  {/* Zensar Technologies Experience */}
                  <div className="resume-card group">
                    <div className="resume-card-timeline"></div>
                    <div className="resume-card-dot"></div>
                    <div className="resume-card-content">
                      <div className="flex flex-row justify-between items-center mb-1">
                        <h4 className="font-bold text-xl group-hover:text-primary transition-colors">Application Implementer</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full inline-flex items-center ml-4">Jan 2025 – Apr 2025</span>
                      </div>
                      <div className="flex flex-row justify-between items-center mb-2">
                        <span className="italic text-gray-800 dark:text-gray-200 font-normal">Zensar Technologies</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">Bangalore</span>
                      </div>
                      <ul className="list-disc pl-5 space-y-2 mt-2 text-gray-600 dark:text-gray-300">
                        <li>Collaborated with cross-functional teams to deploy and configure enterprise applications, ensuring seamless integration with client systems.</li>
                        <li>Provided technical support and training to end-users, improving adoption rates and reducing post-implementation issues.</li>
                        <li>Customized application features based on client requirements, enhancing user experience and operational efficiency.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="resume-card group">
                    <div className="resume-card-timeline"></div>
                    <div className="resume-card-dot"></div>
                    <div className="resume-card-content">
                      <div className="flex flex-col mb-2">
                        <h5 className="text-primary mb-2 text-lg font-semibold">B.Tech in Computer Science Engineering - Artificial Intelligence and Machine Learning</h5>
                        <div className="flex flex-row justify-between items-center">
                          <span className="italic text-gray-800 dark:text-gray-200 font-normal">Vasireddy Venkatadri Institute of Technology</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">Guntur</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">2021–2025</span>
                      </div>
                    </div>
                  </div>
            
                  {/* Intermediate - MPC Entry */}
                  <div className="resume-card group">
                    <div className="resume-card-timeline"></div>
                    <div className="resume-card-dot"></div>
                    <div className="resume-card-content">
                      <div className="flex flex-col mb-2">
                        <h5 className="text-primary mb-2 text-lg font-semibold">Intermediate - MPC</h5>
                        <div className="flex flex-row justify-between items-center">
                          <span className="italic text-gray-800 dark:text-gray-200 font-normal">Nirmala Junior College</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">Guntur</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">2019–2021</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
