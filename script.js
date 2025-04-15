// Replace with your DeepSeek API key
const DEEPSEEK_API_KEY = 'sk-be0d3b0690e044e5adebb0c1f4bb7bd5';

async function generateWorkout(day, preferences) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional fitness trainer. Generate a personalized workout plan based on the user's preferences and the day of the week. Include exercise names, sets, reps, and detailed technique instructions. Format each exercise as follows:\n\n1. Exercise Name\nSets: X\nReps: Y\nTechnique: Detailed instructions"
                    },
                    {
                        role: "user",
                        content: `Generate a ${preferences.fitnessLevel} level workout for ${day} focusing on ${preferences.focusArea} using ${preferences.equipment}. Include 4 exercises with detailed technique instructions.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();
        const workoutText = data.choices[0].message.content;
        
        // Parse the AI response and create exercise objects
        const exercises = parseAIResponse(workoutText);
        displayExercises(exercises);
    } catch (error) {
        console.error('Error generating workout:', error);
        alert('Error generating workout. Please try again.');
    } finally {
        loadingIndicator.style.display = 'none';
    }
}

function parseAIResponse(text) {
    const exercises = [];
    const lines = text.split('\n');
    
    let currentExercise = null;
    
    for (const line of lines) {
        if (line.trim() === '') continue;
        
        // Check if line starts with a number (exercise)
        if (/^\d+\./.test(line)) {
            if (currentExercise) {
                exercises.push(currentExercise);
            }
            
            const name = line.replace(/^\d+\.\s*/, '');
            currentExercise = {
                name: name,
                sets: 0,
                reps: '',
                technique: ''
            };
        } else if (currentExercise) {
            if (line.toLowerCase().includes('sets')) {
                const setsMatch = line.match(/sets?:\s*(\d+)/i);
                if (setsMatch) currentExercise.sets = parseInt(setsMatch[1]);
            } else if (line.toLowerCase().includes('reps')) {
                const repsMatch = line.match(/reps?:\s*([\d-]+)/i);
                if (repsMatch) currentExercise.reps = repsMatch[1];
            } else if (line.toLowerCase().includes('technique')) {
                currentExercise.technique = line.replace(/technique:?\s*/i, '');
            } else if (!line.toLowerCase().includes('sets') && !line.toLowerCase().includes('reps')) {
                currentExercise.technique += line + '\n';
            }
        }
    }
    
    if (currentExercise) {
        exercises.push(currentExercise);
    }
    
    return exercises;
}

function displayExercises(exercises) {
    const container = document.getElementById('exercisesContainer');
    container.innerHTML = '';
    
    exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        
        card.innerHTML = `
            <h3 class="exercise-name">${exercise.name}</h3>
            ${exercise.sets > 0 ? `
                <div class="exercise-details">
                    Sets: ${exercise.sets} | Reps: ${exercise.reps}
                </div>
            ` : ''}
            <div class="exercise-technique">
                ${exercise.technique}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Set initial day based on current day
const today = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
document.getElementById('daySelect').value = today;

// Add event listener for generate button
document.getElementById('generateBtn').addEventListener('click', () => {
    const day = document.getElementById('daySelect').value;
    const preferences = {
        fitnessLevel: document.getElementById('fitnessLevel').value,
        focusArea: document.getElementById('focusArea').value,
        equipment: document.getElementById('equipment').value
    };
    
    generateWorkout(day, preferences);
});

// Add event listener for day selection
document.getElementById('daySelect').addEventListener('change', (e) => {
    const preferences = {
        fitnessLevel: document.getElementById('fitnessLevel').value,
        focusArea: document.getElementById('focusArea').value,
        equipment: document.getElementById('equipment').value
    };
    
    generateWorkout(e.target.value, preferences);
}); 