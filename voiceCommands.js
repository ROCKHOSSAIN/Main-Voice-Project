  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };
    
    const startListeningButton = document.getElementById('startListeningButton');
    startListeningButton.addEventListener('click', function() {
      recognition.start();
    });
    
    function handleVoiceCommand(command) {
      if (command.includes('home')) {
        scrollToSection('home');
      } else if (command.includes('image')) {
        scrollToSection('image'); // Make sure the section ID is exactly as specified in your HTML
      } else if (command.includes('creative')) {
        scrollToSection('creative'); // Make sure the section ID is exactly as specified in your HTML
      } 
      else if (command.includes('price')) {
        scrollToSection('price'); // Make sure the section ID is exactly as specified in your HTML
      }else if(command.includes('update')){
        scrollToSection('update');
      }else if(command.includes('contact')){
        scrollToSection('contact')
      }else if(command.includes('details')){
        scrollToSection('details')
      }
      else {
        // Provide voice feedback for unrecognized commands
        const synth = window.speechSynthesis;
        const voiceError = new SpeechSynthesisUtterance("Your voice command is not recognized.");
        synth.speak(voiceError);
      }
    }
    
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
    };
  } else {
    console.log('Speech recognition not supported.');
  }


    const typewriters = document.querySelectorAll('.typewriter');
    typewriters.forEach(typewriter => {
      let text = typewriter.textContent;
      let charIndex = 0;
      let direction = 1;

      function type() {
        typewriter.textContent = text.slice(0, charIndex);

        if (charIndex === text.length) {
          direction = -1;
        } else if (charIndex === 0 && direction === -1) {
          direction = 1;
        }

        charIndex += direction;

        setTimeout(type, 100); // Adjust the delay (in milliseconds)
      }

      type(); // Start the typewriter effect
    });


 // Function to handle voice recognition and generating response
 function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('inputField').value = transcript;
      
      // Generate response when voice input is captured
      await generateResponse();
  };

  recognition.start();
}

// Function to generate response
async function generateResponse() {
  const apiKey = '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';
  const prompt = document.getElementById('inputField').value;
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              { role: 'user', content: prompt }
          ]
      })
  });
  
  const responseData = await response.json();
  const responseText = responseData.choices[0].message.content;
  document.getElementById('outputArea').value = responseText;
}