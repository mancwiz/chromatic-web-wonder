import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { allBlogPosts } from "@/data/blogPosts";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Helmet } from 'react-helmet-async';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(allBlogPosts.map(post => post.category)))];

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
   <>

   <Helmet>
        {/* --- Primary Meta Tags --- */}
        <title>Blog – Color Stories & Design Articles | ColorsMi</title>
        <meta 
          name="description" 
          content="Explore the fascinating world of color through in-depth articles covering psychology, design principles, cultural significance, and practical applications." 
        />
        <meta name="author" content="ColorsMi Team" />
        <link rel="canonical" href="https://colorsmi.com/blog" />

        {/* --- Open Graph / Facebook --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://colorsmi.com/blog" />
        <meta property="og:title" content="Blog – Color Stories & Design Articles | ColorsMi" />
        <meta property="og:description" content="Explore the fascinating world of color through in-depth articles covering psychology, design principles, and practical applications." />
        {/* You should create a general banner image for your blog page */}
        {/* <meta property="og:image" content="https://colorsmi.com/og-image-blog.png" /> */}

        {/* --- Twitter --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://colorsmi.com/blog" />
        <meta name="twitter:title" content="Blog – Color Stories & Design Articles | ColorsMi" />
        <meta name="twitter:description" content="Explore the fascinating world of color through in-depth articles covering psychology, design principles, and practical applications." />
        <meta name="twitter:site" content="@colorsmi_app" />
        {/* <meta name="twitter:image" content="https://colorsmi.com/og-image-blog.png" /> */}
      </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar/>
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Color Stories
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-color-secondary rounded-full animate-pulse-glow"></div>
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-color-tertiary rounded-full animate-float"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Explore the fascinating world of color through in-depth articles covering psychology, 
            design principles, cultural significance, and practical applications.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="group hover:shadow-colorful transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-primary text-primary-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div> */}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <Button className="w-full group">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No articles found matching your criteria.
              </p>
              <Button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      <Footer/>
    </div>
   </>
  );
};

export default Blog;