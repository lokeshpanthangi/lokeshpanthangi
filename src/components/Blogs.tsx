
import { useState, useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
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
    title: "Understanding Modern Web Architecture",
    summary: "A deep dive into modern web architecture patterns and best practices for scalable applications.",
    date: "April 12, 2025",
    url: "https://example.com/blog/web-architecture",
    tags: ["Web Development", "Architecture", "React"],
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "The Future of Cloud Computing",
    summary: "Exploring emerging trends in cloud computing and what they mean for businesses.",
    date: "March 3, 2025",
    url: "https://example.com/blog/cloud-future",
    tags: ["Cloud", "AWS", "DevOps"],
    readTime: "12 min read"
  },
  {
    id: 3,
    title: "Mastering TypeScript: Advanced Patterns",
    summary: "Learn advanced TypeScript patterns and techniques to write more robust code.",
    date: "February 18, 2025",
    url: "https://example.com/blog/typescript-patterns",
    tags: ["TypeScript", "JavaScript", "Programming"],
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "The State of Frontend Development in 2025",
    summary: "An overview of the current state of frontend development and predictions for the future.",
    date: "January 25, 2025",
    url: "https://example.com/blog/frontend-2025",
    tags: ["Frontend", "Web Development", "UI/UX"],
    readTime: "6 min read"
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
              (item as HTMLElement).classList.add('opacity-100', 'translate-y-0', 'rotate-0', 'scale-100');
              (item as HTMLElement).classList.remove('opacity-0', 'translate-y-10', 'rotate-3', 'scale-95');
            }, 150 * index);
          });
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
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
    toast({
      title: "Opening blog post",
      description: "Redirecting to the full article",
    });
  };

  return (
    <section id="blogs" className="py-20 bg-gray-50 dark:bg-dark/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="section-title">My Blog</h2>
        
        <div 
          ref={blogsRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {blogsData.map((blog, index) => (
            <div 
              key={blog.id}
              className="blog-card opacity-0 translate-y-10 rotate-3 scale-95 transition-all duration-700 cursor-pointer"
              onClick={() => openModal(blog)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-full rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-[0_0_20px_rgba(58,134,255,0.6)] transition-all duration-500 transform hover:-translate-y-2">
                {/* Blog header with icon */}
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-full mr-3 animate-pulse-glow">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {blog.date} · {blog.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">{blog.summary}</p>
                  
                  {/* Blog tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {blog.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Enhanced blog modal */}
      <div className={`fixed inset-0 z-50 ${modalOpen ? 'modal-open' : 'hidden'}`}>
        <div className="modal-overlay" onClick={closeModal}></div>
        <div className="modal-content">
          {selectedBlog && (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl md:text-3xl font-bold">{selectedBlog.title}</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                <span>{selectedBlog.date}</span>
                <span>•</span>
                <span>{selectedBlog.readTime}</span>
                <div className="flex-1"></div>
                <div className="flex space-x-2">
                  {selectedBlog.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {selectedBlog.summary}
              </p>
              
              <div className="pt-4 text-center">
                <button
                  onClick={() => handleReadMore(selectedBlog.url)}
                  className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Read Full Article
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
