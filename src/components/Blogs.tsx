import { useState, useRef, useEffect } from 'react';
import { BookOpen, ArrowRight, Calendar, Clock, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: number;
  title: string;
  summary: string;
  date: string;
  url: string;
  tags: string[];
  coverImage?: string;
  readTime: string;
}

const blogsData: Blog[] = [
  {
    id: 1,
    title: "Gen AI ~ The Man-Made Creator",
    summary: `What if the intelligence we created eventually surpasses our own ability to understand it?\n\nIt was afternoon around 2:00 PM-IST, and I was huddled over my laptop in my college computer lab. While my classmates were either sleeping or cramming for exams, I was amazed by the code running on my screen. For the first time, my ML model had created something I hadn't explicitly programmed it to do—it had learned to recognize patterns in my handwriting that even I hadn't noticed, my hand writing is very bad sometimes even I am unable to understand what I wrote My model was able to understand what I actually wrote and find a pattren in it who wouldn't be shocked. That moment in my third year of B.Tech was nothing short of magical. I wasn't just a student anymore; I was witnessing creation through creation.\n\nThis is the fascinating paradox of Generative AI—humanity's attempt to build systems that can themselves create, imagine, and innovate. I was like ABSOLUTE CINEMA!!`,
    date: "May 17, 2025",
    url: "https://gencreator.blogspot.com/2025/05/themanscreation.html",
    tags: ["Generative AI", "Creativity", "Technology", "AI"],
    readTime: "9 min read"
  }
];

const Blogs = () => {
  const { toast } = useToast();
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const blogsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const items = entries[0].target.querySelectorAll('.blog-card');
          items.forEach((item, index) => {
            setTimeout(() => {
              (item as HTMLElement).classList.add('opacity-100', 'translate-y-0');
              (item as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
            }, 100 * index);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (blogsRef.current) observer.observe(blogsRef.current);
    
    return () => observer.disconnect();
  }, []);
  
  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleReadMore = (url: string) => {
    window.open(url, '_blank');
    closeModal();
  };

  return (
    <section id="blogs" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center relative">
            <span className="relative inline-block">
              My Blog
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/30 to-primary"></span>
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-2xl">Thoughts, ideas, and insights from my journey in tech and development</p>
        </div>
        
        <div 
          ref={blogsRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {blogsData.map((blog) => (
            <div 
              key={blog.id}
              className="blog-card opacity-0 translate-y-10 transition-all duration-700 cursor-pointer group"
              onClick={() => openModal(blog)}
            >
              <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 h-[320px] flex flex-col">
                {/* Decorative gradient overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="p-6 relative h-full flex flex-col">
                  {/* Top section with date and read time */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Title with hover effect */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">{blog.title}</h3>
                  
                  {/* Summary: only show the question for the first blog, else normal */}
                  {blog.id === 1 ? (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      What if the intelligence we created eventually surpasses our own ability to understand it?
                    </p>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">{blog.summary}</p>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700/70 rounded-full text-xs font-medium transition-transform duration-300 hover:scale-105"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Read more link */}
                  <div className="flex justify-end mt-auto">
                    <div className="inline-flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                      Read Article
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative side accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/70 to-primary/30"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Blog Modal */}
      <div className={`fixed inset-0 z-50 ${modalOpen ? 'modal-open' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content max-w-3xl">
          {selectedBlog && (
            <div className="space-y-6">
              {/* Header with close button */}
              <div className="flex justify-between items-start">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">{selectedBlog.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedBlog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedBlog.readTime}</span>
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-wrap gap-2">
                  {selectedBlog.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Summary */}
              <div className="prose dark:prose-invert max-w-none">
                {selectedBlog && selectedBlog.id === 1 ? (
                  <pre className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap" style={{fontFamily: 'inherit', background: 'none', padding: 0, margin: 0}}>
                    {selectedBlog.summary}
                  </pre>
                ) : (
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedBlog && selectedBlog.summary}
                  </p>
                )}
              </div>
              
              {/* Call to action */}
              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => handleReadMore(selectedBlog.url)}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Read Full Article
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
