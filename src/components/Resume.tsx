
import { useState } from 'react';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = () => {
    setIsLoading(true);
    
    // Simulating download delay
    setTimeout(() => {
      // In a real app, you would have a real PDF file to download
      // For this demo, we're just showing the loading animation
      setIsLoading(false);
      
      // Alert the user
      alert("This is a demo. In a real application, your resume would download.");
    }, 2000);
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-dark">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">Resume</h2>
        
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 md:p-10 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">Venkat</h3>
                <p className="text-gray-600 dark:text-gray-300">Full Stack Developer</p>
              </div>
              
              <button
                onClick={handleDownload}
                disabled={isLoading}
                className={`mt-4 md:mt-0 flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors download-btn ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Experience Section */}
              <div>
                <h4 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  Experience
                </h4>
                
                <div className="space-y-6">
                  <div className="card-3d p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h5 className="font-semibold text-lg">Senior Developer</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Jan 2020 - Present</span>
                    </div>
                    <h6 className="text-primary mb-2">Example Company</h6>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>Led development of flagship product with React and Node.js</li>
                      <li>Improved application performance by 40% through code optimization</li>
                      <li>Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>
                  
                  <div className="card-3d p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h5 className="font-semibold text-lg">Frontend Developer</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">May 2018 - Dec 2019</span>
                    </div>
                    <h6 className="text-primary mb-2">Previous Company</h6>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                      <li>Developed responsive web applications using React</li>
                      <li>Collaborated with designers to implement UI/UX improvements</li>
                      <li>Integrated RESTful APIs and managed state with Redux</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Education Summary */}
              <div>
                <h4 className="text-xl font-bold border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  Education
                </h4>
                
                <div className="card-3d p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h5 className="font-semibold text-lg">Bachelor of Technology</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">2018 - 2022</span>
                  </div>
                  <h6 className="text-primary">Example University</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
