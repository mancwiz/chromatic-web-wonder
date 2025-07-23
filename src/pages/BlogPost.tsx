import { useParams, Link, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen } from "lucide-react";
import { allBlogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/navbar";
import { Helmet } from 'react-helmet-async';

const BlogPost = () => {
  const { slug } = useParams();
  const post = allBlogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = allBlogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
   <>
   {/* ================================================================== */}
      {/* START: DYNAMIC HELMET FOR SEO AND SOCIAL SHARING                 */}
      {/* ================================================================== */}
      <Helmet>
        {/* --- Primary Meta Tags --- */}
        <title>{`${post.title} – ColorsMi Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="author" content={post.author} />
        <link rel="canonical" href={`https://colorsmi.com/blog/${post.slug}`} />

        {/* --- Open Graph / Facebook --- */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://colorsmi.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />

        {/* --- Twitter --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://colorsmi.com/blog/${post.slug}`} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        <meta name="twitter:site" content="@colorsmi_app" />
      </Helmet>
      {/* ================================================================== */}
      {/* END: DYNAMIC HELMET                                              */}
      {/* ================================================================== */}
    <div className="min-h-screen mt-10 bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar/>
      {/* Header Image */}
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-8">
          <Link to="/blog">
            <Button variant="secondary" size="sm" className="bg-background/80 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-gradient-primary text-primary-foreground">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">{children}</h1>,
                h2: ({children}) => <h2 className="text-3xl font-bold mt-12 mb-6 text-foreground">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{children}</h3>,
                p: ({children}) => <p className="text-lg leading-relaxed mb-6 text-foreground">{children}</p>,
                ul: ({children}) => <ul className="space-y-2 mb-6">{children}</ul>,
                li: ({children}) => <li className="text-lg text-foreground">{children}</li>,
                strong: ({children}) => <strong className="font-semibold text-primary">{children}</strong>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-primary pl-6 italic my-8 text-lg text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <Separator className="my-12" />

          {/* Author Bio */}
          <div className="bg-muted/50 rounded-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.split(' ').map(name => name[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{post.author}</h3>
                <p className="text-muted-foreground">
                  Color psychology expert and design consultant with over 10 years of experience 
                  in helping brands and individuals harness the power of color in their projects.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-colorful transition-all duration-300 hover:-translate-y-1">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <Badge className="mb-2 text-xs">{relatedPost.category}</Badge>
                        <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
   </>
  );
};

export default BlogPost;