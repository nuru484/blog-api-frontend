import React from 'react';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8 lg:p-12 mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          About this blog
        </h1>
        <div className="w-20 h-1 bg-blue-600 rounded mb-6"></div>
      </div>

      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          Welcome to my blog! I am Nurudeen, a fullstack web developer and
          writer with a passion for learning and sharing my knowledge with
          others.
        </p>

        <p>
          I have created this platform to share my thoughts, ideas, and
          experiences on a variety of topics that interest me. I built this blog
          using React on the frontend and created a REST API with Express and
          PostgreSQL on the backend.
        </p>

        <div className="my-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Technical Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Express', 'PostgreSQL', 'REST API', 'CMS'].map(
              (tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>

        <p>
          I have also coded a CMS to provide the content you see here. I believe
          in providing my readers with a seamless and personalized experience,
          that's why I've integrated features like:
        </p>

        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Commenting system</li>
          <li>Like functionality</li>
          <li>Keyword search</li>
          <li>Article filtering by tags</li>
        </ul>

        <p className="mt-6">
          I hope you find my blog informative, engaging, and thought-provoking.
          I welcome your comments and feedback and look forward to hearing from
          you.
        </p>
      </div>
    </div>
  );
};

export default About;
