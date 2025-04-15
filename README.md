# GymBro - AI-Powered Workout Companion

A web application that uses AI to generate personalized workout plans based on your preferences and the day of the week.

## Features

- AI-powered workout generation
- Personalized exercise suggestions
- Detailed technique instructions
- Customizable preferences
- Responsive design

## Deployment on GitHub Pages

1. Create a new repository on GitHub
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/gymbro.git
   ```
3. Copy all the project files into the repository folder
4. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/gymbro.git
   git push -u origin main
   ```
5. Go to your repository settings on GitHub
6. Navigate to "Pages" in the left sidebar
7. Under "Source", select "Deploy from a branch"
8. Select "main" branch and "/ (root)" folder
9. Click "Save"
10. Wait a few minutes for GitHub to deploy your site
11. Your site will be available at: `https://yourusername.github.io/gymbro/`

## Local Development

1. Clone the repository
2. Open `index.html` in your web browser
3. Make changes to the files
4. Test locally
5. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```

## Files Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript code with AI integration
- `.gitignore` - Git ignore file

## Note

Make sure to replace the API key in `script.js` with your own DeepSeek API key before deploying. 