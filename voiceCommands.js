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

