import React from "react";

function BlogCard({ title, description, image, link }) {
  return (
    <div className="flex flex-col justify-center rounded-lg shadow-lg overflow-hidden m-4 w-full max-w-sm">
      <div className="flex-shrink-0">
        <a href={link}>
          <img className="h-32 w-full object-cover" src={image} alt={title} />
        </a>
      </div>
      <div className="flex-1 bg-white p-4 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold">
            <a href={link} className="text-mc-blue hover:underline">
              {title}
            </a>
          </p>
          <a href={link} className="block mt-2 text-gray-500">
            <p className="text-md font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-sm text-gray-500">{description}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

function BlogList() {
  const blogPosts = [
    {
      title:
        "Codementor Review: Is it the Coding Mentor You've Been Dreaming Of?",
      description:
        "Is Codementor worth the hype? Find out in this comprehensive review, covering everything from pricing to personal experiences and alternatives.",
      image:
        "https://cdn.mentorcruise.com/blog/featured_images/liam-briese-wB7V7mhufy4-unsplash.jpg",
      link: "/blog/codementor-review-is-it-the-coding-mentor-youve-been-dreaming-of/",
    },
    {
      title: "INTJ Meaning: What it Really Means for Your Tech Career",
      description:
        "INTJ in tech? Learn how your strategic mind can thrive (and overcome challenges) in this fast-paced industry.",
      image: "/path/to/intj-image.jpg", // Update with correct image path
      link: "/blog/intj-meaning-what-it-really-means-for-your-tech-career",
    },
    {
      title: "5 Tips for Effective Remote Work",
      description:
        "Maximize your productivity with these essential remote work strategies.",
      image: "https://via.placeholder.com/150", // Replace with actual image path
      link: "/blog/tips-for-effective-remote-work",
    },
    {
      title: "Understanding JavaScript Closures",
      description:
        "A deep dive into closures and their applications in JavaScript.",
      image: "https://via.placeholder.com/150", // Replace with actual image path
      link: "/blog/understanding-javascript-closures",
    },
    {
      title: "A Beginner's Guide to React",
      description:
        "Start your journey with React and learn the basics of building user interfaces.",
      image: "https://via.placeholder.com/150", // Replace with actual image path
      link: "/blog/beginners-guide-to-react",
    },
    {
      title: "Top 10 Web Development Trends in 2024",
      description:
        "Stay ahead of the curve with the latest trends in web development.",
      image: "https://via.placeholder.com/150", // Replace with actual image path
      link: "/blog/top-web-development-trends-2024",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-wrap justify-center gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            title={post.title}
            description={post.description}
            image={post.image}
            link={post.link}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogList;
