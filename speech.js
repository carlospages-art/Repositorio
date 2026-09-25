const voiceButton = document.querySelector('.voice-button');

if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
  voiceButton.hidden = false;

  voiceButton.addEventListener('click', () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      voiceButton.textContent = 'Ouvir página';
      voiceButton.setAttribute('aria-label', 'Ouvir leitura do site');
      voiceButton.setAttribute('aria-pressed', 'false');
      return;
    }

    const pageCopy = document.body.cloneNode(true);
    pageCopy.querySelector('.voice-button')?.remove();

    const utterance = new SpeechSynthesisUtterance(pageCopy.innerText.trim());
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;

    const portugueseVoice = window.speechSynthesis.getVoices().find((voice) =>
      voice.lang.toLowerCase().startsWith('pt-br')
    );

    if (portugueseVoice) {
      utterance.voice = portugueseVoice;
    }

    const resetButton = () => {
      voiceButton.textContent = 'Ouvir página';
      voiceButton.setAttribute('aria-label', 'Ouvir leitura do site');
      voiceButton.setAttribute('aria-pressed', 'false');
    };

    utterance.addEventListener('end', resetButton, { once: true });
    utterance.addEventListener('error', resetButton, { once: true });

    voiceButton.textContent = 'Parar leitura';
    voiceButton.setAttribute('aria-label', 'Parar leitura do site');
    voiceButton.setAttribute('aria-pressed', 'true');
    window.speechSynthesis.speak(utterance);
  });
}