const express = require('express');
const app = express();

// Professor Data Object (Easy to update or connect to a database later)
const professor = {
  name: "Prof. Dr. Rajesh Sharma",
  title: "Professor & Head, Department of Computer Science",
  institution: "Indian Institute of Science (IISc), Bengaluru",
  email: "rajesh.sharma@university.edu",
  office: "Room 304, Tech Block B",
  officeHours: "Mon & Wed, 3:00 PM – 5:00 PM",
  photoUrl: "https://placeholder.com",
  bio: "Dr. Rajesh Sharma has over 15 years of teaching and research experience in Artificial Intelligence, Distributed Systems, and Cloud Computing. He completed his Ph.D. from IIT Madras and has published over 60 peer-reviewed papers in international journals.",
  interests: ["Machine Learning", "Distributed Systems", "Cloud Architecture", "Data Security"],
  courses: [
    { code: "CS-401", name: "Advanced Algorithms" },
    { code: "CS-512", name: "Deep Learning Foundations" },
    { code: "CS-305", name: "Operating Systems" }
  ],
  publications: [
    { title: "Scalable Neural Networks on Edge Devices", journal: "IEEE Transactions on Cloud Computing, 2025" },
    { title: "Zero-Trust Security Models in Microservices", journal: "ACM Computing Surveys, 2024" }
  ]
};

// API Endpoint (Optional: Returns raw JSON data at /api/professor)
app.get('/api/professor', (req, res) => {
  res.json(professor);
});

// Main Web Page Route
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${professor.name} | Profile</title>
    <script src="https://tailwindcss.com"></script>
  </head>
  <body class="bg-gray-50 text-gray-800 font-sans antialiased">
    <div class="max-w-4xl mx-auto my-10 bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
      <div class="bg-blue-900 h-32 w-full"></div>
      <div class="px-8 pb-8">
        <div class="relative flex flex-col sm:flex-row items-center sm:items-end -mt-16 mb-6">
          <img src="${professor.photoUrl}" alt="${professor.name}" class="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover bg-gray-200">
          <div class="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h1 class="text-2xl font-bold text-gray-900">${professor.name}</h1>
            <p class="text-blue-700 font-medium">${professor.title}</p>
            <p class="text-sm text-gray-500">${professor.institution}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg text-sm mb-8 border border-gray-200">
          <div>
            <span class="font-semibold text-gray-700 block">Email:</span>
            <a href="mailto:${professor.email}" class="text-blue-600 hover:underline">${professor.email}</a>
          </div>
          <div>
            <span class="font-semibold text-gray-700 block">Office Location:</span>
            <span>${professor.office}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-700 block">Office Hours:</span>
            <span>${professor.officeHours}</span>
          </div>
        </div>

        <section class="mb-8">
          <h2 class="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Biography & Research Interests</h2>
          <p class="text-gray-600 leading-relaxed mb-4">${professor.bio}</p>
          <div class="flex flex-wrap gap-2">
            ${professor.interests.map(item => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">${item}</span>`).join('')}
          </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 class="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Courses Taught</h2>
            <ul class="space-y-2 text-gray-600 text-sm">
              ${professor.courses.map(c => `<li class="p-2 bg-gray-50 rounded border border-gray-100"><strong class="text-gray-800">${c.code}:</strong> ${c.name}</li>`).join('')}
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-bold text-gray-900 border-b pb-2 mb-3">Selected Publications</h2>
            <ul class="space-y-3 text-gray-600 text-sm">
              ${professor.publications.map(p => `<li><p class="font-medium text-gray-800">"${p.title}"</p><p class="text-xs text-gray-500">${p.journal}</p></li>`).join('')}
            </ul>
          </section>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

// Start server locally if not running on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

// Export the Express API for Vercel Serverless
module.exports = app;
